import { ISettings } from "../../types/ISettings";
import { createContext } from "preact";
import { IProvider } from "../types/IProvider";
import { useEffect, useState } from "preact/hooks";
import { getSettings } from "../../api/getSettings";
import { route } from "preact-router";

export const settingsContext = createContext<ISettings | undefined>(undefined);

interface ISettingsProvider extends IProvider {
  preloadState?: ISettings;
}

export function SettingsProvider({
  preloadState,
  children,
}: ISettingsProvider) {
  const [settings, setSettings] = useState(preloadState);
  useEffect(() => {
    if (!settings)
      getSettings()
        .then((data) => setSettings(data))
        .catch((error) => {
          console.error(error);
          route("/server-error", true);
        });
  }, [settings]);
  return (
    <settingsContext.Provider value={settings}>
      {children}
    </settingsContext.Provider>
  );
}
