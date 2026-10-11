# spatz-measurements

Results of spatz benchmark runs: which model, at which effort, passed which kind of task, at what token cost. [spatz](https://github.com/lorenzh/spatz) downloads the aggregated [snapshot](#snapshot-releases) of these rows and uses it as a capped prior; it can also import the rows themselves.

All files are written by the bench runner's publish step. Each run is one self-contained folder and arrives as one pull request on a branch `results/<run-id>` that only adds that folder. There are no shared files, so two results PRs never conflict. Do not edit the files by hand.

## Folder structure

```text
.
├── README.md
├── .gitattributes
├── .github/workflows/check-runs.yml   # checks every pull request
├── .github/workflows/snapshot.yml     # publishes the snapshot release on every merge
├── scripts/check-runs.mjs             # the check, Node only
├── scripts/snapshot.mjs               # builds the snapshot, Node only
└── runs/
    └── <date>-<run-id>/               # one self-contained folder per published run
        ├── manifest.json
        ├── rows.jsonl
        ├── grades.jsonl
        ├── usage.jsonl
        └── report.md
```

| Path in `runs/<date>-<run-id>/` | Format | Content |
|------|--------|---------|
| `manifest.json` | JSON | Summary of the run and its price stamp |
| `rows.jsonl` | JSON Lines | Every graded run of the run as a `spatz-eval-row/1` row |
| `grades.jsonl` | JSON Lines | Grade result of each graded run |
| `usage.jsonl` | JSON Lines | Tokens, cost and duration of each graded run |
| `report.md` | Markdown | Pass rates and measured hardness of this run's rows |

Every file is written once, when its run is published. To see all runs at once, aggregate the folders (see [Aggregate all runs](#aggregate-all-runs)).

### Terms

- **Run**: one publish of the bench runner, for example one model at one effort on the task set. A run has one bench version.
- **Graded run**: one attempt of one model at one effort on one task version, with a result. Its UUID is the `run_id` of its row. The manifest's `run_id` is the run id below, not a row UUID.
- **Rejected run**: an attempt the bench could not export as a valid row, for example a killed run without token counts. Only the count is published (`rejected` in the manifest).

## Naming rules

- `<date>`: `YYYY-MM-DD` in UTC, the start date of the first graded run in the run (`2026-10-06`).
- `<run-id>`: the first 12 hex digits of the SHA-256 of the run's sorted row `run_id`s, joined by newlines (`335b0fbf43e3`). The same graded runs always give the same run id, so a run cannot be published twice under two names. The results branch is `results/<run-id>`.
- `<bench_version>`: the version of the task set the run used. `prototype` is the prototype measurement from before the current task set. Its labels are provisional, and spatz snapshots do not use it. `1` is the first task set; later task sets get the next number. A bench version name uses only letters, digits, `.`, `_` and `-`.
- Task ids: a task appears only as an opaque id `t-` plus 16 hex digits (`t-8908c513a2b59bb3`), together with `task_version` and `task_hash` (`hmac-sha256:` plus 64 hex digits). Both are HMAC-SHA256 values under a private key that only the bench holds: the id is keyed on the task id, and the hash is keyed on the content hash of that task version. Without the key, nobody can confirm a guessed task id or task content. Rows with the same id, version and hash ran the same task. The example lines in this README use an example key, so their ids differ from the published ones.

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
| `prices` | The price stamp: the list prices behind every `estimated_cost_usd` of the run. See [Cost estimates](#cost-estimates). |

Example (only one of the 12 cells and one of the 4 models shown):

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
  "rejected": 6,
  "prices": {
    "priced": "backfill",
    "unit": "USD per 1M tokens",
    "openrouter": { "fetched_at": "2026-10-07T18:21:55.359Z" },
    "models": {
      "anthropic/claude-opus-5.5": {
        "input": { "usd": 4, "source": "openrouter" },
        "cache_read": { "usd": 0.2, "source": "openrouter" },
        "cache_write": { "usd": 8, "source": "official", "url": "https://platform.claude.com/docs/en/about-claude/pricing", "date": "2026-10-07" },
        "output": { "usd": 20, "source": "openrouter" }
      }
    }
  }
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
{"run_id":"0043c81e-f604-5138-84f1-1a318e69587a","task_id":"t-8908c513a2b59bb3","task_version":1,"task_hash":"hmac-sha256:0b003b66b7eb0232dc457412dbcad541e4d42edd4064a78587f9aaa3a7ea5e8e","check":"tests","result":"pass","verified":true}
```

### `usage.jsonl`

One line per graded run, sorted by `run_id`, written once.

| Field | Content |
|-------|---------|
| `run_id` | UUID of the graded run |
| `duration_s` | Wall time of the agent in seconds |
| `tokens` | `input` (uncached input), `output` (includes reasoning), `cache_read`, `cache_write` and `reasoning` (a breakdown of `output`, do not add it again). `null` means the harness did not report the counter. |
| `cost_usd` | Cost the harness reported in USD, or `null` when it reported none. Never an estimate. |
| `estimated_cost_usd` | Cost at list prices in USD, or `null` when a needed price is unknown. Never billed cost. See [Cost estimates](#cost-estimates). |

```json
{"run_id":"0043c81e-f604-5138-84f1-1a318e69587a","duration_s":81.21,"tokens":{"input":14615,"cache_read":122880,"cache_write":0,"output":3748,"reasoning":1629},"cost_usd":null,"estimated_cost_usd":0.0045643}
```

### `rows.jsonl`

One `spatz-eval-row/1` row per graded run, sorted by `run_id`, written once. A `run_id` appears in exactly one run folder. A file changes only in a backfill, which adds `estimated_cost_usd` to the rows of its own folder and nothing else (see [Cost estimates](#cost-estimates)). Rows follow the contract in [spatz#68](https://github.com/lorenzh/spatz/issues/68). The only extra field is `task_hash`, which spatz ignores.

```json
{"schema":"spatz-eval-row/1","run_id":"0043c81e-f604-5138-84f1-1a318e69587a","bench_version":"prototype","task_id":"t-8908c513a2b59bb3","task_version":1,"task_type":"code.feature","difficulty":"hard","criticality":"none","harness":"codex","agent_version":"unknown","model":"openai/gpt-6-luna","effort":"high","answered_model":"gpt-6-luna","model_version":null,"attempt":1,"result":"pass","check":"tests","judge":null,"duration_s":81.21,"tokens":{"input":14615,"cache_read":122880,"cache_write":0,"output":3748,"reasoning":1629},"cost_usd":null,"estimated_cost_usd":0.0045643,"started_at":"2026-10-06T03:27:10.595Z","contributor":"lorenzh","verified":true,"task_hash":"hmac-sha256:0b003b66b7eb0232dc457412dbcad541e4d42edd4064a78587f9aaa3a7ea5e8e"}
```

## Cost estimates

`cost_usd` is the billed cost the harness reported. It is `null` for Codex, which reports no cost, and for subscription runs, which have no bill. So it cannot compare harnesses.

`estimated_cost_usd` is the same yardstick for every row, Claude and Codex alike. It is a list-price estimate, never a billed cost:

```
estimated_cost_usd = input × input price
                   + cache_read × cache read price
                   + cache_write × cache write price
                   + output × output price
```

Prices are in USD per 1M tokens. `reasoning` is part of `output`, and both providers bill reasoning as output, so it is not added again. A `null` counter adds nothing. A nonzero counter whose price is unknown makes the estimate `null`; a price is never guessed. The usage example above: 14,615 × $0.10 + 122,880 × $0.01 + 3,748 × $0.50 per 1M = $0.0045643.

### Sources

- **OpenRouter** ([`/api/v1/models`](https://openrouter.ai/api/v1/models)): fetched when the run is published. It is the first source for every price.
- **Official pricing pages**, pinned in the bench with a date: [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing) and [OpenAI](https://developers.openai.com/api/docs/pricing). They fill every price OpenRouter does not list.
  - Anthropic cache writes always use the official 1-hour rate, which Claude Code bills. OpenRouter lists the 5-minute rate. At the 1-hour rate, the estimate equals the cost Claude Code reported on every prototype Claude row.
  - The official OpenAI page lists no cache write price. That price comes from OpenRouter only.

### The price stamp

`prices` in `manifest.json` records the prices of every model in the run, so anyone can recompute each estimate:

| Field | Content |
|-------|---------|
| `priced` | `at_publish`, or `backfill` for rows published before estimates existed |
| `unit` | `USD per 1M tokens` |
| `openrouter` | `fetched_at` (ISO 8601 UTC) when the fetch worked, else `fetch_failed` with the reason (`timeout`, `network error`, `invalid response` or `http <status>`). Without a fetch, every price comes from the official table. |
| `models` | Per model: `input`, `cache_read`, `cache_write` and `output`, each with `usd` and `source`. The source is `openrouter`, `official` (with the page `url` and the table `date`) or `none` (`usd` is `null`). |

The publish step checks every row's estimate against the stamp before it pushes.

### Priced once

A row is priced once, when its run is published. Later price changes do not change it. A results PR never overwrites a file: a run whose folder exists is refused, and so is a `run_id` that any `runs/*/rows.jsonl` already holds.

The only exception is the backfill of the prototype rows, which were published before estimates existed. It was an explicit opt-in: it added `estimated_cost_usd` to those rows, and every other field stayed byte-equal ([#5](https://github.com/lorenzh/spatz-measurements/pull/5)). It then added the stamp with `priced: "backfill"` to the run manifest ([#7](https://github.com/lorenzh/spatz-measurements/pull/7)). Both changed only that run's own files. A later backfill may likewise touch only its own run folder.

### `report.md`

Written once from the run's own rows, never from other runs:

- **Pass rates:** runs, `pass`, `partial` and `fail` counts and the pass rate per harness, model and effort.
- **Measured hardness:** failure rate (share of runs whose result is not `pass`) per task version, and per task type, difficulty, model and effort with a 95% interval clustered by task. The last section lists task versions where every run failed. The difficulty column is the label the task was written with; a report never relabels it.

Reports across runs come from the rows: see [Aggregate all runs](#aggregate-all-runs).

## Aggregate all runs

The rows are the complete data. All rows of all runs, as one JSON Lines stream (one bench version: filter on `bench_version`):

```sh
cat runs/*/rows.jsonl
cat runs/*/rows.jsonl | jq -c 'select(.bench_version == "1")'
```

This builds `measurements.db` with one table `rows` over all runs: one line per graded run, the main fields as columns and the full row as JSON in `row`. It needs `jq` and `sqlite3` 3.38 or later. Run it in the repository root.

```sh
cat runs/*/rows.jsonl | jq -cs . > rows.json
sqlite3 measurements.db <<'SQL'
DROP TABLE IF EXISTS rows;
CREATE TABLE rows (
  run_id TEXT PRIMARY KEY,
  bench_version TEXT, task_id TEXT, task_version INTEGER, task_hash TEXT,
  task_type TEXT, difficulty TEXT, harness TEXT, model TEXT, effort TEXT,
  result TEXT, verified INTEGER, duration_s REAL,
  input_tokens INTEGER, output_tokens INTEGER, cost_usd REAL, estimated_cost_usd REAL,
  started_at TEXT, row TEXT NOT NULL
);
INSERT OR IGNORE INTO rows
SELECT value->>'run_id', value->>'bench_version', value->>'task_id',
       value->>'task_version', value->>'task_hash', value->>'task_type',
       value->>'difficulty', value->>'harness', value->>'model', value->>'effort',
       value->>'result', value->>'verified', value->>'duration_s',
       value->>'$.tokens.input', value->>'$.tokens.output', value->>'cost_usd',
       value->>'estimated_cost_usd', value->>'started_at', value
FROM json_each(readfile('rows.json'));
SQL
rm rows.json
```

Example query, pass rate per model and effort:

```sh
sqlite3 measurements.db "SELECT model, effort, count(*) AS runs, round(avg(result = 'pass'), 3) AS pass_rate FROM rows GROUP BY model, effort"
```

Estimated cost per model at list prices:

```sh
sqlite3 measurements.db "SELECT model, count(*) AS runs, round(sum(estimated_cost_usd), 4) AS estimated_usd FROM rows GROUP BY model"
```

## Snapshot releases

Every merge to `main` builds one aggregated snapshot of all runs and publishes it as a GitHub Release (`.github/workflows/snapshot.yml`). spatz downloads the latest one:

```text
https://github.com/lorenzh/spatz-measurements/releases/latest/download/snapshot.json
https://github.com/lorenzh/spatz-measurements/releases/latest/download/snapshot.json.sha256
```

- The tag is `snapshot-<YYYY-MM-DD>-<shortsha>` (UTC date of the publish, 7 hex digits of the commit). The release is marked latest.
- `snapshot.json.sha256` is the `sha256sum` line of `snapshot.json`.
- When the latest release has both assets, its checksum matches and its `content_sha256` equals the new one, the workflow publishes nothing. A docs or workflow change therefore makes no new release.
- The workflow never commits to `main`. It runs on push to `main` and by hand (`workflow_dispatch`). It publishes only from `main`, and only while the run's commit is still the head of `main`, so a rerun of an older run cannot publish stale data.

### `snapshot.json`

One JSON object on one line, schema `spatz-snapshot/1`. Every object has sorted keys, so the same rows and commit always give the same bytes. It holds counts and means only: no task ids, no row `run_id`s and no row-level data.

| Field | Content |
|-------|---------|
| `schema` | `spatz-snapshot/1` |
| `generated_at` | Commit time of the source commit, ISO 8601 UTC |
| `source` | `repository` and the full `commit` sha the snapshot was built from |
| `content_sha256` | SHA-256 of the sorted-key JSON of `excluded_bench_versions`, `runs`, `models` and `cells` |
| `excluded_bench_versions` | Bench versions listed in `runs` but not counted: `prototype`, which was code-only and easier |
| `runs` | Every run folder: `run_id`, `folder`, `bench_version`, `rows` and `included` (false for an excluded bench version) |
| `models` | Per model, over all counted rows: `n`, `pass`, `partial`, `fail`, `mean_estimated_cost_usd`, `mean_duration_s` |
| `cells` | One entry per `model`, `model_version`, `effort`, `task_type` and `difficulty` with the same counts and means, `bench_versions` and `runs` (the run ids it includes) |

`mean_estimated_cost_usd` is the mean over the rows that have an estimate, or `null` when none has one. Means are rounded to 7 (cost) and 2 (duration) decimals.

Example cell:

```json
{"bench_versions":["1"],"difficulty":"easy","effort":"max","fail":0,"mean_duration_s":203.42,"mean_estimated_cost_usd":1.7745962,"model":"anthropic/claude-fable-5.1","model_version":null,"n":4,"partial":0,"pass":4,"runs":["37028323f6e6"],"task_type":"code.bugfix"}
```

Build it locally (Node only): `node scripts/snapshot.mjs --out snapshot.json`. Run the tests with `node --test scripts/snapshot.test.mjs`. The PR check runs them too.

## What is published

Only an allowlist: the files above, and in them only the fields listed. Each row field has a value rule: harness and model come from fixed lists, and versions, judge panel ids and contributors must match a pattern. The run files, reports and pull request text are rendered from the validated rows only. Before it pushes, the publish step compares every file of the commit, with its path and mode, byte for byte with that rendering.

This repo checks every pull request on its own (`.github/workflows/check-runs.yml`, `scripts/check-runs.mjs`, no bench code needed):

- A results PR may only add files, all inside exactly one new `runs/<date>-<run-id>/` folder. A PR that changes or deletes a file, touches a second folder or adds a file elsewhere fails. Migration, docs and backfill PRs carry the label `maintenance`, which skips this rule only.
- Every run folder must hold exactly the five files above. Each row must pass the value rules and be in canonical form. `grades.jsonl` and `usage.jsonl` must be exact projections of the rows, and `manifest.json` exactly what the rows and the price stamp give. Every estimate must match the stamp, `report.md` may hold only table rows and fixed lines, and no `run_id` may appear in two folders.
- The workflow runs the base branch's copy of the check, so a PR cannot weaken the check that judges it. Run it locally with `node scripts/check-runs.mjs` and `node --test scripts/check-runs.test.mjs`.

## What is never published

- Task ids, prompts, task content, reference solutions and hidden checks.
- Agent transcripts, logs, stdout and stderr, workdirs, diffs and other agent output.
- Probe and canary observations, identity evidence and raw harness usage.
- Auth files, tokens, `HOME` contents, local paths and environment details.
- Snapshots of task repositories or of the bench itself.

Publishing tasks would contaminate the benchmark: a model trained on them would no longer be measured fairly.

## License

The data in this repository (`runs/`) is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribute it as "spatz-measurements, Lorenz Hilpert". The full text is in [LICENSE](LICENSE).
