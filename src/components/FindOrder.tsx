import React, {useCallback, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  View,
  Text,
} from 'react-native';
import Body from './common/Body';
import {CheckIcon, FilterIcon, Hourglass} from './common/Svgs';
import Button from './common/Button';
import {freeOrders, editOrder} from '../state/orders/action';
import {ModalCustom} from './ModalCustom';
import {colors} from '../theme/themes';
import {useAppDispatch} from '../hooks/redux';
import {useSelector} from 'react-redux';
import {IOrder} from '../state/orders/types';

const data = [
  {id: 1, name: 'Все', active: true},
  {id: 2, name: 'Договор', active: false},
  {id: 3, name: 'Паспорт', active: false},
  {id: 6, name: 'Налоги', active: false},
  {id: 4, name: 'СНИЛС', active: false},
  {id: 5, name: 'Военный билет', active: false},
  {id: 6, name: 'Коробка', active: false},
  {id: 7, name: 'Пакет', active: false},
];

export default function FindOrder() {
  const dispatch = useAppDispatch();
  const [pressFilter, setPressFilter] = useState(false);
  const [readOrder, setReadOrder] = useState(0);
  // const {findOrders} = useSelector(state => state.order);
  const [findOrders, setFindOrders] = useState([]);
  const user = useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);
  console.log('findOrders in PAGE', findOrders);
  const [filter, setFilter] = useState('Все');
  const FilteredOrder =
    filter == 'Все'
      ? findOrders
      : findOrders.filter((obj: IOrder) => obj.category == filter);

  const reload = () => {
    dispatch(
      freeOrders({
        onSuccess: r => {
          console.log('resp', r);
          setFindOrders(r);
          setRefreshing(false);
        },
        onError: async e => {
          setRefreshing(false);
          console.log('ERR freeOrders =>>', e);
        },
      }),
    );
  };
  const onRefresh = useCallback(() => {
    console.log('refresh');
    setRefreshing(true);
    reload();
  }, []);

  const takeOrder = (id: number) => {
    dispatch(
      editOrder({
        id: id,
        data: {
          order_id: id,
          courier_id: user.id,
          courierId: user.id,
        },
        onSuccess: () => {
          console.log('good takeOrder');
          reload();
        },
        onError: async e => {
          console.log('ERR takeOrder =>>', e);
        },
      }),
    );
  };

  //---------------------------------------------//
  const showSortingModal = () => {
    setPressFilter(true);
  };
  const filterSort = () => {
    reload();
    console.log('filter choiceed');
  };

  return (
    <View style={styles.container}>
      <ModalCustom modalVisible={pressFilter} text="Отсортировать по">
        <View style={{width: 250}}>
          <TouchableOpacity
            onPress={() => setPressFilter(!pressFilter)}
            style={{alignItems: 'flex-end'}}>
            <Text
              style={{
                marginTop: -20,
                color: colors.lavender,
                fontSize: 26,
              }}>
              ×
            </Text>
          </TouchableOpacity>
          <Body color="#243757" bold style={{marginBottom: 20}}>
            Стоимости
          </Body>
          <Body color="#243757" bold style={{marginBottom: 20}}>
            Времени
          </Body>
          <Body color="#243757" bold style={{marginBottom: 20}}>
            Типу
          </Body>
        </View>
      </ModalCustom>
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingBottom: 150, minHeight: '100%'}}
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 15, marginTop: 23}}>
        {findOrders[0] ? (
          FilteredOrder.map((order: IOrder) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  readOrder == order.id
                    ? setReadOrder(0)
                    : setReadOrder(order.id || 0);
                }}
                activeOpacity={0.7}
                style={styles.cardOneBox}>
                <View>
                  <Body
                    color="#243757"
                    style={[styles.cardTitle, {marginTop: 12}]}>
                    {order?.category}
                  </Body>
                  <Body color="#243757" style={styles.cardOneDescription}>
                    Время выполнения:
                    {order.activeMinute > 90
                      ? order.activeMinute / 60 + ' час'
                      : order.activeMinute + ' минут'}
                  </Body>
                </View>

                <View style={styles.cardRightBox}>
                  <Hourglass width={15} height={15} />

                  <Body color="#243757" style={styles.clock}>
                    {order.price} ₽
                  </Body>
                </View>
              </TouchableOpacity>
              {readOrder == order.id && (
                <View style={styles.cardBoxDescrip}>
                  <View>
                    <Body color="#243757" size={14}>
                      ОТ: {order.address}
                    </Body>
                    <Body color="#243757" size={14}>
                      ДО: {order.addressTo}
                    </Body>
                    <Body color="#243757" size={14} style={{width: '75%'}}>
                      Комментарий: {order.comment}
                    </Body>
                  </View>
                  <TouchableOpacity
                    onPress={() => takeOrder(order.id)}
                    style={styles.orderButton}>
                    <Body color="#fff" size={14}>
                      Взять заказ
                    </Body>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.titlebox}>
            <Body bold semiBold color="#A1ADBF">
              Свободные заказы не найдены
            </Body>
          </View>
        )}
      </ScrollView>
      {/* <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          position: 'absolute',
          bottom: 24,
        }}>
        <View style={{width: '79.3%'}}>
          <Button onPress={filterSort} buttonType={1} text="СОРТИРОВКА" />
        </View>
        <TouchableOpacity
          onPress={() => showSortingModal()}
          activeOpacity={0.7}
          style={styles.filterButton}>
          <FilterIcon width={21} height={25} />
        </TouchableOpacity>
      </View> */}
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
    backgroundColor: '#F1F0FE',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 24,
    marginRight: 8,
  },
  orderButton: {
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AD86F0',
    borderRadius: 10,
    right: 0,
    marginLeft: '68%',
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
  cardBoxDescrip: {
    borderRadius: 5,
    backgroundColor: '#dce8ff',
    paddingLeft: 22,
    marginTop: -10,
    width: '100%',
    height: 120,
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
  filterButton: {
    width: '19.3%',
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#243757',
    borderRadius: 10,
    marginLeft: 5,
  },
});
