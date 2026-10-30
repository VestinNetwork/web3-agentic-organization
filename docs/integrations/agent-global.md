# agent-global Integration Contract

## Purpose

This project consumes the installed/global `agent-global` platform. It does not vendor, fork, replace, patch or bypass its enforcement implementation.

## Required integration sequence

1. Discover the installed platform version, manifest schema, active policy bundle and enforcement entry points.
2. Record exact API/CLI/MCP contracts and version compatibility in an ADR.
3. Map organization worker identities to global workload identities.
4. Route every protected tool invocation through global enforcement.
5. Apply project-specific constraints as an additional deny/narrowing layer.
6. Add contract tests proving denial on global-policy failure, missing identity, expired identity, wrong project scope, unknown tool and insufficient capability.
7. Verify logs show both global and organization policy decisions without exposing secrets.

## Fail-closed requirements

If the global enforcement endpoint cannot be reached, protected tool execution is denied. Read-only local operations may continue only if explicitly classified and permitted by policy. There is no direct-tool fallback.

## Compatibility status

**Pending discovery.** No actual agent-global repository, installed manifest, runtime endpoint or version was supplied to this repository bootstrap operation. Do not claim runtime compatibility until the integration tests pass against the actual installed platform.

## Required evidence

- exact agent-global version and manifest hash;
- supported authentication mechanism;
- policy decision request/response schema;
- tool invocation route;
- deny-path contract tests;
- revocation/kill-switch test;
- audit correlation test.
