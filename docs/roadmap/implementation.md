# Implementation Roadmap and Gates

## M0 — Discovery and architecture validation

- Audit agent-global version, manifest and enforcement contract.
- Audit Zivi Core and OpenXera APIs, auth, schemas and runtime topology.
- Inventory PostgreSQL, Redis, Qdrant, Graphify and Obsidian integration boundaries.
- Confirm Temporal compatibility and operational cost.
- Produce ADR updates, data-flow map, threat model, dependency and port inventory.
- Gate: no unresolved critical architecture/security unknowns; contracts documented.

## M1 — Organization foundation

Organization/project/agent/mission/task domain, PostgreSQL schema, API, registry, authorization context and audit envelope.
Gate: tenant isolation and domain tests.

## M2 — Durable orchestration

Temporal workflows, task DAG validation, worker leases, idempotency, bounded retries, cancellation, recovery, human approval wait.
Gate: restart/resume, duplicate delivery and failure-injection tests.

## M3 — Knowledge and tools

Zivi/OpenXera adapters, Qdrant and graph retrieval, provenance, MCP registry, agent-global policy route.
Gate: contract compatibility and cross-project isolation tests.

## M4 — First-wave agents

Start with 8 role definitions: Chief Orchestrator, Chief Architect, Strategy Analyst, Blockchain Architect, Solidity Engineer, Backend Engineer, Security Auditor and QA Lead.
Gate: end-to-end mission on a non-production repository with independent review.

## M5 — Multi-chain read and simulation

EVM and Solana read-only adapters, indexer checkpoints, simulation, event verification. No signing.
Gate: test vectors and RPC inconsistency tests.

## M6 — Controlled autonomy

Hardened sandbox, global + organization policy enforcement, approval workflows, kill switch, evaluation suite and audit.
Gate: security test matrix passes; no mainnet signing capability is enabled by default.

## M7 — Production readiness

Load/chaos tests, backup restoration, disaster recovery, incident drills, supply-chain checks, observability and mission benchmark.
Gate: evidence package and human production sign-off.

## Rollout rule

Do not skip gates. Later phases may be developed in parallel only when their security and dependency prerequisites are satisfied. Production readiness is a verified state, not a roadmap label.
