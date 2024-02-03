import { IPrice, IPrices } from "./IPrices";
import { IPricesRange } from "./IPricesRange";

export interface IServiceDefaultSettings {
  leadTime: number;
  maxCars: number;
  prices: IPrices;
}

export interface IServiceMinMaxSettings {
  leadTime: number;
  maxCars: number;
  prices: IPricesRange;
}

export interface IStorageSettings {
  maxWheels: number;
  prices: IPrice;
}

export interface IServicesSettings {
  complex: IServiceDefaultSettings;
  balancing: IServiceDefaultSettings;
  removalAndInstalation: IServiceDefaultSettings;
  dismantling: IServiceDefaultSettings;
  instalation: IServiceDefaultSettings;
  puncture: IServiceDefaultSettings;
  cut: IServiceDefaultSettings;
  addSpikes: IServiceMinMaxSettings;
  storage: IStorageSettings;
}
