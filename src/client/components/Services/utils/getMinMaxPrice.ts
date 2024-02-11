import { ICarType } from "src/client/shared/types/ICarType";
import { IPricesRange } from "src/client/shared/types/IPricesRange";

export function getMinMaxPrice(
  prices: IPricesRange,
  wheels: number,
  carType: ICarType | null,
  radius: number
) {
  if (radius < 12) radius = 12;
  if (radius > 21) radius = 21;
  if (!wheels && !radius && carType) {
    return `от ${prices[carType][12].min} до ${prices[carType][21].max}`;
  } else if (!wheels && radius && !carType) {
    return `от ${prices.passengerCar[radius].min} до ${prices.suv[radius].max}`;
  } else if (!wheels && radius && carType) {
    return `от ${prices[carType][radius].min} до ${prices[carType][radius].max}`;
  } else if (wheels && !radius && !carType) {
    return `от ${prices.passengerCar[12].min * wheels} до ${
      prices.suv[21].max * wheels
    }`;
  } else if (wheels && radius && !carType) {
    return `от ${prices.passengerCar[radius].min * wheels} до ${
      prices.suv[radius].max * wheels
    }`;
  } else if (wheels && !radius && carType) {
    return `от ${prices[carType][12].min * wheels} до ${
      prices[carType][21].max * wheels
    }`;
  } else if (wheels && radius && carType) {
    return `от ${prices[carType][radius].min * wheels} до ${
      prices[carType][radius].max * wheels
    }`;
  }
  return `от ${prices.passengerCar[12].min} до ${prices.suv[21].max}`;
}
