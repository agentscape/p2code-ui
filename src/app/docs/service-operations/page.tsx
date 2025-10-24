export default function ServiceOperationsPage() {
  return (
    <article>
      <h1>Service Operations</h1>
      <p>
        This chapter walks through the operator workflows supported by P2CODE
        UI, including catalog exploration, service configuration, and order
        submission. Use it as a runbook for daily operations or as a reference
        when extending flows.
      </p>

      <section>
        <h2>Navigating the Console</h2>
        <ul>
          <li>
            The sidebar is populated via the refine <code>resources</code>{" "}
            declaration in <code>src/app/layout.tsx</code>.
          </li>
          <li>
            Parent nodes (e.g. <em>Service Catalog</em>) group CRUD screens and
            workflows for each TMF domain.
          </li>
          <li>
            A global command palette is available with <kbd>⌘</kbd>+<kbd>k</kbd>
            (<kbd>Ctrl</kbd>+<kbd>k</kbd> on Windows) via <code>RefineKbar</code>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2>Catalog CRUD Pages</h2>
        <p>
          Each catalog or inventory entity uses refine’s list / create / edit /
          show components combined with MUI DataGrid:
        </p>
        <ul>
          <li>
            Data is loaded from the relevant TMF provider (e.g. service catalog
            pages read from TMF 633).
          </li>
          <li>
            Actions such as edit or delete render inline buttons defined in the
            column configuration inside the route component.
          </li>
          <li>
            Fine-tune columns by editing the relevant page under{" "}
            <code>src/app/&lt;resource&gt;/page.tsx</code>.
          </li>
        </ul>
        <p>
          Since pagination is disabled by default, consider enabling it for
          large datasets by adjusting the <code>useDataGrid</code> hook.
        </p>
      </section>

      <section>
        <h2>Service Deployment Workspace</h2>
        <p>
          The <strong>Service Management</strong> module at{" "}
          <code>/serviceManagement</code> orchestrates service configuration and
          ordering:
        </p>
        <ol>
          <li>
            <strong>Select service</strong> &mdash; Catalog data is aggregated by{" "}
            <code>fetchAggregatedServices</code> to consolidate categories,
            candidates, and specifications.
          </li>
          <li>
            <strong>Configure service</strong> &mdash; The{" "}
            <code>CategoryServiceConfigurator</code> component exposes
            characteristics for the chosen service. Defaults are pre-filled from
            the specification.
          </li>
          <li>
            <strong>Deploy</strong> &mdash; <code>buildServiceOrder</code>{" "}
            transforms configured services into TMF 641 compatible order items
            and submits them via <code>makeServiceOrder</code>.
          </li>
        </ol>
        <p>
          Each step uses Material UI components (Stepper, Cards, JsonViewer) for
          clarity. Tailor them to match your operator workflow—for example, add
          approval gates or post-order webhook calls.
        </p>
      </section>

      <section>
        <h2>Resource Operations</h2>
        <p>
          Resource catalog, inventory, and ordering pages mirror the service
          flows but target TMF 634, 639, and 652. To extend resource actions:
        </p>
        <ul>
          <li>
            Update the resource-specific components under{" "}
            <code>src/app/resource*</code>.
          </li>
          <li>
            Reuse helper functions from <code>src/app/actions.ts</code> or add
            new route handlers for complex orchestration.
          </li>
        </ul>
      </section>

      <section>
        <h2>Notifications and Feedback</h2>
        <p>
          refine’s <code>useNotification</code> hook (see{" "}
          <code>/serviceManagement/page.tsx</code>) surfaces success or failure
          states. Ensure long-running operations provide meaningful feedback:
        </p>
        <ul>
          <li>Display loading states while awaiting API responses.</li>
          <li>Surface API error payloads to aid troubleshooting.</li>
          <li>
            Log structured details to an observability pipeline when operating
            in production.
          </li>
        </ul>
      </section>
    </article>
  );
}
