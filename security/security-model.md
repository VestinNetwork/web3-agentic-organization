# Security Model

## Trust boundary
agent-global is the mandatory outer enforcement boundary. This application is a consumer. Protected actions fail closed when global identity/policy enforcement is unavailable. Organization policies may only narrow permissions.

## Identity and tools
Every worker identity is bound to organization, project, mission, task, role, expiry and capability set. Authorize every tool invocation server-side. All tools pass through an authenticated gateway and global enforcement with schemas, allowlists, timeouts, rate/output limits, idempotency and audit. Never trust model-asserted project IDs or capabilities.

Workers run non-root, without host Docker socket, with bounded resources, ephemeral workspaces, read-only base image, seccomp/AppArmor, restricted egress and short-lived credentials. Use VM/microVM isolation for high-risk arbitrary code.

## Secrets
No API or chain keys in prompts, memory, source, logs, artifacts or shared worker environments. Use short-lived secrets from a dedicated broker. Rotate/revoke on incidents.

## Blockchain
Read, construct, simulate, submit, sign and admin are separate capabilities. Default chain connections to read-only. Deterministically validate chain ID, target, selector, asset/amount, allowance, nonce, gas/slippage/deadline limits and simulation evidence. Independently verify critical RPC evidence.

LLMs never hold keys. Signing is a separate service with explicit policy authorization and human/Safe/governance approval. Mainnet deployment, upgrades, minting, ownership transfer and treasury transfers are never autonomous by default.

## Separation of duties
Code authors cannot approve their own security review. Deployment actors cannot grant approvals. A single agent cannot propose and independently authorize a high-impact transaction.

## Prompt injection and memory
Treat repositories, web pages, documents, chain metadata, MCP responses and generated content as untrusted. Knowledge requires provenance, hash, source, tenant scope and trust state. AI-generated claims cannot become verified without independent validation.

## Audit and incident response
Record workload identity, mission/task/execution/tool IDs, policy version/decision, argument hash, artifact references, timestamps and approval identity. Keep append-only or tamper-evident audit records. Kill switch revokes worker leases and blocks new privileged calls.

Test prompt injection, malicious MCP output, cross-project access, privilege escalation, secret exfiltration, compromised workers, replay, duplicate submission, RPC inconsistency, malicious dependencies, memory poisoning and approval bypass.