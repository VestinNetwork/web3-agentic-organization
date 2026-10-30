# Implementation Roadmap and Gates

## M0 — Discovery
Audit agent-global version/manifest/enforcement; Zivi Core and OpenXera APIs/auth/schemas; PostgreSQL, Redis, Qdrant, Graphify and Obsidian boundaries; Temporal compatibility/cost. Produce ADRs, data-flow, threat model and dependency/port inventory. Gate: no unresolved critical architecture/security unknowns.

## M1 — Organization foundation
Organization/project/agent/mission/task domain, PostgreSQL schema, API, registry, authorization context and audit envelope. Gate: tenant isolation and domain tests.

## M2 — Durable orchestration
Temporal workflows, task DAG validation, worker leases, idempotency, bounded retries, cancellation, recovery and approval wait. Gate: restart/resume and failure-injection tests.

## M3 — Knowledge and tools
Zivi/OpenXera adapters, Qdrant/graph retrieval, provenance, MCP registry and agent-global route. Gate: compatibility and cross-project isolation tests.

## M4 — First-wave agents
Chief Orchestrator, Chief Architect, Strategy Analyst, Blockchain Architect, Solidity Engineer, Backend Engineer, Security Auditor, QA Lead. Gate: end-to-end non-production mission with independent review.

## M5 — Multi-chain
EVM and Solana read-only adapters, indexer checkpoints, simulation and event verification. No signing. Gate: test vectors and RPC inconsistency tests.

## M6 — Controlled autonomy
Hardened sandbox, global + organization policies, approvals, kill switch, evaluations and audit. Gate: security matrix passes; no default mainnet signing.

## M7 — Production readiness
Load/chaos, backup restoration, disaster recovery, incident drills, supply-chain checks, observability and mission benchmark. Gate: evidence package and human production sign-off.

Do not skip gates. Production readiness is a verified state, not a roadmap label.