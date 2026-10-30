import { describe, expect, it } from "vitest";
import type {
  AgentGlobalEnforcementPort,
  ChainReadPort,
  DurableWorkflowPort,
  ModelGatewayPort,
} from "../src/index.js";

describe("external integration ports", () => {
  it("keep enforcement, workflow, model and chain concerns separate", () => {
    const enforcement: AgentGlobalEnforcementPort = {
      async authorize() {
        return {
          effect: "deny",
          decisionId: "decision-1",
          policyVersion: "global-v1",
          reasonCode: "not_configured",
        };
      },
      async recordResult() {},
    };
    const workflow: DurableWorkflowPort = {
      async start() { return { runId: "run-1" }; },
      async signal() {},
      async cancel() {},
    };
    const model: ModelGatewayPort = {
      async generate() {
        return {
          providerModel: "test-model",
          output: "plan",
          inputTokens: 1,
          outputTokens: 1,
          costUsd: 0,
          requestId: "request-1",
        };
      },
    };
    const chain: ChainReadPort = {
      family: "evm",
      chainId: "eip155:8453",
      async getBlockHeight() { return 1n; },
      async getNativeBalance() { return "0"; },
      async healthCheck() { return true; },
    };

    expect(typeof enforcement.authorize).toBe("function");
    expect(typeof workflow.start).toBe("function");
    expect(typeof model.generate).toBe("function");
    expect(chain.family).toBe("evm");
  });
});
