# P2CODE UI

P2CODE UI is a Next.js 14 application built with [refine](https://refine.dev/) and Material UI to orchestrate TM Forum (TMF) service and resource lifecycles. It provides CRUD dashboards on top of TMF 633/634/638/639/641/652 APIs together with a guided ordering flow so operators can explore catalogs, configure services, and submit service or resource orders from a single console.

## Highlights

- Unified navigation for Service and Resource Catalog, Inventory, and Ordering domains that reuses refine resources and MUI DataGrid CRUD pages.
- Service deployment workspace (`/serviceManagement`) that aggregates catalog data, guides configuration through a stepper, and places TMF 641 service orders.
- Multiple TMF data providers wired via refine’s `dataProvider` API with request-level Keycloak token retrieval.
- Built-in dark/light theme toggle, global kbar command palette, and refine devtools for rapid inspection.
- Storybook setup for iterating on UI components in isolation.
- Integrated documentation hub at `/docs` with deep dives on onboarding, platform integration, service operations, and development practices.

## Tech Stack

- React 18, Next.js App Router, TypeScript
- refine 4 with `@refinedev/mui`, `@refinedev/nextjs-router`, and `@refinedev/simple-rest`
- Material UI (`@mui/material`, `@mui/x-data-grid`, `@mui/x-date-pickers`)
- LangChain client utilities prepared for AI-assisted workflows
- Storybook 8, Vitest, and Playwright (optional)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9 (ships with recent Node releases)

### Installation

```bash
npm install
npm run dev
```

The development server runs on `http://localhost:3000`. The first authenticated user is redirected to the default resource dashboard.

### Login

Authentication is mocked on the client. The login form is pre-filled with `demo@refine.dev` / `demodemo`, but any credentials will succeed and create a cookie-based session. Replace `src/providers/auth-provider` with a production-ready implementation before shipping.

## Connecting to TMF APIs

- REST calls are implemented in `src/providers/data-provider/*`. Each provider targets the Maestro TMF API gateway (e.g. TMF 633 Service Catalog, TMF 641 Service Ordering).
- Access tokens are currently fetched from Keycloak using the helper in `src/app/actions.ts`. The credentials are hard-coded for development; move them to environment variables (e.g. `KEYCLOAK_TOKEN_URL`, `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET`, `KEYCLOAK_USERNAME`, `KEYCLOAK_PASSWORD`) before deploying.
- To point the UI to a different TMF environment, edit the base URLs inside the corresponding provider folder or refactor them to read from environment variables exposed via `next.config.mjs`.

## In-App Documentation

Open `http://localhost:3000/docs` to access the integrated documentation site:

- **Overview** &mdash; Product summary and prerequisites.
- **Getting Started** &mdash; Installation, authentication defaults, and project structure.
- **Platform Integration** &mdash; TMF provider configuration and Keycloak authentication guidance.
- **Service Operations** &mdash; Walkthroughs for catalog CRUD screens and the service deployment workspace.
- **Development Guidance** &mdash; Architecture principles, coding standards, testing strategy, and deployment checklist.

## Project Structure

- `src/app` – App Router routes, including catalog CRUD pages, management flows, and authentication screens.
- `src/components` – Reusable UI pieces such as the authentication page wrapper and service configuration widgets.
- `src/providers` – Auth provider, TMF data providers, and refine devtools wiring.
- `src/contexts` – Theme (light/dark) context used by the root layout.
- `public` – Static assets such as favicons.

## Scripts

- `npm run dev` – Start the Next.js + refine development server.
- `npm run build` – Build the production bundle.
- `npm run start` – Serve the production build.
- `npm run lint` – Run Next.js linting.
- `npm run storybook` / `npm run build-storybook` – Develop or bundle Storybook stories.

## Testing

Vitest and Playwright are configured in `package.json` but no test suites are included yet. Create unit tests under `src/**/__tests__` and run them with `vitest`. End-to-end flows can be automated with Playwright once fixtures are added.

## Deployment

1. Configure TMF endpoints and Keycloak credentials with environment variables.
2. Build the app: `npm run build`.
3. Launch with `npm run start` behind your preferred process manager or container platform.

## Useful Links

- [refine documentation](https://refine.dev/docs)
- [Material UI](https://mui.com/)
- [TM Forum API specifications](https://www.tmforum.org/tm-forum-frameworx/tm-forum-open-apis/)
