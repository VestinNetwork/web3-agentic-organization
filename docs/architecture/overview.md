# Production Architecture

Use a modular monolith control plane with horizontally scalable workers. Domain logic remains independent from agent frameworks, databases, model vendors and chain SDKs.

## Planes
1. Human governance: dashboard, approval center and policy administration.
2. Control plane: organization registry, mission intake, planning and scheduling.
3. Orchestration: Temporal workflows, task DAG, checkpoints, retries, recovery and approval waits.
4. Execution: ephemeral workers with scoped identity and isolated workspaces.
5. Shared platform: agent-global enforcement, OpenXera, Zivi Core, PostgreSQL, Redis, Qdrant and observability.
6. Adapters: GitHub, MCP, EVM, Solana, RPC/indexer, CI/CD and Safe.

## Ownership
- PostgreSQL owns authoritative organization, mission, task, approval and audit metadata.
- Temporal owns durable workflow execution state; PostgreSQL remains business-state authority.
- Qdrant and graph stores are rebuildable projections.
- OpenXera is the only supported model-provider boundary.
- agent-global is the outer identity, policy and tool enforcement boundary. Organization policies may only narrow permissions.
- EVM and Solana transaction semantics remain chain-specific.

## Mission flow
Intake -> policy validation -> plan proposal -> deterministic plan validation -> task graph persistence -> Temporal execution -> evidence collection -> independent review -> approval wait as needed -> final report.

Models may propose; deterministic validators enforce schemas, dependencies, budgets, authorization and state transitions.

## Failure and deployment
External commands are idempotent or deduplicated. Activities use bounded retries, timeouts and cancellation. Local Ubuntu is for development/static analysis; cloud runs private control plane and workers. Use authenticated private networking and TLS. Never expose PostgreSQL, Redis, Qdrant or Temporal APIs publicly.

Separate worker pools by trust domain. Use VM/microVM isolation for high-risk arbitrary code.