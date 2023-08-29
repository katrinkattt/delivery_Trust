export type OrdersState = {
  orders: IOrder[];
  findOrders: IOrder[];
  newOrder: IOrder;
  loading: boolean;
  donut: number;
  currPaymentId: number;
  categoryDoc: Category[];
  categoryPack: Category[];
  tariffs: Tariff[];
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
  comment?: string;
  paymentType?: number;
  payment?: number;
  sender_id?: number;
  payment_id?: number;
  order_id?: number;
};
export type TariffOrder = {
  tariffs: Tariff[];
};
export type Tariff = {
  tarifId: number;
  title: string;
  text: string;
  txtOutput: string;
  price: number;
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
