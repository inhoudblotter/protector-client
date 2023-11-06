import { IProvider } from "./types/IProvider";
import { CluesProvider } from "./slices/clues";

export function AppProvider({ children }: IProvider) {
  return <CluesProvider>{children}</CluesProvider>;
}
