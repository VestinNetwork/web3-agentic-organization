# agent-global Integration Contract

This project consumes the installed/global agent-global platform. It does not vendor, fork, replace, patch or bypass its enforcement implementation.

## Integration sequence
1. Discover installed version, manifest schema, active policy bundle and enforcement entry points.
2. Record exact API/CLI/MCP contracts and compatibility in an ADR.
3. Map organization worker identities to global workload identities.
4. Route every protected tool invocation through global enforcement.
5. Apply project policy as an additional narrowing layer.
6. Add contract tests for policy outage, missing/expired identity, wrong project scope, unknown tool and insufficient capability.
7. Verify correlated logs without secret disclosure.

## Fail closed
If global enforcement is unavailable, protected tool execution is denied. No direct-tool fallback exists. Read-only local operations may continue only if explicitly permitted.

## Status
**Compatibility pending discovery.** The actual agent-global repository, installed manifest, endpoint and version were not available during bootstrap. Do not claim runtime compatibility until integration tests pass against the installed platform.

## Required evidence
Exact version and manifest hash; auth mechanism; decision request/response schema; invocation route; deny-path tests; revocation/kill-switch test; audit correlation test.