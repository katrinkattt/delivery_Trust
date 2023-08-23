export type OrderState = {
  orders: OrdersState[];
  newOrder: OrdersState;
  loading: boolean;
  categoryDoc: [];
  categoryPack: [];
  tariffs: TariffOrder[];
  senders: OrderSender[];
};
export type OrderSender = {
  full_name?: string;
  phone?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  entrance?: string;
  houseCode?: string;
  coord?: {latitude: number; longitude: number};
};
export type OrdersState = {
  id?: number;
  category?: string;
  active?: boolean;
  completle?: boolean;
  activeMinute?: number;
  startCoord?: {latitude: number; longitude: number};
  courierCoord?: {latitude: number; longitude: number} | {};
  finishCoord?: {latitude: number; longitude: number};
  price?: number;
  date?: string;
  typeTarif?: number;
  address: string;
  orderTime?: string;
  addressTo: string;
  recipient: string;
  sender: string;
  doorToDoor?: boolean;
  comment?: string;
};
export type TariffOrder = {
  tarifId: number;
  title: string;
  text: string;
  txtOutput: string;
  price: number;
};
