import { ICarType } from "src/client/shared/types/ICarType";
import { IPrices } from "src/client/shared/types/IPrices";

export function getDefaultPrice(
  prices: IPrices,
  wheels: number,
  carType: ICarType | null,
  radius: number
) {
  if (radius < 12) radius = 12;
  if (radius > 21) radius = 21;
  if (!wheels && !radius && carType) {
    return `от ${prices[carType][12]}`;
  } else if (!wheels && radius && !carType) {
    return `от ${prices.passengerCar[radius]}`;
  } else if (!wheels && radius && carType) {
    return `от ${prices[carType][radius]}`;
  } else if (wheels && !radius && !carType) {
    return `от ${prices.passengerCar[12] * wheels}`;
  } else if (wheels && radius && !carType) {
    return `от ${prices.passengerCar[radius] * wheels}`;
  } else if (wheels && !radius && carType) {
    return `от ${prices[carType][12] * wheels}`;
  } else if (wheels && radius && carType) {
    return (prices[carType][radius] * wheels).toString();
  } else {
    return `от ${prices.passengerCar[12]}`;
  }
}
