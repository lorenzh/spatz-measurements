// Checks the run folders of this repo. Node only, no dependencies.
//   node scripts/check-runs.mjs                    every runs/*/ folder: allowlist and value rules
//   node scripts/check-runs.mjs --pr <base-sha>    also: the PR only adds files, in exactly one new run folder
// Each folder must hold exactly manifest.json, rows.jsonl, grades.jsonl,
// usage.jsonl and report.md. Rows must pass the value rules; grades, usage and
// the manifest must be exact projections of the rows; every estimate must be
// what the manifest's price stamp gives; report.md may hold only table rows
// and fixed lines. The model list and report format follow the bench's
// publish step: change them together.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const FILES = [
	"grades.jsonl",
	"manifest.json",
	"report.md",
	"rows.jsonl",
	"usage.jsonl",
];
const FOLDER = /^\d{4}-\d\d-\d\d-[0-9a-f]{12}$/;
const MODELS = [
	"anthropic/claude-fable-5.1",
	"anthropic/claude-haiku-5.5",
	"anthropic/claude-opus-5.5",
	"anthropic/claude-sonnet-5.5",
	"openai/gpt-6-astra",
	"openai/gpt-6.1-sol",
	"openai/gpt-6-luna",
];
const HARNESSES = ["claude-code", "codex"];
const TASK_TYPES = [
	"code.bugfix",
	"code.feature",
	"code.refactor",
	"code.test",
	"code.explain",
	"investigation",
	"review",
	"spec",
	"planning",
	"ops",
	"design.ui",
	"design.visual",
	"design.3d",
	"writing",
	"research",
	"data",
];
const DIFFICULTIES = ["easy", "medium", "hard"];
const CRITICALITIES = ["none", "business_logic", "security", "data_integrity"];
const EFFORTS = ["none", "low", "medium", "high", "xhigh", "max", "ultra"];
const RESULTS = ["pass", "partial", "fail"];
const CHECKS = ["tests", "golden", "rubric", "human"];
const ROW_FIELDS = [
	"schema",
	"run_id",
	"bench_version",
	"task_id",
	"task_version",
	"task_type",
	"difficulty",
	"criticality",
	"harness",
	"agent_version",
	"model",
	"effort",
	"answered_model",
	"model_version",
	"attempt",
	"result",
	"check",
	"judge",
	"duration_s",
	"tokens",
	"cost_usd",
	"estimated_cost_usd",
	"started_at",
	"contributor",
	"verified",
	"task_hash",
];
const TOKEN_FIELDS = ["input", "cache_read", "cache_write", "output", "reasoning"];
const GRADE_FIELDS = [
	"run_id",
	"task_id",
	"task_version",
	"task_hash",
	"check",
	"result",
	"verified",
];
const USAGE_FIELDS = [
	"run_id",
	"duration_s",
	"tokens",
	"cost_usd",
	"estimated_cost_usd",
];
const PRICE_FIELDS = ["input", "cache_read", "cache_write", "output"];

const isObj = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const sameKeys = (o, ks) =>
	isObj(o) && Object.keys(o).length === ks.length && ks.every((k) => k in o);
const count = (v) => Number.isSafeInteger(v) && v >= 0;
const num = (v) => typeof v === "number" && Number.isFinite(v) && v >= 0;
const orNull = (ok) => (v) => v === null || ok(v);
const re = (r) => (v) => typeof v === "string" && r.test(v);
const oneOf = (xs) => (v) => xs.includes(v);
const utc = (v) =>
	typeof v === "string" &&
	/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?Z$/.test(v) &&
	!Number.isNaN(Date.parse(v)) &&
	// A real calendar day: no Feb 30.
	new Date(Date.parse(v)).toISOString().slice(0, 10) === v.slice(0, 10);

/** The bench's toCanonicalId for harness model ids. */
const canonicalId = (id) =>
	id.startsWith("claude-")
		? `anthropic/${id.replace(/-\d{8}$/, "").replace(/^(.*\d)-(\d)/, "$1.$2")}`
		: id.startsWith("gpt-")
			? `openai/${id}`
			: id;

