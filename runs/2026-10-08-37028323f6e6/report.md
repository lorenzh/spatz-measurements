# Run 2026-10-08-37028323f6e6 (bench 1)

## Pass rates

| harness | model | effort | runs | pass | partial | fail | pass rate |
|---|---|---|---|---|---|---|---|
| claude-code | anthropic/claude-fable-5.1 | max | 60 | 55 | 0 | 5 | 91.7% |
| claude-code | anthropic/claude-opus-5.5 | high | 78 | 67 | 0 | 11 | 85.9% |
| claude-code | anthropic/claude-opus-5.5 | low | 78 | 64 | 0 | 14 | 82.1% |
| claude-code | anthropic/claude-opus-5.5 | medium | 77 | 61 | 0 | 16 | 79.2% |
| claude-code | anthropic/claude-sonnet-5.5 | high | 78 | 65 | 0 | 13 | 83.3% |
| claude-code | anthropic/claude-sonnet-5.5 | low | 78 | 60 | 0 | 18 | 76.9% |
| claude-code | anthropic/claude-sonnet-5.5 | medium | 78 | 61 | 0 | 17 | 78.2% |
| codex | openai/gpt-6-astra | ultra | 77 | 66 | 0 | 11 | 85.7% |
| codex | openai/gpt-6-luna | high | 78 | 59 | 0 | 19 | 75.6% |
| codex | openai/gpt-6-luna | low | 78 | 51 | 0 | 27 | 65.4% |
| codex | openai/gpt-6-luna | medium | 78 | 53 | 0 | 25 | 67.9% |
| codex | openai/gpt-6.1-sol | high | 78 | 64 | 0 | 14 | 82.1% |
| codex | openai/gpt-6.1-sol | low | 78 | 63 | 0 | 15 | 80.8% |
| codex | openai/gpt-6.1-sol | medium | 78 | 64 | 0 | 14 | 82.1% |

## Measured hardness

Failure rate = share of runs whose result is not `pass`. Difficulty is the rubric label from `task.json`; this report never relabels it.

### Tasks

