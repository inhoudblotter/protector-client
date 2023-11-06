import { Router, Route } from "preact-router";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import "./styles/globals.css";
import { AppProvider } from "../shared/model/context";

export function App({ url, server }: { url?: string; server?: boolean }) {
  return (
    <AppProvider>
      <Router url={url} static={server}>
        <Route path="/" component={() => <Home />} />
        <Route path="*" default component={() => <NotFound />} />
      </Router>
    </AppProvider>
  );
}
