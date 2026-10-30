# Deployment Operations

## Local
Ubuntu workstation: development, repository access, Foundry/Slither, local sandbox, Obsidian and Graphify. Do not expose developer workstation services publicly.

## Cloud
Private control plane, Temporal, PostgreSQL, Redis, Qdrant, worker pools, indexers and observability. Public ingress is restricted to authenticated API/dashboard endpoints.

## Network
Use private overlay networking and TLS/mTLS where supported. Firewall defaults to deny. Database, Redis, vector DB and Temporal internal APIs must not be public. Restrict outbound worker egress by tool policy.

## Recovery
Document PostgreSQL backup retention and point-in-time recovery, Temporal persistence, Qdrant snapshot/rebuild, indexer cursor replay, secret rotation and worker revocation. Perform restoration drills before production.

## Secrets
Use a cloud secret manager or equivalent. .env.example contains names only. Never commit real credentials or signing keys.