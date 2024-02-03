export interface IClient {
  name: string;
  phone: string;
  carNumber?: string | null;
  carType?: "passengerCar" | "suv";
}
