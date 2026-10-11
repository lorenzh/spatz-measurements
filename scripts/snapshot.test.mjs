// node --test scripts/snapshot.test.mjs
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { buildSnapshot } from "./snapshot.mjs";

const META = { commit: "a".repeat(40), generatedAt: "2026-10-10T00:00:00.000Z" };
let seq = 0;
const row = (o) => ({
	schema: "spatz-eval-row/1",
	run_id: `00000000-0000-4000-8000-${String(++seq).padStart(12, "0")}`,
	bench_version: "1",
	task_id: "t-8908c513a2b59bb3",
	task_version: 1,
	task_type: "code.feature",
	difficulty: "hard",
	criticality: "none",
	harness: "codex",
	agent_version: "unknown",
	model: "openai/gpt-6-luna",
	effort: "high",
	answered_model: null,
	model_version: null,
	attempt: 1,
	result: "pass",
	check: "tests",
	judge: null,
	duration_s: 10,
	tokens: { input: 1, cache_read: 0, cache_write: 0, output: 1, reasoning: 0 },
	cost_usd: null,
	estimated_cost_usd: 0.01,
	started_at: "2026-10-07T00:00:00.000Z",
	contributor: "lorenzh",
	verified: true,
	task_hash: `hmac-sha256:${"0".repeat(64)}`,
	...o,
});
/** A runs dir with one folder per entry of `runs` ({folder: rows}). */
function runsDir(runs) {
	const dir = mkdtempSync(join(tmpdir(), "runs-"));
	for (const [folder, rows] of Object.entries(runs)) {
		mkdirSync(join(dir, folder));
		writeFileSync(join(dir, folder, "rows.jsonl"), rows.map((r) => `${JSON.stringify(r)}\n`).join(""));
	}
	return dir;
}
const FIXTURE = {
	"2026-10-06-aaaaaaaaaaaa": [row({ bench_version: "prototype" }), row({ bench_version: "prototype", result: "fail" })],
	"2026-10-07-bbbbbbbbbbbb": [
		row({ result: "pass", duration_s: 10, estimated_cost_usd: 0.01 }),
		row({ result: "partial", duration_s: 20, estimated_cost_usd: null }),
		row({ result: "fail", duration_s: 30, estimated_cost_usd: 0.03, effort: "low" }),
	],
	"2026-10-08-cccccccccccc": [row({ result: "fail", duration_s: 30, estimated_cost_usd: 0.05 })],
};

test("cells count results per model, version, effort, type and difficulty", () => {
	const s = buildSnapshot(runsDir(FIXTURE), META);
	assert.equal(s.schema, "spatz-snapshot/1");
	assert.deepEqual(s.cells, [
		{
			bench_versions: ["1"], difficulty: "hard", effort: "high", fail: 1, mean_duration_s: 20,
			mean_estimated_cost_usd: 0.03, model: "openai/gpt-6-luna", model_version: null, n: 3, partial: 1,
			pass: 1, runs: ["bbbbbbbbbbbb", "cccccccccccc"], task_type: "code.feature",
		},
		{
			bench_versions: ["1"], difficulty: "hard", effort: "low", fail: 1, mean_duration_s: 30,
			mean_estimated_cost_usd: 0.03, model: "openai/gpt-6-luna", model_version: null, n: 1, partial: 0,
			pass: 0, runs: ["bbbbbbbbbbbb"], task_type: "code.feature",
		},
	]);
	assert.deepEqual(s.models, {
		"openai/gpt-6-luna": { fail: 2, mean_duration_s: 22.5, mean_estimated_cost_usd: 0.03, n: 4, partial: 1, pass: 1 },
	});
	assert.deepEqual(s.source, { commit: META.commit, repository: "lorenzh/spatz-measurements" });
	assert.equal(s.generated_at, META.generatedAt);
});

test("prototype runs are listed but not counted", () => {
	const s = buildSnapshot(runsDir(FIXTURE), META);
	assert.deepEqual(s.excluded_bench_versions, ["prototype"]);
	assert.deepEqual(s.runs, [
		{ bench_version: "prototype", folder: "2026-10-06-aaaaaaaaaaaa", included: false, rows: 2, run_id: "aaaaaaaaaaaa" },
		{ bench_version: "1", folder: "2026-10-07-bbbbbbbbbbbb", included: true, rows: 3, run_id: "bbbbbbbbbbbb" },
		{ bench_version: "1", folder: "2026-10-08-cccccccccccc", included: true, rows: 1, run_id: "cccccccccccc" },
	]);
	assert.ok(s.cells.every((c) => !c.runs.includes("aaaaaaaaaaaa")));
});

test("output is deterministic, key-sorted and holds no task or row ids", () => {
	const text = JSON.stringify(buildSnapshot(runsDir(FIXTURE), META));
	assert.equal(JSON.stringify(buildSnapshot(runsDir(FIXTURE), META)), text);
	const sorted = (v) =>
		Array.isArray(v) ? v.every(sorted) : v && typeof v === "object"
			? Object.keys(v).join() === Object.keys(v).sort().join() && Object.values(v).every(sorted)
			: true;
	assert.ok(sorted(JSON.parse(text)));
	assert.doesNotMatch(text, /t-[0-9a-f]{16}|hmac-sha256|00000000-0000/);
});

test("the content hash ignores generated_at and the commit, and follows the rows", () => {
	const a = buildSnapshot(runsDir(FIXTURE), META);
	const b = buildSnapshot(runsDir(FIXTURE), { commit: "b".repeat(40), generatedAt: "2027-01-01T00:00:00.000Z" });
	assert.match(a.content_sha256, /^[0-9a-f]{64}$/);
	assert.equal(b.content_sha256, a.content_sha256);
	const c = buildSnapshot(runsDir({ ...FIXTURE, "2026-10-09-dddddddddddd": [row({})] }), META);
	assert.notEqual(c.content_sha256, a.content_sha256);
});

test("the published runs build", () => {
	const s = buildSnapshot("runs", META);
	assert.ok(s.cells.length > 0);
	assert.ok(s.cells.every((c) => c.n === c.pass + c.partial + c.fail && !c.bench_versions.includes("prototype")));
});
