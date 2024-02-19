import { Route, Router } from "preact-router";
import "./styles/globals.css";
import { AppProvider } from "../shared/model/context";
import { ISettings } from "../shared/types/ISettings";
import AsyncRoute from "preact-async-route";
import Home from "../pages/Home/Home";
export function App({
  url,
  server,
  context,
}: {
  url?: string;
  server?: boolean;
  context?: { settings?: ISettings };
}) {
  if (!server) context = { settings: window.__settings__ };
  return (
    <AppProvider settings={context?.settings}>
      <Router url={url} static={server}>
        <Route path="/" component={Home} />
        <AsyncRoute
          path="/personal-data-terms"
          getComponent={() =>
            import("../pages/PersonalDataTerms/PersonalDataTerms").then(
              (module) => module.default
            )
          }
        />

        <AsyncRoute
          path="/server-error"
          getComponent={() =>
            import("../pages/ServerError/ServerError").then(
              (module) => module.default
            )
          }
        />
        <AsyncRoute
          path="*"
          default
          getComponent={() =>
            import("../pages/NotFound/NotFound").then(
              (module) => module.default
            )
          }
        />
      </Router>
    </AppProvider>
  );
}
