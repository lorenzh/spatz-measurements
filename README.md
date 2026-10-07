# spatz-measurements

Results of spatz benchmark runs: which model, at which effort, passed which kind of task, at what token cost. [spatz](https://github.com/lorenzh/spatz) imports the rows as outcome data before live use.

The bench writes every file here by pull request, one run per PR on a branch `results/<run-id>`. Do not edit the files by hand.

## Layout

| Path | Content |
|------|---------|
| `rows/<bench_version>.jsonl` | One `spatz-eval-row/1` row per graded run, append-only. Each row also has `task_hash`. |
| `runs/<date>-<run-id>/manifest.json` | One run: `bench_version`, start and end time, run and result counts, one entry per harness, model and effort, and how many runs the export rejected. |
| `runs/<date>-<run-id>/grades.jsonl` | Per graded run: result (`pass`, `partial`, `fail`), check kind, whether the bench's own grade gave the result, task id and hash. |
| `runs/<date>-<run-id>/usage.jsonl` | Per graded run: tokens (uncached input, output, cache read, cache write, reasoning), reported USD cost and duration. |
| `reports/<bench_version>/hardness.md` | Measured failure rate per task and per task type, difficulty, model and effort, with a 95% interval clustered by task. |
| `reports/<bench_version>/pass-rates.md` | Pass rate per harness, model and effort. |

`<run-id>` is the first 12 hex digits of a SHA-256 over the run's sorted row `run_id`s, so the same runs always get the same id. Bench version `prototype` holds the prototype measurement from before the current task set; its labels are provisional, and spatz snapshots do not use it.

## Row contract

Rows follow `spatz-eval-row/1`, specified in [spatz#68](https://github.com/lorenzh/spatz/issues/68). Fields outside the contract are ignored by spatz; the only extra field here is `task_hash`.

## What is published

Only an allowlist: the files above, and in them only the fields listed. The bench builds each file from explicitly picked fields and checks every file and field against the allowlist before it commits. A task appears only as an opaque id (`t-` and 16 hex digits) and the content hash of its version (`sha256:`), so results of one task version can be grouped without revealing the task.

## What is never published

- Task ids, prompts, task content, reference solutions and hidden checks.
- Agent transcripts, logs, stdout and stderr, workdirs, diffs and other agent output.
- Probe and canary observations, identity evidence and raw harness usage.
- Auth files, tokens, `HOME` contents, local paths and environment details.
- Snapshots of task repositories or of the bench itself.

Publishing tasks would contaminate the benchmark: a model trained on them would no longer be measured fairly.

## License

The data in this repository (`rows/`, `runs/`, `reports/`) is proposed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribute it as "spatz-measurements, Lorenz Hilpert". A `LICENSE` file with the full text follows once the license is confirmed.
