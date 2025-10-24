export default function DocsOverviewPage() {
  return (
    <article>
      <h1>P2CODE UI Overview</h1>
      <p>
        P2CODE UI is an operator-facing console built with Next.js 14,
        refine, and Material UI. It centralizes TM Forum service and resource
        lifecycles so teams can explore catalog offerings, configure solution
        bundles, and submit service or resource orders from a single workspace.
      </p>

      <section>
        <h2>Key Capabilities</h2>
        <ul>
          <li>
            Unified navigation spanning Service Catalog, Inventory, Ordering, and
            their resource counterparts via refine resources.
          </li>
          <li>
            Guided service deployment flow that aggregates catalog data,
            captures configuration details, and orchestrates TMF 641 service
            orders.
          </li>
          <li>
            Dynamic UI built on Material UI, refine data grids, and a global
            command palette to surface actions quickly.
          </li>
          <li>
            Modular data providers for TMF 633/634/638/639/641/652 APIs with
            Keycloak-authenticated requests.
          </li>
        </ul>
      </section>

      <section>
        <h2>When to Use This Documentation</h2>
        <p>
          Use this documentation to onboard to the codebase, connect the UI to
          your TMF platform, or extend workflows. Each section focuses on a
          specific aspect of building and operating the app:
        </p>
        <ul>
          <li>
            <strong>Getting Started</strong> &mdash; environment setup, npm
            scripts, and authentication defaults.
          </li>
          <li>
            <strong>Platform Integration</strong> &mdash; TMF data provider
            configuration, Keycloak token management, and API conventions.
          </li>
          <li>
            <strong>Service Operations</strong> &mdash; end-to-end walkthrough
            of the service deployment workspace and catalog CRUD flows.
          </li>
          <li>
            <strong>Development Guidance</strong> &mdash; architecture overview,
            coding standards, testing, and Storybook usage.
          </li>
        </ul>
      </section>

      <section>
        <h2>Prerequisites</h2>
        <ul>
          <li>Node.js 18 or newer</li>
          <li>
            Access to TM Forum APIs (TMF 633, 634, 638, 639, 641, 652) and a
            Keycloak realm with client credentials
          </li>
          <li>npm CLI for installing dependencies and running scripts</li>
        </ul>
      </section>
    </article>
  );
}
