export type OrdersState = {
  orders: IOrder[];
  findOrders: IOrder[];
  newOrder: IOrder;
  loading: boolean;
  donut: number;
  donutId: number | string;
  currPaymentId: number;
  categoryDoc: Category[];
  categoryPack: Category[];
  tariffs: Tariff[];
  currTariff: ITariffPriceResp;
};
export type IOrder = {
  id?: number;
  category?: string;
  active?: boolean;
  complete?: boolean;
  activeMinute?: number;
  courierCoordinates?: {latitude: number; longitude: number};
  finishCoordinates?: {latitude: number; longitude: number};
  startCoordinates?: {latitude: number; longitude: number};
  price?: number;
  date?: string;
  createdAt?: string;
  typeTarif?: number;
  tariff?: number;
  address?: string;
  orderTime?: string;
  addressTo?: string;
  recipient?: string;
  sender?: string;
  doorToDoor?: boolean;
  courierId?: number;
  comment?: string;
  paymentType?: number;
  payment?: number;
  sender_id?: number;
  payment_id?: number;
  order_id?: number;
  courier_id?: number;
  phone?: string;
};
export type IPaymentComfirm = {
  payment_id?: number;
  paymentID?: number;
};
export type TariffOrder = {
  tariffs: Tariff[];
};
export type Tariff = {
  tarifId?: number;
  title?: string;
  text?: string;
  txtOutput?: string;
  price?: number;
  tariffid?: number;
  description?: string;
  txtoutput?: string;
};
export type CategoryOrder = {
  doc: Category[];
  pack: Category[];
};
export type Category = {
  id: number;
  name: string;
};
export type Payment = {
  id?: number;
  type?: number;
  total?: number;
  status?: boolean;
  tip?: string;
  created_at?: string;
  updated_at?: string;
};
export type ITariffPrice = {
  coors_from?: {latitude: number; longitude: number};
  coors_delivery?: {latitude: number; longitude: number};
  description?: string;
  price?: number;
  tariffid?: number;
  title?: string;
  txtoutput?: string;
};
export type ITariffPriceResp = {
  description?: string;
  price?: number;
  tariffid?: number;
  title?: string;
  txtoutput?: string;
};

export type IDonut = {
  order_id?: number;
  orderId?: number;
  paymentId?: string;
  rate?: number;
  tip?: number
}
