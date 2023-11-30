import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import Body from '../../components/common/Body';
import {Ellipses} from '../../components/common/Svgs';

import {Space} from '../../components/common/Space';
import Button from '../../components/common/Button';
import {useNavigation} from '@react-navigation/native';
import R from '../../res';
import {useAppDispatch} from '../../hooks/redux';
import {createOrder, paymentFunc, loadOrder} from '../../state/orders/action';
import {setNewOrderPaymentType} from '../../state/orders/slice';
import {useDispatch, useSelector} from 'react-redux';

export default function PayClient() {
  const [currMethod, setCurrMethod] = useState(1);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const disp = useDispatch();
  const order = useSelector(state => state.order);
  const donut = order.donut;
  const [err, setErr] = useState('');
  const user = useSelector(state => state.user);
  const tariff = order.currTariff;
  const curCard = user?.curCard;
  const cardNum = user?.cards[curCard]
    ? user?.cards[curCard].number.slice(-4)
    : ' добавить';

  const [data, setData] = useState([
    {id: 1, title: 'По QR-коду', select: false},
    {
      id: 2,
      title: '**** **** **** ' + cardNum,
      select: true,
    },
    {id: 3, title: 'Криптовалюты', select: true},
  ]);

  const pressButton = (id: number) => {
    const newData = data.map(i => {
      if (i.id === id) {
        return {...i, select: (i.select = false)};
      } else {
        return {...i, select: (i.select = true)};
      }
    });
    setData(newData);
    setCurrMethod(id);
    disp(setNewOrderPaymentType({paymentType: id}));
    // setCheck(!check)
  };
  // const reloadOrders = () => {
  //   dispatch(
  //     loadOrder({
  //       link: `/client/${user.id}`,
  //       onSuccess: () => {
  //         console.log('good loadOrders');
  //       },
  //       onError: async e => {
  //         console.log('ERR loadOrders =>>', e);
  //       },
  //     }),
  //   );
  // };
  const crOrder = () => {
    const price = donut > 0 ? donut : order?.newOrder?.price;
    // // @ts-ignore
    // navigation.navigate(R.routes.PAYMENT_ORDER, {
    //   id_method: currMethod,
    //   price: price,
    // });
    if (donut > 0) {
      console.log('===>paymentFunc');
      // create tea
      // @ts-ignore
      navigation.navigate(R.routes.PAYMENT_ORDER, {
        id_method: currMethod,
        price: price,
        orderId: 12344,
      });
    }
    if (donut == 0) {
      console.log('order.newOrder', order.newOrder);

      dispatch(
        createOrder({
          data: order.newOrder,
          onSuccess: response => {
            console.log('createOrder response', response);
            // @ts-ignore
            navigation.navigate(R.routes.PAYMENT_ORDER, {
              id_method: currMethod,
              price: price,
              orderId: response?.orderId,
            });
            // @ts-ignore
            // navigation.navigate('TabScreen');
          },
          onError: async e => {
            console.log('Ошибка сервера', e);
            setErr('Ошибка сервера, попробуйте позже');
          },
        }),
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Способ оплаты" />

      <ScrollView style={{paddingBottom: 60}}>
        <View style={{marginHorizontal: 15}}>
          <View style={{flexDirection: 'column'}}>
            {data.map(item => (
              <TouchableOpacity
                key={item.id}
                style={
                  item.select ? styles.senderSecondItem : styles.senderItem
                }
                onPress={() => pressButton(item.id)}>
                <View style={{marginTop: 3}}>
                  <Ellipses
                    color={item.select ? 'rgba(160, 172, 190, 1)' : 'white'}
                  />
                </View>

                <Space width={18} />
                <View>
                  <Body
                    color={item.select ? 'black' : 'white'}
                    style={{marginRight: 10}}>
                    {item.title}
                  </Body>
                </View>

                {item.title === '**** **** **** 5670' ? (
                  <Image
                    source={require('../../assets/visa.png')}
                    style={styles.image}
                  />
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
          <Body size={12} color="#a22">
            {err}
          </Body>
          <Space height={20} />

          <Button
            text="ОПЛАТИТЬ"
            onPress={
              () => crOrder()
              //@ts-ignore
              // navigation.navigate(R.routes.PAYMENT_ORDER, {
              //   id_method: currMethod,
              //   price: 23,
              // })
            }
            buttonType={2}
          />

          <Space height={10} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  recipientFormContainer: {
    paddingHorizontal: 17,
    marginTop: 30,
  },
  senderItem: {
    padding: 20,
    backgroundColor: 'rgba(147, 122, 234, 1)',
    borderRadius: 10,
    marginTop: 12,
    flexDirection: 'row',
    marginRight: 10,
    // justifyContent: 'center',
  },
  senderSecondItem: {
    padding: 20,
    backgroundColor: 'rgba(247, 249, 253, 1)',
    borderRadius: 10,
    marginTop: 12,
    flexDirection: 'row',
    marginRight: 10,
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(232, 232, 240, 1)',
  },
  row: {
    flexDirection: 'row',
  },
  rowInput: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    paddingBottom: 30,
  },
  image: {
    width: 40,
    height: 23,
    position: 'absolute',
    right: 30,
    top: 12,
  },
});
