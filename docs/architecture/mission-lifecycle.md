# Mission Lifecycle

1. Intake: validate requester, organization/project scope, objective and constraints.
2. Policy preflight: deny unsupported or unauthorized missions before workers start.
3. Planning: planner proposes typed tasks, dependencies, budgets and evidence requirements.
4. Plan validation: reject cycles, missing owners, excessive fan-out, unbounded budgets and unsafe capabilities.
5. Approval: obtain approval for scope/risk thresholds before execution when required.
6. Execute: durable workflow schedules scoped workers and tool calls.
7. Verify: independent reviewers evaluate evidence, not agent self-attestation.
8. Remediate: bounded retries and remediation tasks; no infinite loops.
9. Close: outcome summary with artifact references, costs, policy decisions and unresolved risks.

A task is complete only when required evidence is attached and validation succeeds.