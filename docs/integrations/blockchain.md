# Blockchain Adapter Contracts

Supported families: EVM (Ethereum, Base, Arbitrum, Optimism, BNB Chain, Polygon) and native Solana.

Keep chain-specific address validation, transaction encoding, signatures, fees, finality, event and reorganization semantics. Capabilities are explicit: read, analyze, build, simulate, submit, sign and admin. No private-key implementation is shipped. Initial RPC integrations are read-only and disabled without configured endpoints.

Test chain identity, malformed addresses, RPC timeout/fallback, inconsistent RPC responses, reorg/replay, simulation failure, nonce/sequence conflict, duplicate submission, event decoding and finality policy.