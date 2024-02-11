import { Router } from "preact-router";
import "./styles/globals.css";
import { AppProvider } from "../shared/model/context";
import { ISettings } from "../shared/types/ISettings";
import AsyncRoute from "preact-async-route";

export function App({
  url,
  server,
  context,
}: {
  url?: string;
  server?: boolean;
  context?: ISettings;
}) {
  if (!server) context = window.__settings__;
  return (
    <AppProvider settings={context}>
      <Router url={url} static={server}>
        <AsyncRoute
          path="/"
          getComponent={() =>
            import("../pages/Home/Home").then((module) => module.default)
          }
        />
        <AsyncRoute
          path="*"
          default
          component={() =>
            import("../pages/NotFound/NotFound").then(
              (module) => module.default
            )
          }
        />
      </Router>
    </AppProvider>
  );
}
