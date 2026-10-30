# Blockchain Adapter Contracts

## Supported families

- EVM: Ethereum, Base, Arbitrum, Optimism, BNB Chain, Polygon.
- Solana: native Solana account and transaction model.

## Separation

Each family has distinct address validation, transaction encoding, signature, fee, finality, event and reorganization semantics. Do not force signing or transaction types into a generic interface that hides chain-specific constraints.

Capabilities must be explicit: read, analyze, build, simulate, submit, sign and admin. This repository ships no private-key handling implementation. Initial RPC integrations are read-only and disabled without configured endpoints.

## Required tests

Chain ID/genesis identity validation, malformed address rejection, RPC timeout/fallback, inconsistent RPC response, reorg/replay behavior, simulation failure, nonce/sequence conflict, duplicate submission prevention, event decoding and finality policy.
