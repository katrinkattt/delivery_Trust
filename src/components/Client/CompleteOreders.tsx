import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Body from '../common/Body';
import OrdersITEM from './OrdersITEM';
import {IOrder} from '../../state/orders/types';
const data = [
  {id: 1, name: 'Все', active: true},
  {id: 2, name: 'Паспорт', active: false},
  {id: 3, name: 'Договор', active: false},
  {id: 8, name: 'Налоги', active: false},
  {id: 4, name: 'СНИЛС', active: false},
  {id: 5, name: 'Военный билет', active: false},
  {id: 6, name: 'Коробка', active: false},
  {id: 7, name: 'Пакет', active: false},
];

export default function CompleteOrders() {
  const {orders} = useSelector(state => state.order);
  const completeOrder = orders.filter((obj: IOrder) => !obj.active);
  const [filter, setFilter] = useState('Все');
  const FilteredOrder =
    filter != 'Все' &&
    completeOrder.filter((obj: IOrder) => obj.category == filter);

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{paddingRight: 35, paddingHorizontal: 16}}>
        {data?.map(item => (
          <TouchableOpacity
            key={item?.id}
            onPress={() => setFilter(item.name)}
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

      <FlatList
        data={FilteredOrder}
        keyExtractor={item => item.id.toString()}
        style={{marginBottom: 35}}
        inverted
        //@ts-ignore
        renderItem={({item}) => <OrdersITEM item={item} />}
      />
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
});
