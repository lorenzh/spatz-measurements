// node --test scripts/check-runs.test.mjs
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { checkAll, prErrors } from "./check-runs.mjs";

const RUN = "2026-10-07-17e49b62d03a";
/** A copy of one published run folder, changed by `edit`; returns the errors. */
function check(edit = () => {}) {
	const dir = mkdtempSync(join(tmpdir(), "runs-"));
	cpSync(join("runs", RUN), join(dir, RUN), { recursive: true });
	edit(join(dir, RUN), dir);
	return checkAll(dir);
}
const editLine = (file, f) => {
	const [first, ...rest] = readFileSync(file, "utf8").split("\n");
	const o = JSON.parse(first);
	f(o);
	writeFileSync(file, [JSON.stringify(o), ...rest].join("\n"));
};

test("a published run folder passes", () => {
	assert.deepEqual(check(), []);
});

test("files outside the allowlist, free text and non-projections fail", () => {
	const fails = (edit, pattern) => {
		const errors = check(edit);
		assert.ok(errors.some((e) => pattern.test(e)), `${pattern}: ${errors.join("; ")}`);
	};
	fails((d) => writeFileSync(join(d, "transcript.jsonl"), "{}\n"), /files must be/);
	fails((d) => editLine(join(d, "rows.jsonl"), (o) => { o.stdout = "x"; }), /rows\.jsonl line 1: fields/);
	fails((d) => editLine(join(d, "rows.jsonl"), (o) => { o.contributor = "someone at /home/x"; }), /bad contributor/);
	fails((d) => editLine(join(d, "rows.jsonl"), (o) => { o.model = "openai/PRIVATE"; }), /bad model/);
	fails((d) => editLine(join(d, "rows.jsonl"), (o) => { o.estimated_cost_usd = 1; }), /estimate does not match the prices/);
	fails((d) => editLine(join(d, "grades.jsonl"), (o) => { o.result = "pass"; o.check = "x"; }), /grades\.jsonl: not the projection/);
	fails((d) => editLine(join(d, "usage.jsonl"), (o) => { o.cost_usd = 9; }), /usage\.jsonl: not the projection/);
	fails((d) => {
		const p = join(d, "manifest.json");
		const m = JSON.parse(readFileSync(p, "utf8"));
		m.prices.note = "PRIVATE";
		writeFileSync(p, `${JSON.stringify(m, null, 2)}\n`);
	}, /prices: not the stamp shape/);
	fails((d) => {
		const p = join(d, "manifest.json");
		const m = JSON.parse(readFileSync(p, "utf8"));
		m.cells[0].runs += 1;
		writeFileSync(p, `${JSON.stringify(m, null, 2)}\n`);
	}, /manifest\.json: not what the rows/);
	fails((d) => writeFileSync(join(d, "report.md"), `${readFileSync(join(d, "report.md"), "utf8")}PRIVATE-PROMPT\n`), /report\.md line \d+: not allowed/);
	fails((d, dir) => cpSync(d, join(dir, "2026-10-07-aaaaaaaaaaaa"), { recursive: true }), /is in runs\/.* and runs\//);
});

test("the full bench's baseline models and Haiku 5.5 are allowed in rows and price stamps", () => {
	for (const model of ["anthropic/claude-fable-5.1", "openai/gpt-6-astra", "anthropic/claude-haiku-5.5"]) {
		const errors = check((d) => {
			editLine(join(d, "rows.jsonl"), (o) => { o.model = model; });
			const p = join(d, "manifest.json");
			const m = JSON.parse(readFileSync(p, "utf8"));
			m.prices.models[model] = Object.values(m.prices.models)[0];
			writeFileSync(p, `${JSON.stringify(m, null, 2)}\n`);
		});
		assert.ok(!errors.some((e) => /bad model/.test(e)), errors.join("; "));
	}
});

test("a results PR only adds the files of one new run folder", () => {
	const add = (f) => ["grades.jsonl", "manifest.json", "report.md", "rows.jsonl", "usage.jsonl"].map((n) => `A\truns/${f}/${n}`);
	assert.deepEqual(prErrors(add(RUN), () => false), []);
	assert.match(prErrors(add(RUN), () => true).join(), /exists on the base branch/);
	assert.match(prErrors([...add(RUN), ...add("2026-10-08-bbbbbbbbbbbb")], () => false).join(), /2 run folders/);
	assert.match(prErrors([`M\truns/${RUN}/rows.jsonl`], () => false).join(), /only adds files/);
	assert.match(prErrors(["A\tREADME.md"], () => false).join(), /only adds files/);
	assert.match(prErrors([`D\truns/${RUN}/rows.jsonl`], () => false).join(), /only adds files/);
});
