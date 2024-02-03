import "dotenv/config";

export async function getSettings() {
  const res = await fetch(process.env.VITE_API_HOST + "/settings", {
    mode: "cors",
  });
  const data = (await res.json()) as {};
  if (res.ok) {
    return data;
  } else throw data;
}
