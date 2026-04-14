import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./routes/HomePage";
import { DocsLayout } from "./layouts/DocsLayout";
import { SelectionPage } from "./routes/docs/SelectionPage";
import { MultiSelectionPage } from "./routes/docs/MultiSelectionPage";
import { InstallationPage } from "./routes/docs/InstallationPage";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/docs",
  component: DocsLayout,
});

const installationRoute = createRoute({
  getParentRoute: () => docsRoute,
  path: "/",
  component: InstallationPage,
});

const selectionRoute = createRoute({
  getParentRoute: () => docsRoute,
  path: "/selection",
  component: SelectionPage,
});

const multiSelectionRoute = createRoute({
  getParentRoute: () => docsRoute,
  path: "/multi-selection",
  component: MultiSelectionPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  docsRoute.addChildren([installationRoute, selectionRoute, multiSelectionRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
