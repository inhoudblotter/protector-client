export interface IClient {
  name: string;
  phone: string;
  carNumber: string;
  carType?: "passengerCar" | "suv";
}
