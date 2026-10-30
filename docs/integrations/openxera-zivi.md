# OpenXera and Zivi Core Integration

OpenXera is the sole model inference gateway. Agent packages depend on an internal model port, never provider SDKs or raw provider keys. Routing records model capability, policy, timeout, budget, fallback and provider health.

Zivi Core is integrated through versioned knowledge/runtime adapters. PostgreSQL remains authoritative for organization state. Qdrant is a derived semantic index and must be tenant/project filtered.

**Status: pending compatibility audit.** Actual versions, endpoints, authentication, schemas and deployment topology have not been validated. Integrations remain disabled by default.