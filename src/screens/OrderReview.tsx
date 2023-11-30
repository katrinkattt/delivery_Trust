import React, { useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters/extend';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import notifee from '@notifee/react-native';
import TextAreaInput from '../components/common/TextAreaInput';
import Header from '../components/Header';
import Body from '../components/common/Body';
import Button from '../components/common/Button';
import { colors } from '../theme/themes';
import R from '../res';
import { useDispatch } from 'react-redux';
import { setDonut } from '../state/orders/slice';
import { editOrder, orderTip, orderRate } from '../state/orders/action';
import { useAppDispatch } from '../hooks/redux';

export default function OrderReview({ route }) {
  const navigation = useNavigation();
  const { item } = route.params
  const [isOpenDonut, setIsOpenDonut] = useState(false);
  const [don, setDon] = useState(0);
  const disp = useDispatch();
  const dispatch = useAppDispatch()
  const [isBackRating, setIsBackRating] = useState(true)
  const [errDonut, setErrDonut] = useState(false)

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'defaul',
      name: 'Default Channel',
    });
    const strBody = `Заказ ${item?.category} закрыт`;
    // Display a notification
    await notifee.displayNotification({
      id: 'default',
      title: 'Заказ закрыт',
      body: strBody,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  const completeOrder = (id: number) => {
    dispatch(
      editOrder({
        id: id || 0,
        data: {
          order_id: id,
          complete: true,
          active: false,
        },
        onSuccess: () => {
          console.log('good edit order');
          setTimeout(() => {
            onDisplayNotification();
          }, 5000);
        },
        onError: async e => {
          console.log('ERR edit order', e);
        },
      }),
    )
  }

  const feedbakSend = () => {
    console.log('ITEM:::', item);
    if (star == 0) {
      setIsBackRating(false)
    }
    else {
      if (don >= 10) {


        disp(setDonut({ donut: don }));
        dispatch(
          orderTip({
            data: { tip: don, order_id: item.id },
            onSuccess: () => {
              //@ts-ignore
              navigation.navigate(R.routes.CLIENT_ORDER_PAY);
              // completeOrder(item?.id)
            },
            onError: async e => {
              console.log('ERR orderTip =>>', e);
            },
          }),
        )
      }
      else if (don == 0) {
        dispatch(
          orderRate({
            data: { rate: star, order_id: item.id },
            onSuccess: () => {
              // completeOrder(item?.id)
              navigation.goBack();
            },
            onError: async e => {
              console.log('ERR order rate =>>', e);
            },
          }),
        )

      }
      else {
        setErrDonut(true)
      }
    }
  }
  const [star, setStar] = useState(0);
  const starArr = [1, 2, 3, 4, 5];

  return (
    <View style={{ flex: 1 }}>
      <Header title="" />
      <View
        style={{
          marginHorizontal: 15,
          alignItems: 'center',
          paddingTop: isOpenDonut ? '0%' : '30%',
        }}>
        <Body
          bold
          semiBold
          size={20}
          style={{ marginTop: 20, fontWeight: 'bold' }}>
          СПАСИБО ЗА ЗАКАЗ
        </Body>

        <Body color={isBackRating ? colors.black : colors.red} bold semiBold size={16} center style={[styles.subscribe, { padding: 5 }]}>
          Оцените заказ
        </Body>
        <View style={{ flexDirection: 'row' }}>
          {starArr.map(s => (
            <TouchableOpacity onPress={() => { setStar(s); setIsBackRating(true) }}>
              <Body color={star >= s ? colors.green : colors.gray} size={30}>
                ★
              </Body>
            </TouchableOpacity>
          ))}
        </View>

        <Body bold semiBold size={16} center style={styles.subscribe}>
          Вы можете оставить курьеру чаевые за хорошую работу ◕‿◕
        </Body>

        <Button text="ОСТАВИТЬ ЧАЕВЫЕ" onPress={() => setIsOpenDonut(!isOpenDonut)} buttonType={2} />
        {isOpenDonut && (
          <>
            <TextAreaInput
              label="Чаевые"
              placeholder="Введите сумму"
              position="center"
              value={don}
              setValue={setDon}
              custom={true}
              keyboardType="numeric"
            />
            {errDonut && (<Body bold semiBold size={14} center>
              чаевые от 10 рублей
            </Body>)}
          </>

        )}
      </View>
      <TouchableOpacity
        style={styles.bottom}
        onPress={feedbakSend}>
        <Body semiBold size={16} center>
          {
            'ГОТОВО'
          }
        </Body>
      </TouchableOpacity>
    </View>
  );
}

const styles = ScaledSheet.create({
  subscribe: {
    padding: 25,
    textAlign: 'center',
    color: colors.darkBlue,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 15,
  },
});
