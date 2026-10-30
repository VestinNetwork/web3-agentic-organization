export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | readonly JsonValue[] | { readonly [key: string]: JsonValue };

export interface ToolInvocation {
  readonly requestId: string;
  readonly organizationId: string;
  readonly projectId: string;
  readonly missionId: string;
  readonly taskId: string;
  readonly workloadIdentity: string;
  readonly capability: string;
  readonly toolName: string;
  readonly input: JsonValue;
  readonly idempotencyKey: string;
}

export interface EnforcementDecision {
  readonly effect: "allow" | "deny";
  readonly decisionId: string;
  readonly policyVersion: string;
  readonly reasonCode: string;
}

export interface AgentGlobalEnforcementPort {
  authorize(invocation: ToolInvocation, signal?: AbortSignal): Promise<EnforcementDecision>;
  recordResult(
    decisionId: string,
    outcome: "succeeded" | "failed" | "denied",
    resultDigest?: string,
  ): Promise<void>;
}

export interface ModelRequest {
  readonly missionId: string;
  readonly taskId: string;
  readonly role: string;
  readonly modelCapability: "fast" | "reasoning" | "coding" | "multimodal";
  readonly input: string;
  readonly maxOutputTokens: number;
  readonly budgetUsd: number;
}

export interface ModelResponse {
  readonly providerModel: string;
  readonly output: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly costUsd: number;
  readonly requestId: string;
}

export interface ModelGatewayPort {
  generate(request: ModelRequest, signal?: AbortSignal): Promise<ModelResponse>;
}

export interface WorkflowStart {
  readonly workflowId: string;
  readonly missionId: string;
  readonly input: JsonValue;
}

export interface DurableWorkflowPort {
  start(input: WorkflowStart): Promise<{ readonly runId: string }>;
  signal(workflowId: string, signalName: string, payload: JsonValue): Promise<void>;
  cancel(workflowId: string, reason: string): Promise<void>;
}

export interface ChainReadPort {
  readonly family: "evm" | "solana";
  readonly chainId: string;
  getBlockHeight(signal?: AbortSignal): Promise<bigint>;
  getNativeBalance(address: string, signal?: AbortSignal): Promise<string>;
  healthCheck(signal?: AbortSignal): Promise<boolean>;
}

export interface AuditEvent {
  readonly eventId: string;
  readonly organizationId: string;
  readonly projectId: string;
  readonly missionId: string;
  readonly actorId: string;
  readonly action: string;
  readonly outcome: "allowed" | "denied" | "succeeded" | "failed";
  readonly policyVersion: string;
  readonly occurredAt: string;
  readonly metadataDigest: string;
}

export interface AuditSinkPort {
  append(event: AuditEvent): Promise<void>;
}
