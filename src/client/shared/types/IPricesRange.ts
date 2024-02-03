import { ICarType } from "./ICarType";

interface IRagne {
  min: number;
  max: number;
}

export interface IPriceRange {
  [radius: number]: IRagne;
}

export type IPricesRange = {
  [key in ICarType]: IPriceRange;
};
