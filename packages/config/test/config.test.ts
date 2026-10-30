import { describe, expect, it } from "vitest";
import { ConfigurationError, loadRuntimeConfig } from "../src/index.js";

describe("runtime configuration", () => {
  it("loads safe local defaults", () => {
    const config = loadRuntimeConfig({ NODE_ENV: "test" });
    expect(config.agentGlobalIntegrationEnabled).toBe(false);
    expect(config.openXeraIntegrationEnabled).toBe(false);
  });

  it("requires agent-global enforcement in production", () => {
    expect(() => loadRuntimeConfig({ NODE_ENV: "production" })).toThrow(ConfigurationError);
  });

  it("requires configured endpoint for enabled integration", () => {
    expect(() => loadRuntimeConfig({ NODE_ENV: "test", AGENT_GLOBAL_INTEGRATION_ENABLED: "true" })).toThrow(/AGENT_GLOBAL_BASE_URL/);
  });

  it("rejects malformed booleans and unsupported URLs", () => {
    expect(() => loadRuntimeConfig({ NODE_ENV: "test", OPENXERA_INTEGRATION_ENABLED: "yes" })).toThrow();
    expect(() => loadRuntimeConfig({ NODE_ENV: "test", DATABASE_URL: "file:///tmp/db" })).toThrow();
  });
});
