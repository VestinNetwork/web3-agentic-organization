# Production Architecture

## Decision

Use a modular monolith control plane and horizontally scalable worker processes. Keep domain logic independent from agent frameworks, databases, model vendors, and chain SDKs.

## Planes

1. **Human governance:** dashboard, approval center, policy administration.
2. **Control plane:** organization registry, mission intake, planning, scheduling, authorization decisions.
3. **Orchestration:** Temporal workflows, task DAG, checkpoint/retry/recovery, approval waits.
4. **Execution:** ephemeral agent workers with scoped identity and isolated workspaces.
5. **Shared platform:** agent-global enforcement, OpenXera model gateway, Zivi Core knowledge adapter, PostgreSQL, Redis, Qdrant, observability.
6. **Adapters:** GitHub, MCP tools, EVM, Solana, RPC/indexer, CI/CD, Safe.

## Ownership boundaries

- PostgreSQL owns authoritative organization, mission, task, approval and audit metadata.
- Temporal owns durable workflow execution state; PostgreSQL remains business-state authority.
- Qdrant and graph stores are projections. They can be rebuilt from approved source records.
- OpenXera is the only supported model-provider boundary.
- agent-global supplies global identity/policy/tool enforcement. This application may narrow permissions but must never weaken global policy.
- Chain adapters provide chain-specific APIs. EVM and Solana transaction semantics are not falsely unified.

## Workflow lifecycle

Mission intake -> policy validation -> plan proposal -> plan validation -> task graph persistence -> Temporal execution -> evidence collection -> independent review -> approval wait (when required) -> completion/report.

The model may propose tasks. Deterministic validators enforce schemas, dependencies, budgets, authorization, and state transitions.

## Failure handling

All external commands must be idempotent or have a deduplication key. Activities use bounded retries, explicit timeouts, cancellation, and compensation where possible. A worker crash must not erase workflow state.

## Deployment topology

Local Ubuntu is for development, code access, static analysis and developer tooling. Cloud runs private control-plane and worker services. Private connectivity is via authenticated TLS over a private overlay (e.g. Tailscale); a tunnel may expose only explicitly public ingress. Databases, Redis, Qdrant and Temporal APIs must not be exposed directly to the public internet.

## Scaling

Start with one control-plane deployment and separate worker pools by trust domain (research, code execution, security, chain read-only). Scale workers horizontally. Privileged execution uses separate hardened workload pools or microVMs.
