import { IError } from "../types/IError";
import { ISettings } from "../types/ISettings";
import { isError } from "../types/typeGuards/isError";

export async function getSettings() {
  const res = await fetch(import.meta.env.VITE_API_HOST + "/settings", {
    mode: "cors",
  });
  const data = (await res.json()) as ISettings | IError;
  if (res.ok && !isError(data)) {
    return data;
  } else throw data;
}