| task | type | difficulty | runs | failures | failure rate | universal |
|---|---|---|---|---|---|---|
| t-02431926fc935e54@1 | writing | hard | 14 | 1 | 7.1% | - |
| t-03d31c25129e74dd@1 | code.refactor | medium | 14 | 0 | 0.0% | pass |
| t-077bab9a142ad686@1 | code.bugfix | hard | 14 | 0 | 0.0% | pass |
| t-08e90ebef750e9b7@2 | design.ui | medium | 13 | 0 | 0.0% | pass |
| t-094dc44a10cd41d7@1 | investigation | easy | 14 | 0 | 0.0% | pass |
| t-0ae1f8fd549f5619@1 | code.feature | hard | 14 | 0 | 0.0% | pass |
| t-1168573f47b1d83d@1 | code.bugfix | easy | 14 | 0 | 0.0% | pass |
| t-14836521e80bfd46@1 | code.test | medium | 13 | 0 | 0.0% | pass |
| t-1815e79990d8ff07@2 | review | hard | 13 | 13 | 100.0% | fail |
| t-1a58da277f36b2e8@1 | code.refactor | easy | 14 | 1 | 7.1% | - |
| t-1ae8a69d16b08611@1 | code.refactor | easy | 14 | 2 | 14.3% | - |
| t-1ed83318fec68c5b@1 | investigation | hard | 14 | 0 | 0.0% | pass |
| t-1f3e2dacea49da62@1 | research | hard | 14 | 0 | 0.0% | pass |
| t-20b78fe6cbc6e597@1 | code.refactor | hard | 13 | 0 | 0.0% | pass |
| t-24b0cd2892c9ec55@1 | code.bugfix | hard | 14 | 0 | 0.0% | pass |
| t-2cf4742463ee3e18@1 | code.bugfix | medium | 14 | 0 | 0.0% | pass |
| t-31e20b76fcd3a6ac@1 | review | hard | 14 | 14 | 100.0% | fail |
| t-345215a3f815bdcd@1 | investigation | medium | 14 | 0 | 0.0% | pass |
| t-37b2a6d0014ce672@2 | review | easy | 14 | 3 | 21.4% | - |
| t-37d0eda44b80c37e@2 | review | medium | 13 | 13 | 100.0% | fail |
| t-3ca3bf16b9c67500@1 | code.feature | hard | 14 | 0 | 0.0% | pass |
| t-3f47290110f3ec08@1 | code.test | hard | 14 | 1 | 7.1% | - |
| t-43156f2555a849dc@1 | research | easy | 14 | 1 | 7.1% | - |
| t-47f0375ed6f5a42f@1 | spec | easy | 14 | 1 | 7.1% | - |
| t-52a63b7f2aa6690e@3 | review | medium | 14 | 6 | 42.9% | - |
| t-54885b7495ccd6ce@1 | code.bugfix | hard | 14 | 3 | 21.4% | - |
| t-5ababe927a16ddd5@1 | code.bugfix | medium | 14 | 0 | 0.0% | pass |
| t-627c6a280edb8bff@1 | code.feature | medium | 13 | 1 | 7.7% | - |
| t-63201e8c59741fcf@4 | review | medium | 13 | 11 | 84.6% | - |
| t-66c4bb073d55af32@2 | design.visual | easy | 13 | 0 | 0.0% | pass |
| t-6f5223e41169752a@4 | review | easy | 14 | 7 | 50.0% | - |
| t-704559120bd2b124@1 | design.ui | easy | 14 | 1 | 7.1% | - |
| t-7175d73a002d47f4@1 | code.feature | easy | 14 | 0 | 0.0% | pass |
| t-76c4887648ae94e2@1 | code.feature | hard | 13 | 0 | 0.0% | pass |
| t-7f15de0924ec9f0b@2 | design.visual | medium | 14 | 3 | 21.4% | - |
| t-80abb7ce9c2bd07a@1 | code.feature | medium | 13 | 0 | 0.0% | pass |
| t-810f6985fbc1f5bc@1 | spec | easy | 14 | 0 | 0.0% | pass |
| t-82851ff92b2d90ee@1 | code.test | easy | 14 | 0 | 0.0% | pass |
| t-83114fc085dfb5e5@1 | code.bugfix | easy | 14 | 0 | 0.0% | pass |
| t-83bc0825d6947fb0@2 | ops | hard | 14 | 11 | 78.6% | - |
| t-910b8b0e95a55801@2 | review | hard | 14 | 11 | 78.6% | - |
| t-93c6ac361e4a15cf@1 | review | medium | 14 | 5 | 35.7% | - |
| t-996be37f4786cde5@1 | code.bugfix | hard | 14 | 2 | 14.3% | - |
| t-9a840398cf4d525b@1 | code.feature | hard | 13 | 3 | 23.1% | - |
| t-9e8f47c2a55e61bd@1 | code.refactor | hard | 14 | 2 | 14.3% | - |
| t-a0c20ba7b86e238f@1 | planning | easy | 14 | 2 | 14.3% | - |
| t-a3acbaad599bf4e9@2 | review | easy | 14 | 3 | 21.4% | - |
| t-a7b8e97cd867ccf2@2 | review | medium | 14 | 1 | 7.1% | - |
| t-a8c6d57577220105@1 | writing | hard | 14 | 1 | 7.1% | - |
| t-aa249e2d87032503@1 | code.feature | easy | 14 | 0 | 0.0% | pass |
| t-b25e8738e369a579@1 | code.bugfix | medium | 14 | 0 | 0.0% | pass |
| t-b2b3ff41f0521ea8@1 | code.test | hard | 13 | 3 | 23.1% | - |
| t-b41b5d535dc3a734@2 | ops | hard | 13 | 1 | 7.7% | - |
| t-b84b381f2bc39dd3@1 | code.feature | easy | 14 | 0 | 0.0% | pass |
| t-bbda4ed3972e668e@2 | review | easy | 13 | 13 | 100.0% | fail |
| t-be4a6e92364a5141@1 | code.feature | hard | 14 | 0 | 0.0% | pass |
| t-bf6cf113b4451a08@1 | design.ui | hard | 14 | 0 | 0.0% | pass |
| t-ca842a1859c189c6@1 | code.bugfix | easy | 14 | 4 | 28.6% | - |
| t-ccdc6748dfcaff60@2 | design.visual | hard | 14 | 0 | 0.0% | pass |
| t-cf52bdef07a8e085@2 | review | medium | 14 | 13 | 92.9% | - |
| t-d4ab1ea1cd12d06b@2 | review | easy | 14 | 1 | 7.1% | - |
| t-d52398f8536d89ce@1 | code.refactor | medium | 14 | 0 | 0.0% | pass |
| t-d6746c47fba4b0b2@1 | code.bugfix | medium | 14 | 0 | 0.0% | pass |
| t-d68f6f460541ce7c@2 | ops | easy | 14 | 0 | 0.0% | pass |
| t-d8a9beb32c9c87f9@2 | review | medium | 13 | 13 | 100.0% | fail |
| t-db87b9129e36ef1f@2 | review | easy | 14 | 1 | 7.1% | - |
| t-de9e8530eb7dd2ec@1 | review | hard | 14 | 14 | 100.0% | fail |
| t-e3e9e2d1a2d391ab@1 | code.bugfix | easy | 14 | 0 | 0.0% | pass |
| t-e5f8b9e75f2c2888@1 | code.feature | medium | 14 | 0 | 0.0% | pass |
| t-e6ce6df00f58e883@1 | design.ui | hard | 14 | 2 | 14.3% | - |
| t-e8d6ee0057c4ab59@4 | review | hard | 13 | 13 | 100.0% | fail |
| t-ea5862530dff5f3c@1 | code.bugfix | hard | 13 | 0 | 0.0% | pass |
| t-ec8bc36f4851681c@1 | code.feature | medium | 13 | 0 | 0.0% | pass |
| t-f1694629b5fab02f@1 | code.feature | easy | 14 | 0 | 0.0% | pass |
| t-f758099b9a3c6919@1 | review | hard | 13 | 7 | 53.8% | - |
| t-f81fdad5110994d0@2 | review | hard | 14 | 4 | 28.6% | - |
| t-fceec1ea2c477ead@2 | ops | medium | 13 | 5 | 38.5% | - |
| t-fcf3fc69547dd4af@1 | investigation | hard | 14 | 2 | 14.3% | - |

