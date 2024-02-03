import { ISettings } from "./ISettings";
declare global {
  interface Window {
    __settings__?: ISettings;
  }
}
