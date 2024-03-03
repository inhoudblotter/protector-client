import "dotenv/config";
import { ISettings } from "src/client/shared/types/ISettings";

export async function getSettings() {
  const res = await fetch(`${process.env.VITE_API_HOST}/settings`);
  const data = (await res.json()) as ISettings;
  if (res.ok) return data;
  throw data;
}
