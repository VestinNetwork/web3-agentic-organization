# OpenXera and Zivi Core Integration

OpenXera is the single model inference gateway. Agent packages must depend on an internal model port, not provider SDKs or raw provider keys. Record model capability, routing policy, timeout, budget, fallback and provider health.

Zivi Core is integrated through a versioned knowledge/runtime adapter. PostgreSQL remains authoritative for organization operational state. Existing Zivi memory stores must not be duplicated without a migration rationale. Qdrant is a derived semantic index and must be tenant/project-filtered.

**Status: pending compatibility audit.** The actual repository versions, endpoints, auth methods, schemas and deployment topology have not been validated in this bootstrap. Integration remains disabled by default.