const ROW_RULES = {
	schema: (v) => v === "spatz-eval-row/1",
	run_id: re(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/),
	bench_version: re(/^(prototype|[1-9]\d{0,3})$/),
	task_id: re(/^t-[0-9a-f]{16}$/),
	task_version: (v) => Number.isSafeInteger(v) && v >= 1,
	task_type: oneOf(TASK_TYPES),
	difficulty: oneOf(DIFFICULTIES),
	criticality: oneOf(CRITICALITIES),
	harness: oneOf(HARNESSES),
	agent_version: re(/^(unknown|\d{1,4}\.\d{1,4}\.\d{1,6}(-[0-9A-Za-z.]{1,20})?)$/),
	model: oneOf(MODELS),
	effort: oneOf(EFFORTS),
	answered_model: (v, row) =>
		v === null ||
		(typeof v === "string" &&
			/^[a-z0-9][a-z0-9.-]{0,63}(\[[a-z0-9]{1,8}\])?$/.test(v) &&
			canonicalId(v.replace(/\[[^\]]*\]$/, "")) === row.model),
	model_version: orNull(re(/^\d{8}$/)),
	attempt: (v) => Number.isSafeInteger(v) && v >= 1,
	result: oneOf(RESULTS),
	check: oneOf(CHECKS),
	judge: (v, row) =>
		v === null ||
		(!["tests", "golden"].includes(row.check) && /^panel-[0-9a-f]{12}$/.test(v)),
	duration_s: num,
	tokens: (t) =>
		sameKeys(t, TOKEN_FIELDS) &&
		count(t.input) &&
		count(t.output) &&
		orNull(count)(t.cache_read) &&
		orNull(count)(t.cache_write) &&
		orNull(count)(t.reasoning),
	cost_usd: orNull(num),
	estimated_cost_usd: orNull(num),
	started_at: utc,
	contributor: re(/^(anon-[0-9a-f]{8}|[A-Za-z0-9][A-Za-z0-9-]{0,38})$/),
	verified: (v) => typeof v === "boolean",
	task_hash: re(/^hmac-sha256:[0-9a-f]{64}$/),
};

const pick = (o, ks) => Object.fromEntries(ks.map((k) => [k, o[k]]));
const canonical = (r) => ({
	...pick(r, ROW_FIELDS),
	tokens: pick(r.tokens, TOKEN_FIELDS),
});
const jsonl = (xs) => xs.map((x) => `${JSON.stringify(x)}\n`).join("");

/** Why a price stamp is not the bench's stamp shape; empty when it is. */
function stampErrors(p) {
	if (
		!sameKeys(p, ["priced", "unit", "openrouter", "models"]) ||
		!["at_publish", "backfill"].includes(p.priced) ||
		p.unit !== "USD per 1M tokens" ||
		!isObj(p.models)
	)
		return ["prices: not the stamp shape"];
	const o = p.openrouter;
	const fetched = sameKeys(o, ["fetched_at"]) && utc(o.fetched_at);
	if (
		!fetched &&
		!(
			sameKeys(o, ["fetch_failed"]) &&
			/^(timeout|network error|invalid response|http [1-5]\d\d)$/.test(o.fetch_failed)
		)
	)
		return ["prices: bad openrouter"];
	const errors = [];
	for (const [model, rates] of Object.entries(p.models)) {
		if (!MODELS.includes(model) || !sameKeys(rates, PRICE_FIELDS)) {
			errors.push(`prices: bad model ${model}`);
			continue;
		}
		for (const f of PRICE_FIELDS) {
			const r = rates[f];
			const ok =
				(r?.source === "openrouter" &&
					fetched &&
					sameKeys(r, ["usd", "source"]) &&
					num(r.usd)) ||
				(r?.source === "official" &&
					sameKeys(r, ["usd", "source", "url", "date"]) &&
					num(r.usd) &&
					/^https:\/\/(platform\.claude\.com|developers\.openai\.com)\/[A-Za-z0-9/._-]{1,200}$/.test(r.url) &&
					/^\d{4}-\d\d-\d\d$/.test(r.date)) ||
				(r?.source === "none" && sameKeys(r, ["usd", "source"]) && r.usd === null);
			if (!ok) errors.push(`prices: bad ${model} ${f}`);
		}
	}
	return errors;
}

/** USD at the stamped rates, rounded to 1e-9; null without usage or for a nonzero counter at an unknown price. */
export function estimate(rates, t) {
	if (!rates || t.input == null || t.output == null) return null;
	let micro = 0;
	for (const f of PRICE_FIELDS) {
		const n = t[f] ?? 0;
		if (n === 0) continue;
		const rate = rates[f]?.usd ?? null;
		if (rate === null) return null;
		micro += n * rate;
	}
	return Number.isFinite(micro) ? Math.round(micro * 1e3) / 1e9 : null;
}

