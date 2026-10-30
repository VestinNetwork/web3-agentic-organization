# ADR-008: agent-global as Mandatory Global Enforcement

- Status: Accepted; runtime compatibility pending.
- Context: Multiple organizations share global identity/security enforcement without bypass paths.
- Decision: Web3 Agentic Organization consumes agent-global. All protected tool execution uses its authenticated enforcement contract. Organization policies may only narrow permissions. Protected actions fail closed when global enforcement is unavailable.
- Consequences: Inspect the installed manifest and API before implementing adapters. Do not create a parallel global policy engine or direct-tool fallback.
- Verification: contract tests for allow/deny, missing/expired identity, project scope, unknown capability, outage, revocation and audit correlation.