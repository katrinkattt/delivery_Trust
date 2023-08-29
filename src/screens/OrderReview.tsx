import React, {useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TextAreaInput from '../components/common/TextAreaInput';
import Header from '../components/Header';
import Body from '../components/common/Body';
import Button from '../components/common/Button';
import {colors} from '../theme/themes';
import R from '../res';
import {useDispatch} from 'react-redux';
import {setDonut} from '../state/orders/slice';

export default function OrderReview() {
  const navigation = useNavigation();
  const [isOpenDonut, setIsOpenDonut] = useState(false);
  const [don, setDon] = useState(0);
  const disp = useDispatch();

  const donutSend = () => {
    if (isOpenDonut) {
      console.log('donut', don);

      if (don > 0) {
        disp(setDonut({donut: don}));
        //@ts-ignore
        navigation.navigate(R.routes.CLIENT_ORDER_PAY);
      } else {
        navigation.goBack();
        navigation.goBack();
        //@ts-ignore
        navigation.navigate(R.routes.CLIENT_HOME);
      }
    } else setIsOpenDonut(true);
  };

  return (
    <View style={{flex: 1}}>
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
          style={{marginTop: 20, fontWeight: 'bold'}}>
          СПАСИБО ЗА ЗАКАЗ
        </Body>

        <Body bold semiBold size={16} center style={styles.subscribe}>
          Вы можете оставить курьеру чаевые за хорошую работу ◕‿◕
        </Body>

        <Button text="ОСТАВИТЬ ЧАЕВЫЕ" onPress={donutSend} buttonType={2} />
        {isOpenDonut && (
          <TextAreaInput
            label="Чаевые"
            placeholder="Введите сумму"
            position="center"
            value={don}
            setValue={setDon}
            custom={true}
            keyboardType="numeric"
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.bottom}
        onPress={() => {
          isOpenDonut ? setIsOpenDonut(false) : navigation.goBack(); //@ts-ignore
          navigation.goBack();
        }}>
        <Body semiBold size={16} center>
          БЕЗ ЧАЕВЫХ
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
