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
import {createOrder} from '../../state/orders/action';
import {setNewOrderPaymentType} from '../../state/orders/slice';
import {useDispatch, useSelector} from 'react-redux';

export default function PayClient() {
  const [data, setData] = useState([
    {id: 1, title: 'По QR-коду', select: false},
    {id: 2, title: '**** **** **** 5670', select: true},
    {id: 3, title: 'Криптовалюты', select: true},
  ]);
  const [currMethod, setCurrMethod] = useState(1);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const disp = useDispatch();
  const order = useSelector(state => state.order);
  const [err, setErr] = useState('');

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
  const crOrder = () => {
    console.log('order.newOrder', order.newOrder);
    const price = order?.newOrder?.price;
    // @ts-ignore
    navigation.navigate(R.routes.PAYMENT_ORDER, {
      id_method: currMethod,
      price: price,
    });
    dispatch(
      createOrder({
        data: order.newOrder,
        onSuccess: () => {
          // @ts-ignore
          // navigation.navigate('TabScreen');
        },
        onError: async e => {
          console.log('Ошибка сервера', e);

          setErr('Ошибка сервера, попробуйте позже');
        },
      }),
    );
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
