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
  address: string;
  orderTime: string;
  addressTo: string;
  recipient: string;
  sender: string;
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
    address: 'Москва,Красная площадь, 3, к2 ',
    addressTo: 'Москва,Красная площадь, 3, к2 ',
    orderTime: '12:45',
    recipient: 'Антонов Власий Борисович',
    sender: 'Орехов Вадим Агафонович',
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
    address: 'Москва, Ленинские горы, д. 1, стр. 52',
    addressTo: 'Москва,Красная площадь, 3, к2 ',
    orderTime: '13:52',
    recipient: 'Орехов Власий Борисович',
    sender: 'Антонов Вадим Агафонович',
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
    address: 'Москва, Ленинградский проспект, 39',
    addressTo: 'Москва,Красная площадь, 3, к2 ',
    orderTime: '16:12',
    recipient: 'Антонов Вадим Агафонович',
    sender: 'Орехов Власий Борисович',
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
    address: 'Москва г, Чапаевский пер, дом 14,',
    addressTo: 'Москва,Красная площадь, 3, к2 ',
    orderTime: '15:34',
    recipient: 'Антонов Вадим Агафонович',
    sender: 'Орехов Власий Борисович',
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
    address: 'Ленинградский проспект 39, стр. 79',
    addressTo: 'Москва,Красная площадь, 3, к2 ',
    orderTime: '13:23',
    recipient: 'Антонов Вадим Агафонович',
    sender: 'Орехов Власий Борисович',
  },
];

export default OrdersData;
