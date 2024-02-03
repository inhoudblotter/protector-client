import { IProvider } from "./types/IProvider";
import { CluesProvider } from "./slices/clues";
import { ISettings } from "../types/ISettings";
import { SettingsProvider } from "./slices/settings";

interface IAppProvider extends IProvider {
  settings?: ISettings;
}

export function AppProvider({ children, settings }: IAppProvider) {
  return (
    <SettingsProvider preloadState={settings}>
      <CluesProvider>{children}</CluesProvider>
    </SettingsProvider>
  );
}
