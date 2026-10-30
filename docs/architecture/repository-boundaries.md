# Repository Boundaries

- `domain`: framework-free entities, value objects, policies and ports.
- `application`: use cases and orchestration-facing commands/queries.
- `adapters`: database, Temporal, OpenXera, Zivi, MCP and chain implementations.
- `agents`: role definitions and task strategies; no direct database or secret access.
- `security`: identity mapping, policy decision integration, approval, audit and sandbox contracts.
- `blockchain`: separate chain-family implementations and shared safe read interfaces.
- `apps`: composition roots and transport layers only.

Dependencies point inward. Domain code does not import provider SDKs, frameworks, apps or infrastructure packages.

External adapters must implement explicit ports and contract tests. No fake successful adapter responses are permitted in production mode.
