export default function PlatformIntegrationPage() {
  return (
    <article>
      <h1>Platform Integration</h1>
      <p>
        P2CODE UI layers a refine-powered front end on top of TM Forum Open
        APIs. This section explains how data providers, authentication, and
        network calls are wired so you can point the console at your own TMF
        landscape.
      </p>

      <section>
        <h2>TMF Data Providers</h2>
        <p>
          refine uses <code>dataProvider</code> objects to translate CRUD
          operations to HTTP requests. Providers for each TMF domain live under
          <code>src/providers/data-provider</code>:
        </p>
        <ul>
          <li>
            <code>tmf-633</code> &mdash; Service Catalog
          </li>
          <li>
            <code>tmf-634</code> &mdash; Resource Catalog
          </li>
          <li>
            <code>tmf-638</code> &mdash; Service Inventory
          </li>
          <li>
            <code>tmf-639</code> &mdash; Resource Inventory
          </li>
          <li>
            <code>tmf-641</code> &mdash; Service Ordering
          </li>
          <li>
            <code>tmf-652</code> &mdash; Resource Ordering
          </li>
        </ul>
        <p>
          These providers reuse <code>@refinedev/simple-rest</code> with
          base URLs targeting the Maestro TMF gateway. Update the base URL or
          wrap providers with a proxy if your environment differs.
        </p>
      </section>

      <section>
        <h2>Authentication With Keycloak</h2>
        <p>
          Provider requests are authenticated using a Keycloak-generated bearer
          token:
        </p>
        <ol>
          <li>
            <code>getAccessToken</code> in{" "}
            <code>src/app/actions.ts</code> performs a password grant against
            the TMF realm.
          </li>
          <li>
            Axios interceptors in provider clients add the{" "}
            <code>Authorization: Bearer &lt;token&gt;</code> header.
          </li>
          <li>
            Long-running flows (e.g. service order submission) call
            <code>makeServiceOrder</code>, which fetches a fresh token for each
            request to avoid expiry issues.
          </li>
        </ol>
        <p>
          Replace the hard-coded credentials with environment variables before
          deploying. A recommended mapping:
        </p>
        <ul>
          <li>
            <code>KEYCLOAK_TOKEN_URL</code>
          </li>
          <li>
            <code>KEYCLOAK_CLIENT_ID</code> / <code>KEYCLOAK_CLIENT_SECRET</code>
          </li>
          <li>
            <code>KEYCLOAK_USERNAME</code> / <code>KEYCLOAK_PASSWORD</code>
          </li>
        </ul>
        <p>
          Expose these to the browser only if absolutely necessary. Whenever
          possible, keep secrets server-side using Next.js Route Handlers or
          API routes.
        </p>
      </section>

      <section>
        <h2>Environment Configuration</h2>
        <p>
          Create a <code>.env.local</code> file at the project root to override
          provider defaults:
        </p>
        <pre>
          <code>
            {`TMF_API_BASE=https://your-gateway.example.com/tmf-api
TMF_SERVICE_CATALOG_PATH=/serviceCatalogManagement/v4
TMF_SERVICE_ORDER_PATH=/serviceOrdering/v4`}
          </code>
        </pre>
        <p>
          Update the relevant provider modules to read from these variables.
          With Next.js, remember to prefix any values required on the client
          with <code>NEXT_PUBLIC_</code>.
        </p>
      </section>

      <section>
        <h2>Handling API Variations</h2>
        <p>
          TMF implementations can differ in subtle ways. Common adjustments
          include:
        </p>
        <ul>
          <li>
            Normalizing field names or nested paths in the DataGrid column
            definitions.
          </li>
          <li>
            Extending refine&apos;s <code>meta</code> configuration to filter or
            sort results server-side when datasets grow.
          </li>
          <li>
            Wrapping provider calls with error translation logic to surface
            friendly messages in the UI.
          </li>
          <li>
            Introducing caching for large catalog payloads with Next.js
            <code>revalidate</code> or edge caching strategies.
          </li>
        </ul>
      </section>

      <section>
        <h2>Security Considerations</h2>
        <p>
          When moving beyond the demo environment:
        </p>
        <ul>
          <li>
            Enforce server-side authorization checks before exposing protected
            pages. refine&apos;s <code>Authenticated</code> component is only a
            first layer.
          </li>
          <li>
            Audit token scopes to ensure the UI accesses only required TMF
            APIs.
          </li>
          <li>
            Store refresh tokens securely and rotate client secrets according to
            your identity provider policy.
          </li>
        </ul>
      </section>
    </article>
  );
}
