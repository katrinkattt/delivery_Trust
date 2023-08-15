export type OrderState = {
  id?: number;
  category?: string;
  active?: boolean;
  completle?: boolean;
  activeMinute?: number;
  courierCoord: {latitude: number; longitude: number} | {};
  finishCoord: {latitude: number; longitude: number};
  price?: number;
  date: string;
  typeTarif: number;
  address: string;
  orderTime: string;
  addressTo: string;
  recipient: string;
  sender: string;
};
