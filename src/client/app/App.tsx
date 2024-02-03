import { Router, Route } from "preact-router";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import "./styles/globals.css";
import { AppProvider } from "../shared/model/context";
import { ISettings } from "../shared/types/ISettings";

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
        <Route path="/" component={() => <Home />} />
        <Route path="*" default component={() => <NotFound />} />
      </Router>
    </AppProvider>
  );
}
