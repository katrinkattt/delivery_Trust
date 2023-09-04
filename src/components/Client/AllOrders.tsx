import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import Body from '../common/Body';
import OrdersITEM from './OrdersITEM';
import {useAppDispatch} from '../../hooks/redux';
import {loadOrder} from '../../state/orders/action';

const data = [
  {id: 1, name: 'Все', active: true},
  {id: 2, name: 'Паспорт', active: false},
  {id: 3, name: 'Налоги', active: false},
  {id: 4, name: 'СНИЛС', active: false},
  {id: 5, name: 'Военный билет', active: false},
];

export default function AllOrders() {
  const {orders} = useSelector(state => state.order);
  const {id} = useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const reload = () => {
    dispatch(
      loadOrder({
        link: `/client/${id}`,
        onSuccess: () => {
          setRefreshing(false);
        },
        onError: async e => {
          setRefreshing(false);
          console.log('ERR loadOrders =>>', e);
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {orders[0] ? (
          <FlatList
            data={orders}
            style={{marginBottom: 35}}
            keyExtractor={item => item.id.toString()}
            //@ts-ignore
            renderItem={({item}) => <OrdersITEM item={item} />}
            inverted
          />
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
  titlebox: {
    alignItems: 'center',
    marginTop: 32,
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
});
