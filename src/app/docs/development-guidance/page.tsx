export default function DevelopmentGuidancePage() {
  return (
    <article>
      <h1>Development Guidance</h1>
      <p>
        Align with the patterns below when extending the UI. They capture the
        architectural decisions, coding standards, and testing strategy adopted
        by the team.
      </p>

      <section>
        <h2>Architecture Principles</h2>
        <ul>
          <li>
            <strong>Refine-first workflows:</strong> Prefer refine hooks and
            components for CRUD flows to benefit from built-in caching,
            mutation handling, and routing helpers.
          </li>
          <li>
            <strong>Server actions for orchestration:</strong> Place complex TMF
            calls in <code>src/app/actions.ts</code> or dedicated server actions
            so secrets stay server-side and responses can be validated before
            reaching the client.
          </li>
          <li>
            <strong>Component modularity:</strong> Keep reusable UI in{" "}
            <code>src/components</code> with minimal side effects. co-locate
            domain-specific helpers next to routes when they are not reused.
          </li>
          <li>
            <strong>Configuration via environment variables:</strong> Avoid
            hard-coded URLs and credentials. Use <code>.env.local</code> and
            Next.js runtime config to inject environment-specific values.
          </li>
        </ul>
      </section>

      <section>
        <h2>Coding Standards</h2>
        <ul>
          <li>
            Use TypeScript typings for props, API payloads, and helper
            functions. The <code>ServiceItem</code> typedef is a good reference.
          </li>
          <li>
            Prefer functional React components and hooks. Class components are
            discouraged.
          </li>
          <li>
            Keep JSX readable by extracting subcomponents when render logic
            grows beyond ~50 lines.
          </li>
          <li>
            Add brief comments for non-obvious logic (token fetches, mapping
            TMF payloads) but avoid noise.
          </li>
          <li>
            Run <code>npm run lint</code> before submitting changes to ensure
            formatting and lint rules pass.
          </li>
        </ul>
      </section>

      <section>
        <h2>Testing Strategy</h2>
        <p>
          Vitest and Playwright are included but no suites ship by default. A
          suggested testing pyramid:
        </p>
        <ul>
          <li>
            <strong>Unit tests</strong> for helper utilities (e.g.
            <code>buildServiceOrder</code>) placed under{" "}
            <code>src/**/__tests__</code>.
          </li>
          <li>
            <strong>Component tests</strong> with Storybook test runner or Vitest
            + <code>@testing-library/react</code> for critical UI fragments.
          </li>
          <li>
            <strong>End-to-end tests</strong> with Playwright covering the happy
            path of logging in and submitting a service order.
          </li>
        </ul>
        <p>
          When TMF environments are unavailable, mock HTTP responses with MSW
          or refine&apos;s client-side mocks to keep CI deterministic.
        </p>
      </section>

      <section>
        <h2>Storybook Usage</h2>
        <p>
          Storybook is configured under the <code>.storybook</code> directory.
          Use it to:
        </p>
        <ul>
          <li>
            Prototype component states without running the full application.
          </li>
          <li>
            Document props and edge cases using DocsPage stories.
          </li>
          <li>
            Integrate Chromatic or similar tooling for UI regression checking if
            desired.
          </li>
        </ul>
      </section>

      <section>
        <h2>Deployment Checklist</h2>
        <ol>
          <li>Set environment variables for TMF endpoints and Keycloak.</li>
          <li>Run <code>npm run build</code> and resolve warnings or errors.</li>
          <li>
            Execute the relevant test suites (unit, component, or e2e) when
            available.
          </li>
          <li>
            Review data provider logs to confirm required scopes and payloads.
          </li>
          <li>
            Configure monitoring/alerting for order submission failures or API
            latency spikes.
          </li>
        </ol>
      </section>
    </article>
  );
}
