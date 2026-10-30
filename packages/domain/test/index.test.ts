import { describe, expect, it } from "vitest";
import {
  assertMissionTransition,
  createIdentifier,
  DomainInvariantError,
  evaluateOrganizationGrant,
  validateTaskGraph,
  type AuthorizationContext,
  type MissionTask,
} from "../src/index.js";

const id = createIdentifier;

describe("domain invariants", () => {
  it("validates identifiers", () => {
    expect(id("mission:123")).toBe("mission:123");
    expect(() => id("../secret")).toThrow(DomainInvariantError);
  });

  it("rejects illegal terminal mission transitions", () => {
    expect(() => assertMissionTransition("succeeded", "running")).toThrow(
      DomainInvariantError,
    );
    expect(() => assertMissionTransition("planned", "running")).not.toThrow();
  });

  it("accepts an acyclic task graph", () => {
    const tasks: MissionTask[] = [
      { id: id("task:a"), missionId: id("mission:1"), ownerRole: "architect", dependencies: [], requiredEvidence: [], status: "pending" },
      { id: id("task:b"), missionId: id("mission:1"), ownerRole: "engineer", dependencies: [id("task:a")], requiredEvidence: ["test-report"], status: "pending" },
    ];
    expect(() => validateTaskGraph(tasks)).not.toThrow();
  });

  it("rejects cycles and unknown dependencies", () => {
    const cyclic: MissionTask[] = [
      { id: id("task:a"), missionId: id("mission:1"), ownerRole: "a", dependencies: [id("task:b")], requiredEvidence: [], status: "pending" },
      { id: id("task:b"), missionId: id("mission:1"), ownerRole: "b", dependencies: [id("task:a")], requiredEvidence: [], status: "pending" },
    ];
    expect(() => validateTaskGraph(cyclic)).toThrow(/cycle/i);
    expect(() => validateTaskGraph([{ ...cyclic[0]!, dependencies: [id("task:missing")] }])).toThrow(/unknown dependency/i);
  });

  it("denies missing, cross-project and expired grants", () => {
    const context: AuthorizationContext = {
      workloadId: id("worker:1"),
      organizationId: id("org:1"),
      projectId: id("project:a"),
      missionId: id("mission:1"),
      taskId: id("task:1"),
      grants: [
        { capability: "chain.read", projectId: id("project:a"), expiresAt: "2027-01-01T00:00:00.000Z" },
        { capability: "wallet.sign", projectId: id("project:b"), expiresAt: "2027-01-01T00:00:00.000Z" },
        { capability: "repository.write", projectId: id("project:a"), expiresAt: "2020-01-01T00:00:00.000Z" },
      ],
    };
    const now = new Date("2026-10-30T00:00:00.000Z");
    expect(evaluateOrganizationGrant(context, "chain.read", now).effect).toBe("allow");
    expect(evaluateOrganizationGrant(context, "wallet.sign", now).effect).toBe("deny");
    expect(evaluateOrganizationGrant(context, "repository.write", now).effect).toBe("deny");
    expect(evaluateOrganizationGrant(context, "mainnet.deploy", now).effect).toBe("deny");
  });
});
