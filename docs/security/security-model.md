# Security Model

## Trust boundary

agent-global is the mandatory outer enforcement boundary. This organization is a consumer. It must fail closed when global identity or policy enforcement is unavailable for protected actions. Organization-level policies can only narrow permissions.

## Identity and authorization

Every worker has a workload identity bound to organization, project, mission, task, role, expiry and capability set. Authorization is checked on every tool invocation. Enforce RBAC and ABAC server-side; never accept capabilities or project IDs asserted solely by model output.

## Tool execution

All tool calls pass through an authenticated gateway and global enforcement. Apply per-tool schemas, argument validation, allowlists, timeouts, rate limits, output size limits, idempotency and audit. Untrusted tool output is data, not instructions.

Workers run non-root, without host Docker socket, with bounded CPU/memory/PIDs, ephemeral workspace, read-only base image, seccomp/AppArmor, restricted egress and short-lived credentials. Use VM/microVM isolation for higher-risk arbitrary code.

## Secrets

No API keys or chain private keys in prompts, memory, source files, logs, artifacts or worker environment shared across tenants. Retrieve short-lived secrets through a dedicated secret broker at execution time. Rotate and revoke on incident.

## Blockchain

Read, construct, simulate, submit, sign and admin are distinct capabilities. Default all chain connections to read-only. A transaction must be decoded and validated deterministically against chain ID, target, selector, token/amount, allowance, nonce, gas/slippage/deadline bounds and simulation evidence. RPC evidence for critical actions must be independently checked.

LLMs never hold keys. Signing is a separate service with explicit policy authorization and human/Safe/governance approval. Mainnet deployment, upgrades, minting, ownership transfer and treasury transfers are never autonomous by default.

## Separation of duties

Code authors cannot approve their own security assessment. Deployment actors cannot grant their own approvals. A single agent cannot propose and independently authorize a high-impact transaction.

## Prompt injection and memory integrity

Treat repositories, web pages, issue bodies, documents, chain metadata, MCP responses and generated content as untrusted. Provenance, content hash, source reference, tenant scope and trust state are mandatory for knowledge records. Generated claims cannot be promoted to verified without an independent verification process.

## Audit and incident response

Record actor/workload identity, mission/task/execution/tool call IDs, policy version and decision, arguments hash, result/artifact references, timestamps and approval identity. Store append-only or tamper-evident audit records. Kill switch revokes worker leases and blocks new privileged calls; it must not attempt unsafe transaction cancellation without chain-aware policy.

## Threat scenarios

Test prompt injection, malicious MCP output, cross-project access, privilege escalation, secret exfiltration, compromised workers, replay, duplicate submission, RPC inconsistency, malicious dependencies, poisoned memory and approval bypass.
