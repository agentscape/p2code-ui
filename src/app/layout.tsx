import { DevtoolsProvider } from "@providers/devtools";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { dataProvider } from "@providers/data-provider";

import {
  CancelPresentation,
  Category,
  ChatRounded,
  Code,
  DeveloperBoard,
  Insights,
  MenuBook,
  MiscellaneousServices,
  Settings,
  SettingsSuggest,
  Subscriptions,
} from "@mui/icons-material";
import { tmf633DataProvider } from "@providers/data-provider/tmf-633";
import { tmf638DataProvider } from "@providers/data-provider/tmf-638";
import { tmf641DataProvider } from "@providers/data-provider/tmf-641";
import { tmf634DataProvider } from "@providers/data-provider/tmf-634";
import { tmf639DataProvider } from "@providers/data-provider/tmf-639";
import { tmf652DataProvider } from "@providers/data-provider/tmf-652";

export const metadata: Metadata = {
  title: "P2CODE UI",
  description: "P2CODE User Interface",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <body>
        <Suspense>
          {/* <GitHubBanner /> */}
          <RefineKbarProvider>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <RefineSnackbarProvider>
                <DevtoolsProvider>
                  <Refine
                    routerProvider={routerProvider}
                    dataProvider={{
                      default: dataProvider,
                      serviceCatalogDataProvider: tmf633DataProvider,
                      serviceInventoryDataProvider: tmf638DataProvider,
                      serviceOrderingDataProvider: tmf641DataProvider,
                      resourceCatalogDataProvider: tmf634DataProvider,
                      resourceInventoryDataProvider: tmf639DataProvider,
                      resourceOrderingDataProvider: tmf652DataProvider,
                    }}
                    notificationProvider={useNotificationProvider}
                    authProvider={authProviderClient}
                    resources={[
                      {
                        name: "Service Management",
                        meta: { label: "Service Management", icon: <Code /> },
                      },
                      {
                        name: "Resource Management",
                        meta: { label: "Resource Management", icon: <Code /> },
                      },
                      {
                        name: "Service Catalog",
                        meta: { label: "Service Catalog" },
                      },
                      {
                        name: "Service Inventory",
                        meta: { label: "Service Inventory" },
                      },
                      {
                        name: "Service Ordering",
                        meta: { label: "Service Ordering" },
                      },
                      {
                        name: "Resource Catalog",
                        meta: { label: "Resource Catalog" },
                      },
                      {
                        name: "Resource Inventory",
                        meta: { label: "Resource Inventory" },
                      },
                      {
                        name: "Resource Ordering",
                        meta: { label: "Resource Ordering" },
                      },
                      {
                        name: "serviceManagement",
                        list: "/serviceManagement",
                        meta: {
                          parent: "Service Management",
                          icon: <Settings />,
                          label: "Deployment",
                        },
                      },
                      {
                        name: "serviceMonitoring",
                        list: "/serviceManagement/monitoring",
                        meta: {
                          parent: "Service Management",
                          icon: <Insights/>,
                          label: "Monitoring",
                        },
                      },
                      {
                        name: "resourceManagement",
                        list: "/resourceManagement",
                        meta: {
                          parent: "Resource Management",
                          icon: <DeveloperBoard />,
                          label: "Deployment",
                        },
                      },
                      {
                        name: "resourceMonitoring",
                        list: "/resourceManagement/monitoring",
                        meta: {
                          parent: "Resource Management",
                          icon: <Insights />,
                          label: "Monitoring",
                        },
                      },
                      {
                        name: "serviceCatalog",
                        list: "/serviceCatalog",
                        create: "/serviceCatalog/create",
                        edit: "/serviceCatalog/edit/:id",
                        show: "/serviceCatalog/show/:id",
                        meta: {
                          parent: "Service Catalog",
                          canDelete: true,
                          icon: <MenuBook />,
                          dataProviderName: "serviceCatalogDataProvider",
                        },
                      },
                      {
                        name: "serviceCategory",
                        list: "/serviceCategory",
                        create: "/serviceCategory/create",
                        edit: "/serviceCategory/edit/:id",
                        show: "/serviceCategory/show/:id",
                        meta: {
                          parent: "Service Catalog",
                          canDelete: true,
                          icon: <Category />,
                          dataProviderName: "serviceCatalogDataProvider",
                        },
                      },
                      {
                        name: "serviceCandidate",
                        list: "/serviceCandidate",
                        create: "/serviceCandidate/create",
                        edit: "/serviceCandidate/edit/:id",
                        show: "/serviceCandidate/show/:id",
                        meta: {
                          parent: "Service Catalog",
                          canDelete: true,
                          icon: <MiscellaneousServices />,
                          dataProviderName: "serviceCatalogDataProvider",
                        },
                      },
                      {
                        name: "serviceSpecification",
                        list: "/serviceSpecification",
                        create: "/serviceSpecification/create",
                        edit: "/serviceSpecification/edit/:id",
                        show: "/serviceSpecification/show/:id",
                        meta: {
                          parent: "Service Catalog",
                          canDelete: true,
                          icon: <SettingsSuggest />,
                          dataProviderName: "serviceCatalogDataProvider",
                        },
                      },
                      {
                        name: "service",
                        list: "/service",
                        create: "/service/create",
                        edit: "/service/edit/:id",
                        show: "/service/show/:id",
                        meta: {
                          parent: "Service Inventory",
                          canDelete: true,
                          icon: <Settings />,
                          dataProviderName: "serviceInventoryDataProvider",
                        },
                      },
                      {
                        name: "serviceOrder",
                        list: "/serviceOrder",
                        create: "/serviceOrder/create",
                        edit: "/serviceOrder/edit/:id",
                        show: "/serviceOrder/show/:id",
                        meta: {
                          parent: "Service Ordering",
                          canDelete: true,
                          icon: <Subscriptions />,
                          dataProviderName: "serviceOrderingDataProvider",
                        },
                      },
                      // {
                      //   name: "cancelServiceOrder",
                      //   list: "/cancelServiceOrder",
                      //   create: "/cancelServiceOrder/create",
                      //   edit: "/cancelServiceOrder/edit/:id",
                      //   show: "/cancelServiceOrder/show/:id",
                      //   meta: {
                      //     parent: "Service Ordering",
                      //     canDelete: true,
                      //     icon: <CancelPresentation />,
                      //     dataProviderName: "serviceOrderingDataProvider",
                      //   },
                      // },
                      {
                        name: "resourceCatalog",
                        list: "/resourceCatalog",
                        create: "/resourceCatalog/create",
                        edit: "/resourceCatalog/edit/:id",
                        show: "/resourceCatalog/show/:id",
                        meta: {
                          parent: "Resource Catalog",
                          canDelete: true,
                          icon: <MenuBook />,
                          dataProviderName: "resourceCatalogDataProvider",
                        },
                      },
                      {
                        name: "resourceCategory",
                        list: "/resourceCategory",
                        create: "/resourceCategory/create",
                        edit: "/resourceCategory/edit/:id",
                        show: "/resourceCategory/show/:id",
                        meta: {
                          parent: "Resource Catalog",
                          canDelete: true,
                          icon: <Category />,
                          dataProviderName: "resourceCatalogDataProvider",
                        },
                      },
                      {
                        name: "resourceCandidate",
                        list: "/resourceCandidate",
                        create: "/resourceCandidate/create",
                        edit: "/resourceCandidate/edit/:id",
                        show: "/resourceCandidate/show/:id",
                        meta: {
                          parent: "Resource Catalog",
                          canDelete: true,
                          icon: <MiscellaneousServices />,
                          dataProviderName: "resourceCatalogDataProvider",
                        },
                      },
                      {
                        name: "resourceSpecification",
                        list: "/resourceSpecification",
                        create: "/resourceSpecification/create",
                        edit: "/resourceSpecification/edit/:id",
                        show: "/resourceSpecification/show/:id",
                        meta: {
                          parent: "Resource Catalog",
                          canDelete: true,
                          icon: <SettingsSuggest />,
                          dataProviderName: "resourceCatalogDataProvider",
                        },
                      },
                      {
                        name: "resource",
                        list: "/resource",
                        create: "/resource/create",
                        edit: "/resource/edit/:id",
                        show: "/resource/show/:id",
                        meta: {
                          parent: "Resource Inventory",
                          canDelete: true,
                          icon: <DeveloperBoard />,
                          dataProviderName: "resourceInventoryDataProvider",
                        },
                      },
                      {
                        name: "resourceOrder",
                        list: "/resourceOrder",
                        create: "/resourceOrder/create",
                        edit: "/resourceOrder/edit/:id",
                        show: "/resourceOrder/show/:id",
                        meta: {
                          parent: "Resource Ordering",
                          canDelete: true,
                          icon: <Subscriptions />,
                          dataProviderName: "resourceOrderingDataProvider",
                        },
                      },
                      // {
                      //   name: "cancelResourceOrder",
                      //   list: "/cancelResourceOrder",
                      //   create: "/cancelResourceOrder/create",
                      //   edit: "/cancelResourceOrder/edit/:id",
                      //   show: "/cancelResourceOrder/show/:id",
                      //   meta: {
                      //     parent: "Resource Ordering",
                      //     canDelete: true,
                      //     icon: <CancelPresentation />,
                      //     dataProviderName: "resourceOrderingDataProvider",
                      //   },
                      // },
                    ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      projectId: "7kXRtd-2jMuzi-EeV7WR",
                    }}
                  >
                    {children}
                    <RefineKbar />
                  </Refine>
                </DevtoolsProvider>
              </RefineSnackbarProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
