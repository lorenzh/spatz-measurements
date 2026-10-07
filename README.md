# spatz-measurements

Results of spatz benchmark runs: which model, at which effort, passed which kind of task, at what token cost. [spatz](https://github.com/lorenzh/spatz) imports the rows as outcome data before live use.

All files are written by the bench runner's publish step. Each run arrives as one pull request on a branch `results/<run-id>`. Do not edit the files by hand.

## Folder structure

```text
.
├── README.md
├── .gitattributes
├── rows/
│   ├── prototype.jsonl           # all rows of bench version "prototype"
│   └── <bench_version>.jsonl     # one file per bench version
├── runs/
│   └── <date>-<run-id>/          # one directory per published run
│       ├── manifest.json
│       ├── grades.jsonl
│       └── usage.jsonl
└── reports/
    └── <bench_version>/
        ├── hardness.md
        └── pass-rates.md
```

| Path | Format | Written | Content |
|------|--------|---------|---------|
| `rows/<bench_version>.jsonl` | JSON Lines | Append-only | Every graded run of one bench version as a `spatz-eval-row/1` row |
| `runs/<date>-<run-id>/manifest.json` | JSON | Once | Summary of one run |
| `runs/<date>-<run-id>/grades.jsonl` | JSON Lines | Once | Grade result of each graded run in the run |
| `runs/<date>-<run-id>/usage.jsonl` | JSON Lines | Once | Tokens, cost and duration of each graded run in the run |
| `reports/<bench_version>/hardness.md` | Markdown | Rewritten by every results PR | Measured failure rates from all rows of the bench version |
| `reports/<bench_version>/pass-rates.md` | Markdown | Rewritten by every results PR | Pass rates from all rows of the bench version |

### Terms

- **Run**: one publish of the bench runner, for example one model at one effort on the task set. A run has one bench version.
- **Graded run**: one attempt of one model at one effort on one task version, with a result. Its UUID is the `run_id` of its row. The manifest's `run_id` is the run id below, not a row UUID.
- **Rejected run**: an attempt the bench could not export as a valid row, for example a killed run without token counts. Only the count is published (`rejected` in the manifest).

## Naming rules

- `<date>`: `YYYY-MM-DD` in UTC, the start date of the first graded run in the run (`2026-10-06`).
- `<run-id>`: the first 12 hex digits of the SHA-256 of the run's sorted row `run_id`s, joined by newlines (`335b0fbf43e3`). The same graded runs always give the same run id, so a run cannot be published twice under two names. The results branch is `results/<run-id>`.
- `<bench_version>`: the version of the task set the run used. `prototype` is the prototype measurement from before the current task set. Its labels are provisional, and spatz snapshots do not use it. `1` is the first task set; later task sets get the next number. A bench version name uses only letters, digits, `.`, `_` and `-`.
- Task ids: a task appears only as an opaque id `t-` plus 16 hex digits (`t-13c5a73d5f981b1b`), together with `task_version` and `task_hash`, the SHA-256 content hash of that task version (`sha256:` plus 64 hex digits). Rows with the same id, version and hash ran the same task.

## Files in a run directory

### `manifest.json`

One JSON object, written once when the run is published.

| Field | Content |
|-------|---------|
| `run_id` | The run id (12 hex digits) |
| `bench_version` | Bench version of every row in the run |
| `started_at` | Start of the first graded run, ISO 8601 UTC |
| `finished_at` | End of the last graded run (start plus duration), ISO 8601 UTC |
| `runs` | Number of graded runs |
| `results` | Counts of `pass`, `partial` and `fail` |
| `cells` | One entry per `harness`, `model` and `effort`, with `runs`, `pass`, `partial` and `fail` |
| `rejected` | Number of rejected runs |

Example (only one of the 12 cells shown):

```json
{
  "run_id": "335b0fbf43e3",
  "bench_version": "prototype",
  "started_at": "2026-10-06T00:48:10.000Z",
  "finished_at": "2026-10-06T03:56:22.600Z",
  "runs": 1955,
  "results": { "pass": 1724, "partial": 0, "fail": 231 },
  "cells": [
    { "harness": "claude-code", "model": "anthropic/claude-opus-5.5", "effort": "high", "runs": 184, "pass": 174, "partial": 0, "fail": 10 }
  ],
  "rejected": 6
}
```

### `grades.jsonl`

One line per graded run, sorted by `run_id`, written once.

| Field | Content |
|-------|---------|
| `run_id` | UUID of the graded run |
| `task_id`, `task_version`, `task_hash` | Opaque task id, its version and its content hash |
| `check` | How the result was graded: `tests`, `golden`, `rubric` or `human` |
| `result` | `pass`, `partial` or `fail` |
| `verified` | `true` when the bench's own grade gave the result |

```json
{"run_id":"0043c81e-f604-5138-84f1-1a318e69587a","task_id":"t-13c5a73d5f981b1b","task_version":1,"task_hash":"sha256:1345443f111fe2ad3cab77be37f388fd9a01e7f843bd6e07d53e2344708fcaa2","check":"tests","result":"pass","verified":true}
```

### `usage.jsonl`

One line per graded run, sorted by `run_id`, written once.

| Field | Content |
|-------|---------|
| `run_id` | UUID of the graded run |
| `duration_s` | Wall time of the agent in seconds |
| `tokens` | `input` (uncached input), `output` (includes reasoning), `cache_read`, `cache_write` and `reasoning` (a breakdown of `output`, do not add it again). `null` means the harness did not report the counter. |
| `cost_usd` | Cost the harness reported in USD, or `null` when it reported none. The bench never estimates it here. |

```json
{"run_id":"0043c81e-f604-5138-84f1-1a318e69587a","duration_s":81.21,"tokens":{"input":14615,"output":3748,"cache_read":122880,"cache_write":0,"reasoning":1629},"cost_usd":null}
```

## Rows

`rows/<bench_version>.jsonl` holds one `spatz-eval-row/1` row per graded run of that bench version, over all runs. It is append-only: a results PR adds only the rows whose `run_id` the file does not hold yet. It never changes or removes a line. Rows follow the contract in [spatz#68](https://github.com/lorenzh/spatz/issues/68). The only extra field is `task_hash`, which spatz ignores.

```json
{"schema":"spatz-eval-row/1","run_id":"0043c81e-f604-5138-84f1-1a318e69587a","bench_version":"prototype","task_id":"t-13c5a73d5f981b1b","task_version":1,"task_type":"code.feature","difficulty":"hard","criticality":"none","harness":"codex","agent_version":"unknown","model":"openai/gpt-6-luna","effort":"high","answered_model":"gpt-6-luna","model_version":null,"attempt":1,"result":"pass","check":"tests","judge":null,"duration_s":81.21,"tokens":{"input":14615,"output":3748,"cache_read":122880,"cache_write":0,"reasoning":1629},"cost_usd":null,"started_at":"2026-10-06T03:27:10.595Z","contributor":"lorenzh","verified":true,"task_hash":"sha256:1345443f111fe2ad3cab77be37f388fd9a01e7f843bd6e07d53e2344708fcaa2"}
```

## Reports

Every results PR rewrites the reports of its bench version from all lines of `rows/<bench_version>.jsonl`.

- `hardness.md`: failure rate (share of runs whose result is not `pass`) per task version, and per task type, difficulty, model and effort with a 95% interval clustered by task. The last section lists task versions where every run failed. The difficulty column is the label the task was written with; a report never relabels it.
- `pass-rates.md`: runs, `pass`, `partial` and `fail` counts and the pass rate per harness, model and effort.

## Rebuild a SQLite database from the rows

The rows are the complete data; `runs/` and `reports/` can be derived from them. This builds `measurements.db` with one table `rows`: one line per graded run, the main fields as columns and the full row as JSON in `row`. It needs `jq` and `sqlite3` 3.38 or later. Run it in the repository root.

```sh
jq -cs . rows/*.jsonl > rows.json
sqlite3 measurements.db <<'SQL'
DROP TABLE IF EXISTS rows;
CREATE TABLE rows (
  run_id TEXT PRIMARY KEY,
  bench_version TEXT, task_id TEXT, task_version INTEGER, task_hash TEXT,
  task_type TEXT, difficulty TEXT, harness TEXT, model TEXT, effort TEXT,
  result TEXT, verified INTEGER, duration_s REAL,
  input_tokens INTEGER, output_tokens INTEGER, cost_usd REAL,
  started_at TEXT, row TEXT NOT NULL
);
INSERT OR IGNORE INTO rows
SELECT value->>'run_id', value->>'bench_version', value->>'task_id',
       value->>'task_version', value->>'task_hash', value->>'task_type',
       value->>'difficulty', value->>'harness', value->>'model', value->>'effort',
       value->>'result', value->>'verified', value->>'duration_s',
       value->>'$.tokens.input', value->>'$.tokens.output', value->>'cost_usd',
       value->>'started_at', value
FROM json_each(readfile('rows.json'));
SQL
rm rows.json
```

Example query, pass rate per model and effort:

```sh
sqlite3 measurements.db "SELECT model, effort, count(*) AS runs, round(avg(result = 'pass'), 3) AS pass_rate FROM rows GROUP BY model, effort"
```

## What is published

Only an allowlist: the files above, and in them only the fields listed. The publish step builds each file from explicitly picked fields. Before it commits, it checks every file and field against the allowlist.

## What is never published

- Task ids, prompts, task content, reference solutions and hidden checks.
- Agent transcripts, logs, stdout and stderr, workdirs, diffs and other agent output.
- Probe and canary observations, identity evidence and raw harness usage.
- Auth files, tokens, `HOME` contents, local paths and environment details.
- Snapshots of task repositories or of the bench itself.

Publishing tasks would contaminate the benchmark: a model trained on them would no longer be measured fairly.

## License

The data in this repository (`rows/`, `runs/`, `reports/`) is proposed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribute it as "spatz-measurements, Lorenz Hilpert". A `LICENSE` file with the full text follows once the license is confirmed.
