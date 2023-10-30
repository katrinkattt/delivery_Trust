import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header';
import Body from '../../components/common/Body';
import {
  Ellipses,
  FlagIcon,
  OrderIconActive,
} from '../../components/common/Svgs';

import {Space} from '../../components/common/Space';
import FastImage from 'react-native-fast-image';
import Button from '../../components/common/Button';
import {useNavigation} from '@react-navigation/native';
import R from '../../res';
import {useDispatch, useSelector} from 'react-redux';
import {setNewOrderTariff} from '../../state/orders/slice';
import {colors} from '../../theme/themes';

export default function Rate() {
  const [isOrder] = useState(false);
  const order = useSelector(state => state.order);

  const newOrder = order?.newOrder;
  const disp = useDispatch();
  const [curTarif, setCurTarif] = useState(0);
  const tariff = order.currTariff;

  // useEffect(() => {
  //   disp(
  //     setNewOrderTariff({
  //       typeTarif: order?.tariffs[0].tariffid,
  //       price: order?.tariffs[0].price,
  //     }),
  //   );
  // }, []);

  const pressButton = (id: number, tariff: number, price: number) => {
    setCurTarif(id);
    disp(setNewOrderTariff({typeTarif: tariff, price: price}));
  };

  const navigation = useNavigation();

  const goPay = () => {
    //@ts-ignore
    navigation.navigate(R.routes.CLIENT_ORDER_PAY);
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Тариф" />

      <ScrollView style={{paddingBottom: 60}}>
        <Body semiBold size={17} style={{paddingLeft: 17}}>
          Тип отправления
        </Body>

        <View style={{marginHorizontal: 15}}>
          <View style={{flexDirection: 'column'}}>
            {/* {order?.tariffs.map((item, num: number) => (
              <TouchableOpacity
                key={num}
                style={
                  curTarif == num ? styles.senderItem : styles.senderSecondItem
                }
                onPress={() => pressButton(num, item.tariffid, item.price)}>
                <View style={{marginTop: 3}}>
                  <Ellipses
                    color={curTarif == num ? 'white' : 'rgba(160, 172, 190, 1)'}
                  />
                </View>

                <Space width={18} />
                <View>
                  <Body
                    color={curTarif == num ? 'white' : 'black'}
                    style={{marginRight: 10}}>
                    {item.title}
                  </Body>
                  <Space height={4} />
                  <Body
                    color={curTarif == num ? 'white' : 'black'}
                    size={13}
                    style={{marginRight: 10}}>
                    {item.description}
                  </Body>
                </View>

                <View style={{position: 'absolute', right: 23, top: 25}}>
                  <Body size={18} color={curTarif == num ? 'white' : 'black'}>
                    {item.price} ₽
                  </Body>
                </View>
              </TouchableOpacity>
            ))} */}
            <View key={123} style={styles.senderItem}>
              <View style={{marginTop: 12}}>
                <Ellipses color={'white'} />
              </View>

              <Space width={18} />
              <View>
                <Body color={'white'} style={{marginRight: 10}}>
                  {tariff?.title}
                </Body>
                <Space height={4} />
                <Body color={'white'} size={13} style={{marginRight: 10}}>
                  {tariff?.description}
                </Body>
              </View>

              <View style={{position: 'absolute', right: 23, top: 25}}>
                <Body size={18} color={'white'}>
                  {tariff?.price} ₽
                </Body>
              </View>
            </View>
          </View>

          <View style={styles.orderDetailBox}>
            {!isOrder && (
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <OrderIconActive width={25} height={25} />

                  <Body
                    color="#243757"
                    style={[styles.orderDetailText, {marginLeft: 14}]}>
                    Забрать посылку
                  </Body>
                </View>

                <Body
                  color="rgba(0, 0, 0, 0.36)"
                  style={styles.orderDetailDescription}>
                  {newOrder?.sender}
                </Body>

                <Body
                  color="#243757"
                  style={[styles.orderDetailText, {marginTop: 3}]}>
                  {newOrder?.address}
                </Body>
              </View>
            )}

            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <View style={!isOrder ? {marginTop: 30} : {marginTop: 9}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <OrderIconActive width={25} height={25} />

                  <Body
                    color="#243757"
                    style={[styles.orderDetailText, {marginLeft: 14}]}>
                    Доставить посылку
                  </Body>
                </View>

                <Body
                  color="rgba(0, 0, 0, 0.36)"
                  style={styles.orderDetailDescription}>
                  {newOrder?.recipient}
                </Body>

                <Body
                  color="#243757"
                  style={[styles.orderDetailText, {marginTop: 3}]}>
                  {newOrder?.addressTo}
                </Body>
              </View>

              {isOrder && (
                <View style={{marginBottom: 30}}>
                  <FlagIcon width={20} height={20} />
                </View>
              )}
            </View>
            {newOrder?.comment && (
              <>
                <View
                  style={{
                    height: 3,
                    width: '93%',
                    backgroundColor: colors.lavender,
                    marginTop: 18,
                  }}
                />
                <Body
                  color="#243757"
                  style={[styles.orderDetailText, {marginTop: 8}]}>
                  Комментарий:
                </Body>

                <Body
                  color="#243757"
                  style={[styles.orderDetailText, {marginTop: 3}]}>
                  {newOrder?.comment}
                </Body>
              </>
            )}
            <View style={{marginTop: 40, flexDirection: 'row'}}>
              <Body
                color="rgba(0, 0, 0, 0.36)"
                style={[styles.orderDetailText, {marginTop: 3, width: '60%'}]}>
                Тип посылки
              </Body>

              <Body
                color="#243757"
                style={[
                  styles.orderDetailText,
                  {marginTop: 3, width: '37%', textAlign: 'right'},
                ]}>
                {newOrder?.category}
              </Body>
            </View>

            <View style={{marginTop: 8, flexDirection: 'row'}}>
              <Body
                color="rgba(0, 0, 0, 0.36)"
                style={[styles.orderDetailText, {marginTop: 3, width: '25%'}]}>
                Тариф
              </Body>

              <Body
                color="#243757"
                style={[
                  styles.orderDetailText,
                  {marginTop: 3, textAlign: 'right', width: '72%'},
                ]}>
                {tariff?.title}
              </Body>
            </View>

            <View style={{marginTop: 8, flexDirection: 'row'}}>
              <Body
                color="rgba(0, 0, 0, 0.36)"
                style={[styles.orderDetailText, {marginTop: 3, width: '60%'}]}>
                Срок доставки
              </Body>

              <Body
                color="#243757"
                style={[
                  styles.orderDetailText,
                  {
                    marginTop: 3,
                    width: '37%',
                    textAlign: 'right',
                  },
                ]}>
                {tariff?.txtoutput}
              </Body>
            </View>

            <FastImage
              source={require('../../assets/arr.png')}
              style={styles.arr}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={{marginHorizontal: 15, paddingTop: 18}}>
          <Body center semiBold size={36}>
            {tariff?.price} ₽
          </Body>

          <Body center size={11} light>
            Стоимость с учетом НДС
          </Body>

          <Space height={20} />

          <Button text="Оформить заказ" buttonType={2} onPress={goPay} />

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

  orderDetailText: {
    fontSize: 16,
    fontWeight: '600',
    width: 240,
    // width: '50%',
  },
  orderDetailDescription: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 7,
  },
  buttonShadow: {
    shadowColor: '#243757',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 19,
    elevation: 5,
  },
  button: {
    width: '100%',
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#243757',
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  arr: {
    width: 29,
    height: 136,
    position: 'absolute',
    right: 20,
    zIndex: 1,
    top: 30,
  },
  orderDetailBox: {
    width: '100%',
    backgroundColor: '#F7F9FD',
    marginTop: 16,
    paddingTop: 20,
    paddingLeft: 33,
    borderRadius: 10,
    paddingBottom: 24,
  },
});
