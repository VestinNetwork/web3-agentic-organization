export type Identifier = string & { readonly __brand: "Identifier" };

export type MissionStatus =
  | "draft"
  | "planned"
  | "awaiting_approval"
  | "running"
  | "blocked"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface Mission {
  readonly id: Identifier;
  readonly organizationId: Identifier;
  readonly projectId: Identifier;
  readonly objective: string;
  readonly status: MissionStatus;
  readonly createdAt: string;
}

export type TaskStatus =
  | "pending"
  | "ready"
  | "running"
  | "blocked"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface MissionTask {
  readonly id: Identifier;
  readonly missionId: Identifier;
  readonly ownerRole: string;
  readonly dependencies: readonly Identifier[];
  readonly requiredEvidence: readonly string[];
  readonly status: TaskStatus;
}

export interface CapabilityGrant {
  readonly capability: string;
  readonly projectId: Identifier;
  readonly expiresAt: string;
}

export interface AuthorizationContext {
  readonly workloadId: Identifier;
  readonly organizationId: Identifier;
  readonly projectId: Identifier;
  readonly missionId: Identifier;
  readonly taskId: Identifier;
  readonly grants: readonly CapabilityGrant[];
}

export interface PolicyDecision {
  readonly effect: "allow" | "deny";
  readonly reason: string;
  readonly policyVersion: string;
}

export interface PolicyPort {
  authorize(context: AuthorizationContext, capability: string, now: Date): Promise<PolicyDecision>;
}

export class DomainInvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainInvariantError";
  }
}

export function createIdentifier(value: string): Identifier {
  const normalized = value.trim();
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{1,127}$/.test(normalized)) {
    throw new DomainInvariantError("Identifier format is invalid");
  }
  return normalized as Identifier;
}

export function assertMissionTransition(from: MissionStatus, to: MissionStatus): void {
  const transitions: Record<MissionStatus, readonly MissionStatus[]> = {
    draft: ["planned", "cancelled"],
    planned: ["awaiting_approval", "running", "cancelled"],
    awaiting_approval: ["planned", "running", "cancelled"],
    running: ["blocked", "succeeded", "failed", "cancelled"],
    blocked: ["running", "failed", "cancelled"],
    succeeded: [],
    failed: [],
    cancelled: [],
  };

  if (!transitions[from].includes(to)) {
    throw new DomainInvariantError(`Invalid mission transition: ${from} -> ${to}`);
  }
}

export function validateTaskGraph(tasks: readonly MissionTask[]): void {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  if (byId.size !== tasks.length) throw new DomainInvariantError("Task IDs must be unique");

  for (const task of tasks) {
    for (const dependency of task.dependencies) {
      if (!byId.has(dependency)) throw new DomainInvariantError(`Unknown dependency: ${dependency}`);
      if (dependency === task.id) throw new DomainInvariantError("Task cannot depend on itself");
    }
  }

  const visiting = new Set<Identifier>();
  const visited = new Set<Identifier>();
  const visit = (id: Identifier): void => {
    if (visiting.has(id)) throw new DomainInvariantError("Task graph contains a cycle");
    if (visited.has(id)) return;
    const task = byId.get(id);
    if (!task) throw new DomainInvariantError(`Unknown task: ${id}`);
    visiting.add(id);
    for (const dependency of task.dependencies) visit(dependency);
    visiting.delete(id);
    visited.add(id);
  };

  for (const task of tasks) visit(task.id);
}

export function evaluateOrganizationGrant(
  context: AuthorizationContext,
  capability: string,
  now: Date,
): PolicyDecision {
  const valid = context.grants.some((grant) => {
    const expiresAt = Date.parse(grant.expiresAt);
    return grant.capability === capability &&
      grant.projectId === context.projectId &&
      Number.isFinite(expiresAt) &&
      expiresAt > now.getTime();
  });
  return {
    effect: valid ? "allow" : "deny",
    reason: valid ? "matching unexpired project grant" : "no matching unexpired project grant",
    policyVersion: "organization-policy-v1",
  };
}
