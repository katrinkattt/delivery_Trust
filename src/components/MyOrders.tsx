import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Body from './common/Body';
import {CheckIcon, Hourglass} from './common/Svgs';
import {useNavigation} from '@react-navigation/native';
import R from '../res';
import {ICategoryDataType} from '../api/OrdersData';

const data = [
  {id: 1, name: 'Все', active: true},
  {id: 2, name: 'Паспорт', active: false},
  {id: 3, name: 'Налоги', active: false},
  {id: 4, name: 'СНИЛС', active: false},
  {id: 5, name: 'Военный билет', active: false},
];
const OrdersData = [
  {
    id: 2394619,
    category: 'Военный билет',
    completle: false,
    active: true,
    activeMinute: 10,
    courierCoord: {latitude: 55.7422, longitude: 37.6325},
    finishCoord: {latitude: 55.7239, longitude: 37.5812},
    price: 200,
    date: '30 мая 20:11',
    typeTarif: 24,
    address: 'Москва, Ленинские горы, д. 1, стр. 52',
    addressTo: 'Москва,Красная площадь, 3, к2 ',
    orderTime: '13:52',
    recipient: 'Антонов Власий Агафонович',
    sender: 'Орехов Вадим Борисович',
  },
  {
    id: 2394619,
    category: 'Паспорт',
    completle: false,
    active: true,
    activeMinute: 10,
    courierCoord: {latitude: 55.7422, longitude: 37.6325},
    finishCoord: {latitude: 55.7239, longitude: 37.5812},
    price: 200,
    date: '30 мая 20:11',
    typeTarif: 24,
    address: 'Москва, Ленинские горы, д. 1, стр. 52',
    addressTo: 'Москва,Красная площадь, 3, к2 ',
    orderTime: '13:52',
    recipient: 'Агафонов Вадим Агафонович',
    sender: 'Антонов Власий Борисович',
  },
  {
    id: 1984912,
    category: 'Налоговые отчеты',
    completle: true,
    active: false,
    activeMinute: 15,
    courierCoord: {latitude: 55.7422, longitude: 37.6325},
    finishCoord: {latitude: 55.7539, longitude: 37.6212},
    price: 190,
    date: '01 августа 10:01',
    typeTarif: 1,
    address: 'Москва,Красная площадь, 3, к2 ',
    addressTo: 'Москва, Ленинские горы, д. 1, стр. 52',
    orderTime: '12:45',
    recipient: 'Антонов Вадим Агафонович',
    sender: 'Орехов Агафон Борисович',
  },
  {
    id: 2394619,
    category: 'Военный билет',
    completle: true,
    active: false,
    activeMinute: 10,
    courierCoord: {latitude: 55.7422, longitude: 37.6325},
    finishCoord: {latitude: 55.7239, longitude: 37.5812},
    price: 200,
    date: '30 мая 20:11',
    typeTarif: 24,
    address: 'Москва, Ленинские горы, д. 1, стр. 52',
    addressTo: 'Москва, Ленинградский проспект, 39',
    orderTime: '13:52',
    recipient: 'Антонов Вадим Агафонович',
    sender: 'Орехов Власий Борисович',
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
    addressTo: 'Москва, Ленинские горы, д. 1, стр. 52',
    orderTime: '16:12',
    recipient: 'Антонов Вадим Агафонович',
    sender: 'Орехов Власий Борисович',
  },
];

export default function MyOrders() {
  const navigation = useNavigation();
  const dataOrders = OrdersData; //from back

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{paddingRight: 35, paddingHorizontal: 16}}>
        {data?.map(item => (
          <TouchableOpacity
            key={item?.id}
            activeOpacity={0.7}
            style={[
              styles.box,
              {backgroundColor: item?.active ? '#F1F0FE' : '#F7F9FD'},
            ]}>
            <Body
              medium
              color={item?.active ? '#937AEA' : '#A1ADBF'}
              style={styles.text}>
              {item.name}
            </Body>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 15, marginTop: 23}}>
        {dataOrders.map((order: ICategoryDataType) => (
          <TouchableOpacity
            onPress={() =>
              //@ts-ignore
              navigation.navigate(R.routes.ORDER_DETAIL_MAP, {item: order})
            }
            activeOpacity={0.7}
            style={order?.active ? styles.cardOneBox : styles.cardTwoBox}>
            <View>
              <Body color="#243757" style={[styles.cardTitle, {marginTop: 12}]}>
                {order?.category}
              </Body>

              <Body color="#243757" style={styles.cardOneDescription}>
                {order?.address}
              </Body>
            </View>
            {order?.active ? (
              <View style={styles.cardRightBox}>
                <Hourglass width={15} height={15} />

                <Body color="#243757" style={styles.clock}>
                  {order?.orderTime}
                </Body>
              </View>
            ) : (
              <View style={{marginRight: 18, marginTop: 15}}>
                <Body color="#243757" style={styles.price}>
                  1 341 ₽
                </Body>

                <Body color="#243757" style={styles.deliveredText}>
                  Доставлен
                </Body>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  box: {
    height: 28,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 24,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    letterSpacing: -0.32,
  },
  cardOneBox: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#dce8ff',
    paddingLeft: 22,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },
  cardOneDescription: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
  },
  clock: {
    marginTop: 7,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20.83,
  },
  cardRightBox: {
    width: 84,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CEDEFF',
    borderRadius: 5,
  },
  cardTwoBox: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    paddingLeft: 22,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  price: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20.83,
    textAlign: 'right',
  },
  deliveredText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
  },
});
