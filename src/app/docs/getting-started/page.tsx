import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <article>
      <h1>Getting Started</h1>
      <p>
        Follow this guide to install dependencies, run the development server,
        and understand how authentication works in a fresh environment.
      </p>

      <section>
        <h2>Installation</h2>
        <ol>
          <li>
            Ensure you have <code>node</code> 18+ and <code>npm</code> 9+
            available in your shell.
          </li>
          <li>
            Install dependencies:
            <pre>
              <code>npm install</code>
            </pre>
          </li>
          <li>
            Start the development server:
            <pre>
              <code>npm run dev</code>
            </pre>
          </li>
          <li>
            Navigate to <code>http://localhost:3000</code>. The app redirects
            authenticated users to the first resource dashboard.
          </li>
        </ol>
      </section>

      <section>
        <h2>Authentication Defaults</h2>
        <p>
          The UI ships with a mock client-side auth provider located in{" "}
          <code>src/providers/auth-provider/auth-provider.client.ts</code>.
          Logging in sets a cookie named <code>auth</code> with a sample user.
        </p>
        <ul>
          <li>
            The login form is pre-filled with <code>demo@refine.dev</code> /
            <code>demodemo</code>.
          </li>
          <li>
            Any credentials succeed until the provider is replaced with a real
            integration.
          </li>
          <li>
            Auth checks occur in both client and server contexts to guard routes
            such as <code>/serviceManagement</code>.
          </li>
        </ul>
        <p>
          For production, swap the mock with your identity provider.
          <Link href="/docs/platform-integration"> Platform Integration</Link>{" "}
          covers how to do this safely.
        </p>
      </section>

      <section>
        <h2>NPM Scripts</h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                Script
              </th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.5rem 0" }}>
                <code>npm run dev</code>
              </td>
              <td>Starts the refine + Next.js development server.</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0" }}>
                <code>npm run build</code>
              </td>
              <td>Generates the production bundle.</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0" }}>
                <code>npm run start</code>
              </td>
              <td>Runs the compiled app in production mode.</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0" }}>
                <code>npm run lint</code>
              </td>
              <td>Executes Next.js linting with the project config.</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0" }}>
                <code>npm run storybook</code>
              </td>
              <td>Launches Storybook on port 6006.</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0" }}>
                <code>npm run build-storybook</code>
              </td>
              <td>Builds the static Storybook bundle.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Directory Landmarks</h2>
        <ul>
          <li>
            <code>src/app</code> &mdash; App Router routes, including CRUD pages
            and service workflows.
          </li>
          <li>
            <code>src/components</code> &mdash; Reusable UI pieces (auth page,
            service configurator, dashboards).
          </li>
          <li>
            <code>src/providers</code> &mdash; Auth provider, TMF data providers,
            and refine devtools wiring.
          </li>
          <li>
            <code>src/contexts</code> &mdash; React contexts such as the theme
            (light/dark) handler.
          </li>
        </ul>
      </section>
    </article>
  );
}
