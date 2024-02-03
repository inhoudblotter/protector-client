import { ICarType } from "./ICarType";

export interface IPrice {
  [radius: number]: number;
}

export type IPrices = {
  [key in ICarType]: IPrice;
};
