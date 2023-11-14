import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Body from './common/Body';
import {CheckIcon, Hourglass} from './common/Svgs';
import {useNavigation} from '@react-navigation/native';
import R from '../res';
import {IOrder} from '../state/orders/types';
import {useAppDispatch} from '../hooks/redux';
import {loadOrder} from '../state/orders/action';
const data = [
  {id: 1, name: 'Все', active: true},
  {id: 2, name: 'Паспорт', active: false},
  {id: 3, name: 'Налоги', active: false},
  {id: 4, name: 'СНИЛС', active: false},
  {id: 5, name: 'Военный билет', active: false},
  {id: 6, name: 'Коробка', active: false},
  {id: 7, name: 'Пакет', active: false},
];

export default function MyOrders() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {orders} = useSelector(state => state.order);
  const user = useSelector(state => state.user);
  const [filter, setFilter] = useState('Все');
  const FilteredOrder =
    filter == 'Все'
      ? orders
      : orders.filter((obj: IOrder) => obj.category == filter);

  const reload = () => {
    dispatch(
      loadOrder({
        link: `/courier/${user.id}`,
        onSuccess: () => {
          setRefreshing(false);
        },
        onError: async () => {
          setRefreshing(false);
        },
      }),
    );
  };
  const onRefresh = useCallback(() => {
    console.log('refresh');
    setRefreshing(true);
    reload();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{paddingRight: 35, paddingHorizontal: 16}}>
        {data?.map(item => (
          <TouchableOpacity
            onPress={() => setFilter(item.name)}
            key={item?.id}
            activeOpacity={0.7}
            style={[
              styles.box,
              {backgroundColor: item.name == filter ? '#F1F0FE' : '#F7F9FD'},
            ]}>
            <Body
              medium
              color={item.name == filter ? '#937AEA' : '#A1ADBF'}
              style={styles.text}>
              {item.name}
            </Body>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 15, marginTop: 23}}>
        {orders[0] ? (
          FilteredOrder.map((order: IOrder) => (
            <TouchableOpacity
              onPress={() =>
                //@ts-ignore
                navigation.navigate(R.routes.ORDER_DETAIL_MAP, {item: order})
              }
              activeOpacity={0.7}
              style={order?.active ? styles.cardOneBox : styles.cardTwoBox}>
              <View style={{width: '70%'}}>
                <Body
                  color="#243757"
                  style={[styles.cardTitle, {marginTop: 12}]}>
                  {order?.category}
                </Body>

                <Body color="#243757" style={styles.cardOneDescription}>
                  {order?.address}
                </Body>
              </View>
              {order?.active ? (
                <View style={styles.cardRightBox}>
                  <Hourglass width={15} height={15} />

                  <Body color="#243757" size={14} style={styles.clock}>
                    {order.activeMinute > 90
                      ? order.activeMinute / 60 + ' час'
                      : order.activeMinute + ' мин.'}
                  </Body>
                </View>
              ) : (
                <View style={{marginRight: 18, marginTop: 15}}>
                  <Body color="#243757" style={styles.price}>
                    {order?.price} ₽
                  </Body>
                  {order?.complete ? (
                    <Body color="#243757" style={styles.deliveredText}>
                      Доставлен
                    </Body>
                  ) : (
                    <Body color="#a22" style={styles.deliveredText}>
                      Отменен
                    </Body>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.titlebox}>
            <Body bold semiBold color="#A1ADBF">
              Заказов еще нет
            </Body>
          </View>
        )}
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
  titlebox: {
    alignItems: 'center',
    marginTop: 32,
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
  },
  clock: {
    marginTop: 7,
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