### Cells (95% interval clustered by task)

| type | difficulty | model | effort | tasks | runs | failure rate | interval |
|---|---|---|---|---|---|---|---|
| code.bugfix | easy | anthropic/claude-fable-5.1 | max | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | anthropic/claude-opus-5.5 | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | anthropic/claude-opus-5.5 | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | anthropic/claude-opus-5.5 | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | anthropic/claude-sonnet-5.5 | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | anthropic/claude-sonnet-5.5 | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | anthropic/claude-sonnet-5.5 | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | openai/gpt-6-astra | ultra | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | openai/gpt-6-luna | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | openai/gpt-6-luna | low | 4 | 4 | 25.0% | 0.0% – 74.0% |
| code.bugfix | easy | openai/gpt-6-luna | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | easy | openai/gpt-6.1-sol | high | 4 | 4 | 25.0% | 0.0% – 74.0% |
| code.bugfix | easy | openai/gpt-6.1-sol | low | 4 | 4 | 25.0% | 0.0% – 74.0% |
| code.bugfix | easy | openai/gpt-6.1-sol | medium | 4 | 4 | 25.0% | 0.0% – 74.0% |
| code.bugfix | hard | anthropic/claude-fable-5.1 | max | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | hard | anthropic/claude-opus-5.5 | high | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | hard | anthropic/claude-opus-5.5 | low | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | hard | anthropic/claude-opus-5.5 | medium | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | hard | anthropic/claude-sonnet-5.5 | high | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | hard | anthropic/claude-sonnet-5.5 | low | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | hard | anthropic/claude-sonnet-5.5 | medium | 5 | 5 | 20.0% | 0.0% – 59.2% |
| code.bugfix | hard | openai/gpt-6-astra | ultra | 4 | 4 | 25.0% | 0.0% – 74.0% |
| code.bugfix | hard | openai/gpt-6-luna | high | 5 | 5 | 20.0% | 0.0% – 59.2% |
| code.bugfix | hard | openai/gpt-6-luna | low | 5 | 5 | 20.0% | 0.0% – 59.2% |
| code.bugfix | hard | openai/gpt-6-luna | medium | 5 | 5 | 20.0% | 0.0% – 59.2% |
| code.bugfix | hard | openai/gpt-6.1-sol | high | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | hard | openai/gpt-6.1-sol | low | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | hard | openai/gpt-6.1-sol | medium | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | anthropic/claude-fable-5.1 | max | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | anthropic/claude-opus-5.5 | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | anthropic/claude-opus-5.5 | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | anthropic/claude-opus-5.5 | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | anthropic/claude-sonnet-5.5 | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | anthropic/claude-sonnet-5.5 | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | anthropic/claude-sonnet-5.5 | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | openai/gpt-6-astra | ultra | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | openai/gpt-6-luna | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | openai/gpt-6-luna | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | openai/gpt-6-luna | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | openai/gpt-6.1-sol | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | openai/gpt-6.1-sol | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.bugfix | medium | openai/gpt-6.1-sol | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | anthropic/claude-fable-5.1 | max | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | anthropic/claude-opus-5.5 | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | anthropic/claude-opus-5.5 | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | anthropic/claude-opus-5.5 | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | anthropic/claude-sonnet-5.5 | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | anthropic/claude-sonnet-5.5 | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | anthropic/claude-sonnet-5.5 | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | openai/gpt-6-astra | ultra | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | openai/gpt-6-luna | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | openai/gpt-6-luna | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | openai/gpt-6-luna | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | openai/gpt-6.1-sol | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | openai/gpt-6.1-sol | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | easy | openai/gpt-6.1-sol | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | anthropic/claude-fable-5.1 | max | 3 | 3 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | anthropic/claude-opus-5.5 | high | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | anthropic/claude-opus-5.5 | low | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | anthropic/claude-opus-5.5 | medium | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | anthropic/claude-sonnet-5.5 | high | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | anthropic/claude-sonnet-5.5 | low | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | anthropic/claude-sonnet-5.5 | medium | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | openai/gpt-6-astra | ultra | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | openai/gpt-6-luna | high | 5 | 5 | 20.0% | 0.0% – 59.2% |
| code.feature | hard | openai/gpt-6-luna | low | 5 | 5 | 20.0% | 0.0% – 59.2% |
| code.feature | hard | openai/gpt-6-luna | medium | 5 | 5 | 20.0% | 0.0% – 59.2% |
| code.feature | hard | openai/gpt-6.1-sol | high | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | openai/gpt-6.1-sol | low | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | hard | openai/gpt-6.1-sol | medium | 5 | 5 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| code.feature | medium | anthropic/claude-opus-5.5 | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | anthropic/claude-opus-5.5 | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | anthropic/claude-opus-5.5 | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | anthropic/claude-sonnet-5.5 | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | anthropic/claude-sonnet-5.5 | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | anthropic/claude-sonnet-5.5 | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | openai/gpt-6-astra | ultra | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | openai/gpt-6-luna | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | openai/gpt-6-luna | low | 4 | 4 | 25.0% | 0.0% – 74.0% |
| code.feature | medium | openai/gpt-6-luna | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | openai/gpt-6.1-sol | high | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | openai/gpt-6.1-sol | low | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.feature | medium | openai/gpt-6.1-sol | medium | 4 | 4 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | anthropic/claude-fable-5.1 | max | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | anthropic/claude-opus-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | anthropic/claude-opus-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | openai/gpt-6-astra | ultra | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | openai/gpt-6-luna | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | openai/gpt-6-luna | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| code.refactor | easy | openai/gpt-6-luna | medium | 2 | 2 | 100.0% | 100.0% – 100.0% |
| code.refactor | easy | openai/gpt-6.1-sol | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | openai/gpt-6.1-sol | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | easy | openai/gpt-6.1-sol | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| code.refactor | hard | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | anthropic/claude-opus-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | anthropic/claude-opus-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | openai/gpt-6-astra | ultra | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | openai/gpt-6-luna | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | openai/gpt-6-luna | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| code.refactor | hard | openai/gpt-6-luna | medium | 2 | 2 | 50.0% | 0.0% – 100.0% |
| code.refactor | hard | openai/gpt-6.1-sol | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | openai/gpt-6.1-sol | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | hard | openai/gpt-6.1-sol | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | anthropic/claude-fable-5.1 | max | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | anthropic/claude-opus-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | anthropic/claude-opus-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | openai/gpt-6-astra | ultra | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | openai/gpt-6-luna | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | openai/gpt-6-luna | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | openai/gpt-6-luna | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | openai/gpt-6.1-sol | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | openai/gpt-6.1-sol | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.refactor | medium | openai/gpt-6.1-sol | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | easy | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| code.test | easy | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| code.test | easy | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| code.test | easy | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| code.test | easy | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| code.test | easy | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| code.test | easy | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| code.test | easy | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| code.test | easy | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| code.test | easy | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| code.test | easy | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| code.test | easy | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| code.test | easy | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| code.test | easy | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| code.test | hard | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| code.test | hard | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | hard | anthropic/claude-opus-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | hard | anthropic/claude-opus-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | hard | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | hard | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | hard | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | hard | openai/gpt-6-astra | ultra | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | hard | openai/gpt-6-luna | high | 2 | 2 | 50.0% | 0.0% – 100.0% |
| code.test | hard | openai/gpt-6-luna | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| code.test | hard | openai/gpt-6-luna | medium | 2 | 2 | 50.0% | 0.0% – 100.0% |
| code.test | hard | openai/gpt-6.1-sol | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | hard | openai/gpt-6.1-sol | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| code.test | hard | openai/gpt-6.1-sol | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| code.test | medium | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| code.test | medium | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| code.test | medium | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| code.test | medium | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| code.test | medium | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| code.test | medium | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| code.test | medium | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| code.test | medium | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| code.test | medium | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| code.test | medium | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| code.test | medium | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| code.test | medium | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| code.test | medium | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| design.ui | easy | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| design.ui | easy | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| design.ui | easy | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| design.ui | easy | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| design.ui | easy | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| design.ui | easy | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| design.ui | easy | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| design.ui | easy | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| design.ui | easy | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| design.ui | easy | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| design.ui | easy | openai/gpt-6-luna | medium | 1 | 1 | 100.0% | - |
| design.ui | easy | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| design.ui | easy | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| design.ui | easy | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| design.ui | hard | anthropic/claude-fable-5.1 | max | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | anthropic/claude-opus-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | anthropic/claude-opus-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | openai/gpt-6-astra | ultra | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | openai/gpt-6-luna | high | 2 | 2 | 50.0% | 0.0% – 100.0% |
| design.ui | hard | openai/gpt-6-luna | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| design.ui | hard | openai/gpt-6-luna | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | openai/gpt-6.1-sol | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | openai/gpt-6.1-sol | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | hard | openai/gpt-6.1-sol | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| design.ui | medium | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| design.ui | medium | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| design.ui | medium | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| design.ui | medium | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| design.ui | medium | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| design.ui | medium | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| design.ui | medium | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| design.ui | medium | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| design.ui | medium | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| design.ui | medium | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| design.ui | medium | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| design.ui | medium | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| design.ui | medium | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| design.visual | easy | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| design.visual | easy | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| design.visual | easy | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| design.visual | easy | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| design.visual | easy | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| design.visual | easy | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| design.visual | easy | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| design.visual | easy | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| design.visual | easy | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| design.visual | easy | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| design.visual | easy | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| design.visual | easy | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| design.visual | easy | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| design.visual | hard | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| design.visual | hard | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| design.visual | hard | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| design.visual | hard | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| design.visual | hard | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| design.visual | hard | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| design.visual | hard | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| design.visual | hard | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| design.visual | hard | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| design.visual | hard | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| design.visual | hard | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| design.visual | hard | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| design.visual | hard | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| design.visual | hard | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| design.visual | medium | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| design.visual | medium | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| design.visual | medium | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| design.visual | medium | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| design.visual | medium | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| design.visual | medium | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| design.visual | medium | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| design.visual | medium | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| design.visual | medium | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| design.visual | medium | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| design.visual | medium | openai/gpt-6-luna | medium | 1 | 1 | 100.0% | - |
| design.visual | medium | openai/gpt-6.1-sol | high | 1 | 1 | 100.0% | - |
| design.visual | medium | openai/gpt-6.1-sol | low | 1 | 1 | 100.0% | - |
| design.visual | medium | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| investigation | easy | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| investigation | easy | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| investigation | easy | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| investigation | easy | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| investigation | easy | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| investigation | easy | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| investigation | easy | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| investigation | easy | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| investigation | easy | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| investigation | easy | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| investigation | easy | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| investigation | easy | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| investigation | easy | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| investigation | easy | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| investigation | hard | anthropic/claude-fable-5.1 | max | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | anthropic/claude-opus-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | anthropic/claude-opus-5.5 | medium | 2 | 2 | 50.0% | 0.0% – 100.0% |
| investigation | hard | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | openai/gpt-6-astra | ultra | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | openai/gpt-6-luna | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | openai/gpt-6-luna | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| investigation | hard | openai/gpt-6-luna | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | openai/gpt-6.1-sol | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | openai/gpt-6.1-sol | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | hard | openai/gpt-6.1-sol | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| investigation | medium | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| investigation | medium | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| investigation | medium | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| investigation | medium | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| investigation | medium | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| investigation | medium | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| investigation | medium | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| investigation | medium | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| investigation | medium | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| investigation | medium | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| investigation | medium | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| investigation | medium | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| investigation | medium | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| investigation | medium | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| ops | easy | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| ops | easy | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| ops | easy | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| ops | easy | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| ops | easy | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| ops | easy | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| ops | easy | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| ops | easy | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| ops | easy | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| ops | easy | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| ops | easy | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| ops | easy | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| ops | easy | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| ops | easy | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| ops | hard | anthropic/claude-fable-5.1 | max | 2 | 2 | 0.0% | 0.0% – 0.0% |
| ops | hard | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| ops | hard | anthropic/claude-opus-5.5 | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | hard | anthropic/claude-opus-5.5 | medium | 1 | 1 | 100.0% | - |
| ops | hard | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| ops | hard | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | hard | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | hard | openai/gpt-6-astra | ultra | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | hard | openai/gpt-6-luna | high | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | hard | openai/gpt-6-luna | low | 2 | 2 | 100.0% | 100.0% – 100.0% |
| ops | hard | openai/gpt-6-luna | medium | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | hard | openai/gpt-6.1-sol | high | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | hard | openai/gpt-6.1-sol | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | hard | openai/gpt-6.1-sol | medium | 2 | 2 | 50.0% | 0.0% – 100.0% |
| ops | medium | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| ops | medium | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| ops | medium | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| ops | medium | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| ops | medium | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| ops | medium | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| ops | medium | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| ops | medium | openai/gpt-6-luna | high | 1 | 1 | 100.0% | - |
| ops | medium | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| ops | medium | openai/gpt-6-luna | medium | 1 | 1 | 100.0% | - |
| ops | medium | openai/gpt-6.1-sol | high | 1 | 1 | 100.0% | - |
| ops | medium | openai/gpt-6.1-sol | low | 1 | 1 | 100.0% | - |
| ops | medium | openai/gpt-6.1-sol | medium | 1 | 1 | 100.0% | - |
| planning | easy | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| planning | easy | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| planning | easy | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| planning | easy | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| planning | easy | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| planning | easy | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| planning | easy | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| planning | easy | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| planning | easy | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| planning | easy | openai/gpt-6-luna | low | 1 | 1 | 100.0% | - |
| planning | easy | openai/gpt-6-luna | medium | 1 | 1 | 100.0% | - |
| planning | easy | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| planning | easy | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| planning | easy | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| research | easy | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| research | easy | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| research | easy | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| research | easy | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| research | easy | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| research | easy | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| research | easy | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| research | easy | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| research | easy | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| research | easy | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| research | easy | openai/gpt-6-luna | medium | 1 | 1 | 100.0% | - |
| research | easy | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| research | easy | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| research | easy | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| research | hard | anthropic/claude-fable-5.1 | max | 1 | 1 | 0.0% | - |
| research | hard | anthropic/claude-opus-5.5 | high | 1 | 1 | 0.0% | - |
| research | hard | anthropic/claude-opus-5.5 | low | 1 | 1 | 0.0% | - |
| research | hard | anthropic/claude-opus-5.5 | medium | 1 | 1 | 0.0% | - |
| research | hard | anthropic/claude-sonnet-5.5 | high | 1 | 1 | 0.0% | - |
| research | hard | anthropic/claude-sonnet-5.5 | low | 1 | 1 | 0.0% | - |
| research | hard | anthropic/claude-sonnet-5.5 | medium | 1 | 1 | 0.0% | - |
| research | hard | openai/gpt-6-astra | ultra | 1 | 1 | 0.0% | - |
| research | hard | openai/gpt-6-luna | high | 1 | 1 | 0.0% | - |
| research | hard | openai/gpt-6-luna | low | 1 | 1 | 0.0% | - |
| research | hard | openai/gpt-6-luna | medium | 1 | 1 | 0.0% | - |
| research | hard | openai/gpt-6.1-sol | high | 1 | 1 | 0.0% | - |
| research | hard | openai/gpt-6.1-sol | low | 1 | 1 | 0.0% | - |
| research | hard | openai/gpt-6.1-sol | medium | 1 | 1 | 0.0% | - |
| review | easy | anthropic/claude-fable-5.1 | max | 5 | 5 | 0.0% | 0.0% – 0.0% |
| review | easy | anthropic/claude-opus-5.5 | high | 6 | 6 | 33.3% | 0.0% – 74.7% |
| review | easy | anthropic/claude-opus-5.5 | low | 6 | 6 | 50.0% | 6.2% – 93.8% |
| review | easy | anthropic/claude-opus-5.5 | medium | 6 | 6 | 33.3% | 0.0% – 74.7% |
| review | easy | anthropic/claude-sonnet-5.5 | high | 6 | 6 | 50.0% | 6.2% – 93.8% |
| review | easy | anthropic/claude-sonnet-5.5 | low | 6 | 6 | 50.0% | 6.2% – 93.8% |
| review | easy | anthropic/claude-sonnet-5.5 | medium | 6 | 6 | 50.0% | 6.2% – 93.8% |
| review | easy | openai/gpt-6-astra | ultra | 6 | 6 | 16.7% | 0.0% – 49.3% |
| review | easy | openai/gpt-6-luna | high | 6 | 6 | 33.3% | 0.0% – 74.7% |
| review | easy | openai/gpt-6-luna | low | 6 | 6 | 66.7% | 25.3% – 100.0% |
| review | easy | openai/gpt-6-luna | medium | 6 | 6 | 33.3% | 0.0% – 74.7% |
| review | easy | openai/gpt-6.1-sol | high | 6 | 6 | 16.7% | 0.0% – 49.3% |
| review | easy | openai/gpt-6.1-sol | low | 6 | 6 | 16.7% | 0.0% – 49.3% |
| review | easy | openai/gpt-6.1-sol | medium | 6 | 6 | 16.7% | 0.0% – 49.3% |
| review | hard | anthropic/claude-fable-5.1 | max | 4 | 4 | 75.0% | 26.0% – 100.0% |
| review | hard | anthropic/claude-opus-5.5 | high | 7 | 7 | 57.1% | 17.5% – 96.7% |
| review | hard | anthropic/claude-opus-5.5 | low | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | hard | anthropic/claude-opus-5.5 | medium | 7 | 7 | 100.0% | 100.0% – 100.0% |
| review | hard | anthropic/claude-sonnet-5.5 | high | 7 | 7 | 71.4% | 35.3% – 100.0% |
| review | hard | anthropic/claude-sonnet-5.5 | low | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | hard | anthropic/claude-sonnet-5.5 | medium | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | hard | openai/gpt-6-astra | ultra | 7 | 7 | 71.4% | 35.3% – 100.0% |
| review | hard | openai/gpt-6-luna | high | 7 | 7 | 71.4% | 35.3% – 100.0% |
| review | hard | openai/gpt-6-luna | low | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | hard | openai/gpt-6-luna | medium | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | hard | openai/gpt-6.1-sol | high | 7 | 7 | 71.4% | 35.3% – 100.0% |
| review | hard | openai/gpt-6.1-sol | low | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | hard | openai/gpt-6.1-sol | medium | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | medium | anthropic/claude-fable-5.1 | max | 4 | 4 | 50.0% | 0.0% – 100.0% |
| review | medium | anthropic/claude-opus-5.5 | high | 7 | 7 | 71.4% | 35.3% – 100.0% |
| review | medium | anthropic/claude-opus-5.5 | low | 7 | 7 | 57.1% | 17.5% – 96.7% |
| review | medium | anthropic/claude-opus-5.5 | medium | 7 | 7 | 71.4% | 35.3% – 100.0% |
| review | medium | anthropic/claude-sonnet-5.5 | high | 7 | 7 | 71.4% | 35.3% – 100.0% |
| review | medium | anthropic/claude-sonnet-5.5 | low | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | medium | anthropic/claude-sonnet-5.5 | medium | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | medium | openai/gpt-6-astra | ultra | 7 | 7 | 42.9% | 3.3% – 82.5% |
| review | medium | openai/gpt-6-luna | high | 7 | 7 | 85.7% | 57.7% – 100.0% |
| review | medium | openai/gpt-6-luna | low | 7 | 7 | 57.1% | 17.5% – 96.7% |
| review | medium | openai/gpt-6-luna | medium | 7 | 7 | 71.4% | 35.3% – 100.0% |
| review | medium | openai/gpt-6.1-sol | high | 7 | 7 | 57.1% | 17.5% – 96.7% |
| review | medium | openai/gpt-6.1-sol | low | 7 | 7 | 42.9% | 3.3% – 82.5% |
| review | medium | openai/gpt-6.1-sol | medium | 7 | 7 | 57.1% | 17.5% – 96.7% |
| spec | easy | anthropic/claude-fable-5.1 | max | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | anthropic/claude-opus-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | anthropic/claude-opus-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | openai/gpt-6-astra | ultra | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | openai/gpt-6-luna | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | openai/gpt-6-luna | low | 2 | 2 | 50.0% | 0.0% – 100.0% |
| spec | easy | openai/gpt-6-luna | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | openai/gpt-6.1-sol | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | openai/gpt-6.1-sol | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| spec | easy | openai/gpt-6.1-sol | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | anthropic/claude-fable-5.1 | max | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | anthropic/claude-opus-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | anthropic/claude-opus-5.5 | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | anthropic/claude-opus-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | anthropic/claude-sonnet-5.5 | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | anthropic/claude-sonnet-5.5 | low | 2 | 2 | 100.0% | 100.0% – 100.0% |
| writing | hard | anthropic/claude-sonnet-5.5 | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | openai/gpt-6-astra | ultra | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | openai/gpt-6-luna | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | openai/gpt-6-luna | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | openai/gpt-6-luna | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | openai/gpt-6.1-sol | high | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | openai/gpt-6.1-sol | low | 2 | 2 | 0.0% | 0.0% – 0.0% |
| writing | hard | openai/gpt-6.1-sol | medium | 2 | 2 | 0.0% | 0.0% – 0.0% |

### Audit: every run failed

Check each against its reference solution and requirements. A defective task gets a new version or a replacement before the M2 freeze.

- t-1815e79990d8ff07@2
- t-31e20b76fcd3a6ac@1
- t-37d0eda44b80c37e@2
- t-bbda4ed3972e668e@2
- t-d8a9beb32c9c87f9@2
- t-de9e8530eb7dd2ec@1
- t-e8d6ee0057c4ab59@4
