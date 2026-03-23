# P2CODE UI

P2CODE UI is an operator-facing web application for managing TM Forum-aligned service and resource lifecycles in the P2CODE platform. It is built with Next.js 14, React 18, TypeScript, refine, and Material UI, and provides a single console for catalog browsing, inventory management, guided configuration, and service or resource ordering.

## Table of Contents

- [Project Purpose](#project-purpose)
- [EU Funding Acknowledgement](#eu-funding-acknowledgement)
- [Key Capabilities](#key-capabilities)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Testing and Quality Checks](#testing-and-quality-checks)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [License](#license)

## Project Purpose

This repository contains the frontend user interface for the P2CODE platform. The application helps operators and integrators work with TM Forum Open APIs for:

- Service Catalog and Resource Catalog browsing and CRUD flows
- Service Inventory and Resource Inventory management
- Service Ordering and Resource Ordering
- Guided service deployment and configuration workflows
- Embedded project documentation for onboarding and platform integration

The UI is intended as a working control plane for P2CODE demonstrations, development, and integration activities. It currently includes mocked client-side authentication and development-oriented provider configuration, so it must be hardened before production deployment.

## EU Funding Acknowledgement

P2CODE (Programming Platform for intelligent COllaborative DEployments over heterogeneous edge-IoT environments) has received funding from the European Union's Horizon Europe research and innovation programme under Grant Agreement No. `101093069`.

Funding acknowledgement:

> Funded by the European Union.

Disclaimer:

> Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the granting authority. Neither the European Union nor the granting authority can be held responsible for them.

If this repository is mirrored, redistributed, or embedded into another deliverable, retain the acknowledgement and disclaimer.

## Key Capabilities

- Unified refine-based navigation across service and resource domains
- CRUD dashboards backed by TMF 633, 634, 638, 639, 641, and 652 APIs
- Guided ordering flow for configuring and submitting service orders
- Material UI-based operator console with theme switching
- Built-in command palette and refine devtools integration
- Storybook setup for isolated component development
- In-app documentation hub exposed at `/docs`

## Technology Stack

- Next.js 14 App Router
- React 18
- TypeScript
- refine 4
- Material UI and MUI X
- Storybook 8
- Vitest and Playwright tooling for future automated test coverage

## Repository Structure

- `src/app` - Application routes, layouts, API routes, and page-level workflows
- `src/components` - Reusable UI components used across operator screens
- `src/providers` - Authentication and TMF data providers
- `src/contexts` - Shared application context such as theme handling
- `src/stories` - Storybook stories and related example assets
- `public` - Static assets bundled with the application
- `Dockerfile` - Container build definition for production packaging

## Prerequisites

- Node.js `>= 18`
- npm `>= 9`
- Access to the target TMF API environment for integration use cases
- Keycloak or another compatible identity provider if replacing the demo authentication flow

## Installation and Setup

1. Clone the repository.
2. Install dependencies.
3. Start the development server.

```bash
npm install
npm run dev
```

The application starts on `http://localhost:3000`.

## Configuration

The current codebase includes development-oriented defaults and some hard-coded integration values. Before deploying or sharing outside a controlled environment, move all secrets and endpoint settings to environment variables.

Recommended variables include:

```bash
KEYCLOAK_TOKEN_URL=
KEYCLOAK_CLIENT_ID=
KEYCLOAK_CLIENT_SECRET=
KEYCLOAK_USERNAME=
KEYCLOAK_PASSWORD=
TMF_API_BASE=
TMF_SERVICE_CATALOG_PATH=
TMF_RESOURCE_CATALOG_PATH=
TMF_SERVICE_INVENTORY_PATH=
TMF_RESOURCE_INVENTORY_PATH=
TMF_SERVICE_ORDER_PATH=
TMF_RESOURCE_ORDER_PATH=
NEXT_PUBLIC_APP_NAME=P2CODE UI
```

Recommended setup approach:

- Keep secrets server-side only
- Read provider endpoints from environment variables instead of hard-coded URLs
- Replace demo login behavior in `src/providers/auth-provider`
- Review `src/app/actions.ts` and `src/providers/data-provider/*` before production use

## Running the Application

### Local Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Storybook

```bash
npm run storybook
```

Storybook runs on `http://localhost:6006` by default.

## Usage

After starting the application:

1. Open `http://localhost:3000`.
2. Sign in using the demo login form. The current client-side implementation accepts the prefilled credentials and is intended for development only.
3. Use the left-hand navigation to open catalog, inventory, ordering, and management areas.
4. Visit `/docs` for embedded guidance on onboarding, integration, service operations, and development practices.

Typical workflows supported by the UI include:

- Browsing and editing service or resource catalog entries
- Reviewing service and resource inventory records
- Creating service or resource orders
- Configuring services through guided operator flows in `/serviceManagement`
- Inspecting component-level UI work in Storybook

## Testing and Quality Checks

Available scripts:

- `npm run lint` - Run Next.js linting
- `npm run build` - Validate that the production build completes
- `npm run storybook` - Run Storybook locally
- `npm run build-storybook` - Build static Storybook assets

Vitest and Playwright are present as dependencies, but this repository does not currently include a committed automated test suite. If you extend the project, add unit and end-to-end tests before relying on the application in a production setting.

## Deployment

### Node-Based Deployment

1. Provide production configuration through environment variables.
2. Build the application with `npm run build`.
3. Launch it with `npm run start`.
4. Place it behind your preferred reverse proxy, ingress controller, or process manager.

### Container Deployment

The repository includes a `Dockerfile` for container-based delivery.

```bash
docker build -t p2code-ui .
docker run --rm -p 3000:3000 p2code-ui
```

Before container deployment, ensure the runtime environment provides the required API endpoints, credentials, and secrets.

## Documentation

The repository includes both this top-level README and an in-application documentation section available at `/docs`.

Available documentation pages include:

- Overview
- Getting Started
- Platform Integration
- Service Operations
- Development Guidance

External references:

- [refine documentation](https://refine.dev/docs)
- [Material UI documentation](https://mui.com/)
- [TM Forum Open API overview](https://www.tmforum.org/tm-forum-frameworx/tm-forum-open-apis/)

## License

This repository is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for the full text.

When redistributing or reusing this software, preserve the copyright notice, license text, and the Horizon Europe funding acknowledgement above where relevant.