const pctOf = (n, d) => `${((n / d) * 100).toFixed(1)}%`;
const alt = (xs) => xs.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
const PCT = "\\d{1,3}\\.\\d%";
/** Every line report.md may hold besides its title. */
const REPORT_LINES = [
	/^$/,
	/^## Pass rates$/,
	/^\| harness \| model \| effort \| runs \| pass \| partial \| fail \| pass rate \|$/,
	/^\|---\|---\|---\|---\|---\|---\|---\|---\|$/,
	new RegExp(`^\\| (${alt(HARNESSES)}) \\| (${alt(MODELS)}) \\| (${alt(EFFORTS)}) \\| \\d+ \\| \\d+ \\| \\d+ \\| \\d+ \\| ${PCT} \\|$`),
	/^## Measured hardness$/,
	/^Failure rate = share of runs whose result is not `pass`\. Difficulty is the rubric label from `task\.json`; this report never relabels it\.$/,
	/^### Tasks$/,
	/^\| task \| type \| difficulty \| runs \| failures \| failure rate \| universal \|$/,
	/^\|---\|---\|---\|---\|---\|---\|---\|$/,
	new RegExp(`^\\| t-[0-9a-f]{16}@\\d+ \\| (${alt(TASK_TYPES)}) \\| (${alt(DIFFICULTIES)}) \\| \\d+ \\| \\d+ \\| ${PCT} \\| (pass|fail|-) \\|$`),
	/^### Cells \(95% interval clustered by task\)$/,
	/^\| type \| difficulty \| model \| effort \| tasks \| runs \| failure rate \| interval \|$/,
	new RegExp(`^\\| (${alt(TASK_TYPES)}) \\| (${alt(DIFFICULTIES)}) \\| (${alt(MODELS)}) \\| (${alt(EFFORTS)}) \\| \\d+ \\| \\d+ \\| ${PCT} \\| (${PCT} – ${PCT}|-) \\|$`),
	/^### Audit: every run failed$/,
	/^Check each against its reference solution and requirements\. A defective task gets a new version or a replacement before the M2 freeze\.$/,
	/^- t-[0-9a-f]{16}@\d+$/,
	/^None\.$/,
];

/** Why one run folder breaks the allowlist or the value rules; empty when it passes. */
export function folderErrors(dir, folder) {
	const at = (m) => `runs/${folder}: ${m}`;
	if (!FOLDER.test(folder)) return [at("bad folder name")];
	const names = readdirSync(join(dir, folder)).sort();
	if (JSON.stringify(names) !== JSON.stringify(FILES))
		return [at(`files must be ${FILES.join(", ")}, got ${names.join(", ")}`)];
	for (const n of names)
		if (!lstatSync(join(dir, folder, n)).isFile()) return [at(`${n} is not a regular file`)];
	const text = (n) => readFileSync(join(dir, folder, n), "utf8");
	const errors = [];

	const rows = [];
	text("rows.jsonl")
		.split("\n")
		.forEach((l, i) => {
			if (!l) return;
			let r;
			try {
				r = JSON.parse(l);
			} catch {
				return errors.push(at(`rows.jsonl line ${i + 1}: not JSON`));
			}
			if (!sameKeys(r, ROW_FIELDS)) return errors.push(at(`rows.jsonl line ${i + 1}: fields`));
			const bad = Object.entries(ROW_RULES).filter(([k, ok]) => !ok(r[k], r));
			if (bad.length)
				return errors.push(at(`rows.jsonl line ${i + 1}: bad ${bad.map(([k]) => k).join(", ")}`));
			if (JSON.stringify(canonical(r)) !== l)
				return errors.push(at(`rows.jsonl line ${i + 1}: not in canonical form`));
			rows.push(r);
		});
	if (errors.length) return errors;
	if (!rows.length) return [at("rows.jsonl: no rows")];
	const ids = rows.map((r) => r.run_id);
	if (new Set(ids).size !== ids.length) return [at("rows.jsonl: duplicate run_id")];
	const sorted = rows.toSorted((a, b) => a.run_id.localeCompare(b.run_id));
	if (jsonl(sorted.map(canonical)) !== text("rows.jsonl"))
		return [at("rows.jsonl: not sorted by run_id")];
	if (new Set(rows.map((r) => r.bench_version)).size !== 1)
		return [at("rows.jsonl: more than one bench_version")];

	if (text("grades.jsonl") !== jsonl(sorted.map((r) => pick(canonical(r), GRADE_FIELDS))))
		errors.push(at("grades.jsonl: not the projection of the rows"));
	if (text("usage.jsonl") !== jsonl(sorted.map((r) => pick(canonical(r), USAGE_FIELDS))))
		errors.push(at("usage.jsonl: not the projection of the rows"));

	let manifest;
	try {
		manifest = JSON.parse(text("manifest.json"));
	} catch {
		return [...errors, at("manifest.json: not JSON")];
	}
	const stamp = stampErrors(manifest?.prices).map(at);
	if (stamp.length) return [...errors, ...stamp];
	for (const r of sorted)
		if (r.estimated_cost_usd !== estimate(manifest.prices.models[r.model], r.tokens))
			errors.push(at(`${r.run_id}: estimate does not match the prices`));
	const id = createHash("sha256").update(ids.toSorted().join("\n")).digest("hex").slice(0, 12);
	const started_at = new Date(Math.min(...sorted.map((r) => Date.parse(r.started_at)))).toISOString();
	if (folder !== `${started_at.slice(0, 10)}-${id}`) errors.push(at("folder name does not match the rows"));
	const tally = (g) => ({
		pass: g.filter((r) => r.result === "pass").length,
		partial: g.filter((r) => r.result === "partial").length,
		fail: g.filter((r) => r.result === "fail").length,
	});
	const cells = new Map();
	for (const r of sorted) {
		const k = `${r.harness}|${r.model}|${r.effort}`;
		cells.set(k, [...(cells.get(k) ?? []), r]);
	}
	const cellList = [...cells.keys()].sort().map((k) => {
		const g = cells.get(k);
		return { harness: g[0].harness, model: g[0].model, effort: g[0].effort, runs: g.length, ...tally(g) };
	});
	const expected = {
		run_id: id,
		bench_version: sorted[0].bench_version,
		started_at,
		finished_at: new Date(Math.max(...sorted.map((r) => Date.parse(r.started_at) + r.duration_s * 1000))).toISOString(),
		runs: sorted.length,
		results: tally(sorted),
		cells: cellList,
		rejected: manifest.rejected,
		prices: {
			...manifest.prices,
			models: Object.fromEntries([...new Set(sorted.map((r) => r.model))].sort().map((m) => [m, manifest.prices.models[m]])),
		},
	};
	if (!count(manifest.rejected) || text("manifest.json") !== `${JSON.stringify(expected, null, 2)}\n`)
		errors.push(at("manifest.json: not what the rows and the stamp give"));

	const [title, ...lines] = text("report.md").split("\n");
	if (title !== `# Run ${folder} (bench ${sorted[0].bench_version})`) errors.push(at("report.md: bad title"));
	lines.forEach((l, i) => {
		if (!REPORT_LINES.some((r) => r.test(l))) errors.push(at(`report.md line ${i + 2}: not allowed`));
	});
	for (const c of cellList)
		if (!text("report.md").includes(`| ${c.harness} | ${c.model} | ${c.effort} | ${c.runs} | ${c.pass} | ${c.partial} | ${c.fail} | ${pctOf(c.pass, c.runs)} |`))
			errors.push(at(`report.md: pass rate of ${c.harness} ${c.model} ${c.effort} missing`));
	return errors;
}

