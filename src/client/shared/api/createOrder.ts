import { IError } from "../types/IError";
import { IOrder } from "../types/IOrder";
import { isError } from "../types/typeGuards/isError";

export async function createOrder(order: IOrder) {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const data = (await res.json()) as { id: number } | IError;
  if (res.ok && !isError(data)) {
    return data.id;
  }
  throw data;
}
