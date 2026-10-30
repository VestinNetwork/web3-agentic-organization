export interface RuntimeConfig {
  readonly nodeEnv: "development" | "test" | "production";
  readonly logLevel: "debug" | "info" | "warn" | "error";
  readonly databaseUrl?: string;
  readonly redisUrl?: string;
  readonly temporalAddress?: string;
  readonly qdrantUrl?: string;
  readonly agentGlobalBaseUrl?: string;
  readonly agentGlobalIntegrationEnabled: boolean;
  readonly openXeraBaseUrl?: string;
  readonly openXeraIntegrationEnabled: boolean;
  readonly ziviCoreBaseUrl?: string;
  readonly ziviCoreIntegrationEnabled: boolean;
  readonly evmRpcUrl?: string;
  readonly solanaRpcUrl?: string;
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

function optionalUrl(env: Record<string, string | undefined>, key: string): string | undefined {
  const value = env[key]?.trim();
  if (!value) return undefined;

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new ConfigurationError(`${key} must be a valid URL`);
  }

  const allowedProtocols = new Set([
    "http:",
    "https:",
    "redis:",
    "rediss:",
    "postgres:",
    "postgresql:",
  ]);
  if (!allowedProtocols.has(parsed.protocol)) {
    throw new ConfigurationError(`${key} uses an unsupported protocol`);
  }
  return value;
}

function booleanValue(env: Record<string, string | undefined>, key: string): boolean {
  const value = env[key]?.trim().toLowerCase() ?? "false";
  if (value === "true") return true;
  if (value === "false") return false;
  throw new ConfigurationError(`${key} must be true or false`);
}

export function loadRuntimeConfig(env: Record<string, string | undefined>): RuntimeConfig {
  const nodeEnv = env.NODE_ENV ?? "development";
  if (nodeEnv !== "development" && nodeEnv !== "test" && nodeEnv !== "production") {
    throw new ConfigurationError("NODE_ENV must be development, test, or production");
  }

  const logLevel = env.LOG_LEVEL ?? "info";
  if (logLevel !== "debug" && logLevel !== "info" && logLevel !== "warn" && logLevel !== "error") {
    throw new ConfigurationError("LOG_LEVEL is invalid");
  }

  const agentGlobalIntegrationEnabled = booleanValue(env, "AGENT_GLOBAL_INTEGRATION_ENABLED");
  const openXeraIntegrationEnabled = booleanValue(env, "OPENXERA_INTEGRATION_ENABLED");
  const ziviCoreIntegrationEnabled = booleanValue(env, "ZIVI_CORE_INTEGRATION_ENABLED");

  const agentGlobalBaseUrl = optionalUrl(env, "AGENT_GLOBAL_BASE_URL");
  const openXeraBaseUrl = optionalUrl(env, "OPENXERA_BASE_URL");
  const ziviCoreBaseUrl = optionalUrl(env, "ZIVI_CORE_BASE_URL");

  if (nodeEnv === "production" && !agentGlobalIntegrationEnabled) {
    throw new ConfigurationError("Production requires agent-global enforcement to be enabled");
  }
  if (agentGlobalIntegrationEnabled && !agentGlobalBaseUrl) {
    throw new ConfigurationError("AGENT_GLOBAL_BASE_URL is required when agent-global integration is enabled");
  }
  if (openXeraIntegrationEnabled && !openXeraBaseUrl) {
    throw new ConfigurationError("OPENXERA_BASE_URL is required when OpenXera integration is enabled");
  }
  if (ziviCoreIntegrationEnabled && !ziviCoreBaseUrl) {
    throw new ConfigurationError("ZIVI_CORE_BASE_URL is required when Zivi Core integration is enabled");
  }

  return {
    nodeEnv,
    logLevel,
    databaseUrl: optionalUrl(env, "DATABASE_URL"),
    redisUrl: optionalUrl(env, "REDIS_URL"),
    temporalAddress: env.TEMPORAL_ADDRESS?.trim() || undefined,
    qdrantUrl: optionalUrl(env, "QDRANT_URL"),
    agentGlobalBaseUrl,
    agentGlobalIntegrationEnabled,
    openXeraBaseUrl,
    openXeraIntegrationEnabled,
    ziviCoreBaseUrl,
    ziviCoreIntegrationEnabled,
    evmRpcUrl: optionalUrl(env, "EVM_RPC_URL"),
    solanaRpcUrl: optionalUrl(env, "SOLANA_RPC_URL"),
  };
}
