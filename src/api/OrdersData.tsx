export interface ICategoryDataType {
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
}

const OrdersData = [
  {
    id: 1984912,
    category: 'Налоговые отчеты',
    completle: false,
    active: true,
    activeMinute: 15,
    courierCoord: {latitude: 55.7422, longitude: 37.6325},
    finishCoord: {latitude: 55.7539, longitude: 37.6212},
    price: 190,
    date: '01 августа 10:01',
    typeTarif: 1,
  },
  {
    id: 2394619,
    category: 'Военный билет',
    completle: false,
    active: false,
    activeMinute: 5 - 10,
    courierCoord: {latitude: 55.7422, longitude: 37.6325},
    finishCoord: {latitude: 55.7239, longitude: 37.5812},
    price: 200,
    date: '30 мая 20:11',
    typeTarif: 24,
  },
  {
    id: 3321073,
    category: 'СНИЛС',
    completle: true,
    active: false,
    activeMinute: 0,
    courierCoord: {latitude: 55.6639, longitude: 37.44212},
    finishCoord: {latitude: 55.3539, longitude: 37.1212},
    price: 290,
    date: '3 мая 10:31',
    typeTarif: 6,
  },
  {
    id: 4329402,
    category: 'Налоговые отчеты',
    completle: false,
    active: true,
    activeMinute: 0,
    courierCoord: {latitude: 55.7239, longitude: 37.5812},
    finishCoord: {latitude: 55.6639, longitude: 37.44212},
    price: 290,
    date: '30 апреля 10:31',
    typeTarif: 24,
  },
  {
    id: 5343924,
    category: 'Налоговые отчеты',
    completle: true,
    active: false,
    activeMinute: 0,
    courierCoord: {latitude: 55.7239, longitude: 37.5812},
    finishCoord: {latitude: 55.23539, longitude: 37.32212},
    price: 390,
    date: '3 апреля 10:31',
    typeTarif: 6,
  },
];

export default OrdersData;
