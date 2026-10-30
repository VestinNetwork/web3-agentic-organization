# @wao/ports

Application-owned contracts for global policy enforcement, model inference, durable workflows, blockchain read access and audit output.

No external HTTP/CLI schema is assumed here. Concrete adapters must be implemented only after versioned contracts for agent-global, OpenXera, Zivi Core and Temporal are inspected. A production adapter must fail closed for protected operations.