/** Errors of every run folder under dir, plus run_ids that appear in more than one folder. */
export function checkAll(dir) {
	const folders = readdirSync(dir).sort();
	const errors = folders.flatMap((f) => folderErrors(dir, f));
	const seen = new Map();
	for (const f of folders) {
		let text = "";
		try {
			text = readFileSync(join(dir, f, "rows.jsonl"), "utf8");
		} catch {}
		for (const l of text.split("\n").filter(Boolean)) {
			let id;
			try {
				id = JSON.parse(l).run_id;
			} catch {
				continue;
			}
			if (seen.has(id) && seen.get(id) !== f) errors.push(`run_id ${id} is in runs/${seen.get(id)} and runs/${f}`);
			seen.set(id, f);
		}
	}
	return errors;
}

/** Why a PR's changes (git name-status lines against its base) are not exactly the files of one new run folder. */
export function prErrors(changes, existsAtBase) {
	const folders = new Set();
	const errors = [];
	for (const line of changes) {
		const [status, path] = line.split("\t");
		const m = path?.match(/^runs\/([^/]+)\/([^/]+)$/);
		if (status !== "A" || !m) errors.push(`${status} ${path}: a results PR only adds files of one new run folder`);
		else folders.add(m[1]);
	}
	if (folders.size > 1) errors.push(`${folders.size} run folders: a results PR adds exactly one`);
	if (!changes.length) errors.push("no changes");
	for (const f of folders) if (existsAtBase(f)) errors.push(`runs/${f} exists on the base branch already`);
	return errors;
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const errors = checkAll("runs");
	const pr = process.argv.indexOf("--pr");
	if (pr !== -1) {
		const base = process.argv[pr + 1];
		if (!/^[0-9a-f]{40}$/.test(base ?? "")) throw new Error("--pr needs the base commit sha");
		const git = (...a) => execFileSync("git", a, { encoding: "utf8" });
		errors.push(
			...prErrors(
				git("diff", "--name-status", "--no-renames", base, "HEAD").split("\n").filter(Boolean),
				(f) => git("ls-tree", base, `runs/${f}`).trim() !== "",
			),
		);
	}
	for (const e of errors) console.log(`::error::${e}`);
	console.log(errors.length ? `${errors.length} problems` : "all run folders pass");
	process.exit(errors.length ? 1 : 0);
}
