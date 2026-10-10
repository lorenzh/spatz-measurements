// Aggregates every runs/*/rows.jsonl into one spatz-snapshot/1 file. Node only, no dependencies.
//   node scripts/snapshot.mjs [--out snapshot.json]
// Cells count results per (model, model_version, effort, task_type, difficulty);
// no task ids and no row-level data leave this script. Keys are sorted, so the
// same rows and commit always give the same bytes. content_sha256 covers
// everything except generated_at and source, so the release workflow can skip
// a snapshot whose content did not change.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const SCHEMA = "spatz-snapshot/1";
/** Bench versions listed in `runs` but left out of the cells: the prototype was code-only and easier. */
export const EXCLUDED = ["prototype"];

const sortKeys = (v) =>
	Array.isArray(v)
		? v.map(sortKeys)
		: v !== null && typeof v === "object"
			? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])]))
			: v;
const mean = (xs, digits) =>
	xs.length ? Number((xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(digits)) : null;
/** Counts and means of a group of rows; the cost mean skips rows without an estimate. */
const tally = (rows) => ({
	n: rows.length,
	pass: rows.filter((r) => r.result === "pass").length,
	partial: rows.filter((r) => r.result === "partial").length,
	fail: rows.filter((r) => r.result === "fail").length,
	mean_estimated_cost_usd: mean(rows.map((r) => r.estimated_cost_usd).filter((c) => c !== null), 7),
	mean_duration_s: mean(rows.map((r) => r.duration_s), 2),
});
const groupBy = (rows, key) => {
	const groups = new Map();
	for (const r of rows) {
		const k = key(r);
		groups.set(k, [...(groups.get(k) ?? []), r]);
	}
	return [...groups.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
};

/** The snapshot of every run folder under dir. */
export function buildSnapshot(dir, { commit, generatedAt }) {
	const runs = [];
	const rows = [];
	for (const folder of readdirSync(dir).sort()) {
		const own = readFileSync(join(dir, folder, "rows.jsonl"), "utf8")
			.split("\n")
			.filter(Boolean)
			.map((l) => JSON.parse(l));
		const run_id = folder.slice("YYYY-MM-DD-".length);
		const included = !own.some((r) => EXCLUDED.includes(r.bench_version));
		runs.push({ run_id, folder, bench_version: own[0]?.bench_version ?? null, rows: own.length, included });
		if (included) rows.push(...own.map((r) => ({ ...r, folder_run: run_id })));
	}
	const cells = groupBy(rows, (r) =>
		JSON.stringify([r.model, r.model_version, r.effort, r.task_type, r.difficulty]),
	).map(([, g]) => ({
		model: g[0].model,
		model_version: g[0].model_version,
		effort: g[0].effort,
		task_type: g[0].task_type,
		difficulty: g[0].difficulty,
		...tally(g),
		bench_versions: [...new Set(g.map((r) => r.bench_version))].sort(),
		runs: [...new Set(g.map((r) => r.folder_run))].sort(),
	}));
	const models = Object.fromEntries(groupBy(rows, (r) => r.model).map(([m, g]) => [m, tally(g)]));
	const content = sortKeys({ excluded_bench_versions: EXCLUDED, runs, models, cells });
	return sortKeys({
		schema: SCHEMA,
		generated_at: generatedAt,
		source: { repository: "lorenzh/spatz-measurements", commit },
		content_sha256: createHash("sha256").update(JSON.stringify(content)).digest("hex"),
		...content,
	});
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const git = (...a) => execFileSync("git", a, { encoding: "utf8" }).trim();
	const at = process.argv.indexOf("--out");
	const out = at === -1 ? "snapshot.json" : process.argv[at + 1];
	const snapshot = buildSnapshot("runs", {
		commit: git("rev-parse", "HEAD"),
		// The commit time, not the clock: rebuilding a commit gives the same file.
		generatedAt: new Date(git("log", "-1", "--format=%cI")).toISOString(),
	});
	const text = `${JSON.stringify(snapshot)}\n`;
	writeFileSync(out, text);
	console.log(`${out}: ${snapshot.cells.length} cells, ${Buffer.byteLength(text)} bytes, content ${snapshot.content_sha256}`);
}
