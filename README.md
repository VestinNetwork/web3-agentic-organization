# Web3 Agentic Organization

Production-oriented, multi-chain autonomous Web3 organization built as a consumer of the **agent-global** platform.

> **Status:** Architecture and repository foundation. Runtime integrations are contract-first and remain disabled until the corresponding platform endpoints, credentials, and security policies are verified.

## Architecture decisions

| Concern | Decision |
|---|---|
| Scope | Full Web3 engineering, security, operations, intelligence, product and growth |
| Autonomy | L4 mission autonomy; critical authority remains human-controlled |
| Chains | EVM and Solana through separate adapters |
| Deployment | Hybrid local development + private cloud control plane/workers |
| Architecture | Modular monolith control plane + distributed workers |
| Language | TypeScript strict |
| Package manager | pnpm workspaces + Turborepo |
| Durable workflows | Temporal |
| Primary state | PostgreSQL |
| Semantic index | Qdrant (derived/rebuildable) |
| Model access | OpenXera adapter |
| Knowledge/runtime integration | Zivi Core adapter |
| Global enforcement | agent-global is the mandatory security boundary |

See [architecture](docs/architecture/overview.md), [ADRs](docs/adr/README.md), [security model](docs/security/security-model.md), [roadmap](docs/roadmap/implementation.md), and [integration contract](docs/integrations/agent-global.md).

## Non-negotiable safety invariants

1. This repository is a **consumer** of agent-global. It must not replace, weaken, fork, or bypass global enforcement.
2. Every tool invocation is authorized at execution time by the global policy boundary and this organization’s stricter project policy.
3. LLMs never receive private keys, seed phrases, unrestricted signing capabilities, or treasury credentials.
4. Mainnet deployment, protocol upgrades, ownership changes, token minting, and treasury transfers require explicit external authorization and (where applicable) Safe/governance approvals.
5. Developer and independent reviewer roles must be separated.
6. PostgreSQL is authoritative for mission/workflow state. Qdrant and graph indexes are derived data.
7. Untrusted documents, repositories, chain data, MCP outputs, and model outputs cannot override system policy.
8. No production-ready or secure status is asserted without reproducible evidence.

## Repository status

The repository was empty at bootstrap. The current commit establishes documentation, package boundaries, policy baselines, and CI scaffolding. It does **not** claim that agent-global, Zivi Core, OpenXera, Temporal, PostgreSQL, Qdrant, RPC providers, or signing infrastructure have been connected or deployed.

## Local prerequisites

- Node.js 20 or newer (pin the exact supported version before release)
- pnpm 10
- Docker / Docker Compose for local dependencies

## Getting started

```bash
corepack enable
pnpm install
pnpm lint
pnpm typecheck
pnpm test
```

The initial packages are deliberately small and dependency-light. Integration packages must be implemented only after the corresponding external contracts pass the compatibility audit.

## Development rules

- Use strict TypeScript; do not introduce `any` without a documented boundary justification.
- Domain packages must not import framework, model-provider, database-driver, or blockchain-provider implementations.
- Agents use application ports; they do not access persistence directly.
- All external tool access goes through the approved tool gateway and agent-global enforcement.
- Durable workflows own retries, timeouts, idempotency, checkpoints, and approval waits.
- Chain-specific transaction construction and signing semantics remain chain-specific.
- Never commit secrets, real environment files, signing material, user data, or production RPC credentials.

## Contribution and release

All changes go through pull requests and required CI. Security-sensitive changes require independent review. Mainnet release is outside autonomous repository permissions and requires human authorization.
