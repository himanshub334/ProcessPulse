# Architecture

React/TypeScript dashboard → Express/TypeScript API → PostgreSQL. Jira Cloud is an external source synchronized through the API. The digest endpoint aggregates delivery risk and can be connected to SMTP/Slack in a deployment environment.

Dependency relationships are stored as directed edges. A production extension can run topological sorting and cycle detection over the same graph to calculate a precise critical path.
