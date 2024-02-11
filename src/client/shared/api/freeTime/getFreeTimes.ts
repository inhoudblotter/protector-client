import { IError } from "src/client/shared/types/IError";
import { isError } from "src/client/shared/types/typeGuards/isError";
import { ITimes } from "../../types/ITimes";

export async function getFreeTimes(
  date: string,
  order: {
    services: string[];
    wheels: number;
  }
) {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_HOST
    }/free-time/day/${date}?services=${order.services.join(",")}&wheels=${
      order.wheels
    }`,
    {
      mode: "cors",
      credentials: "include",
    }
  );
  const data = (await res.json()) as ITimes | IError;
  if (!isError(data)) {
    return data;
  }
  throw data;
}
