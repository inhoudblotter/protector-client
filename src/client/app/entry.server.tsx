import { render as renderToString } from "preact-render-to-string";
import { App } from "./App";
import { ISettings } from "../shared/types/ISettings";

export function render({
  url = "/",
  context,
}: {
  url: string;
  context: { settings?: ISettings };
}) {
  return renderToString(<App url={url} context={context} server />);
}
