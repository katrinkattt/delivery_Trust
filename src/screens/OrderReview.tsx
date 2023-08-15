import React, {useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {TouchableOpacity, View, Text} from 'react-native';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import AuthInput from '../components/common/AuthInput';
import Header from '../components/Header';
import Body from '../components/common/Body';
import Button from '../components/common/Button';
import {colors} from '../theme/themes';
import R from '../res';

export default function OrderReview() {
  const navigation = useNavigation();
  const [isOpenDonut, setIsOpenDonut] = useState(false);
  const [initialValue, setInitialValue] = useState({donut: 0});

  const donutSend = () => {
    if (isOpenDonut) {
      navigation.goBack();
      //@ts-ignore
      navigation.navigate(R.routes.CLIENT_HOME);
      if (initialValue.donut > 0) {
        //когда будет храниться в стейте
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
          <Formik initialValues={initialValue} onSubmit={() => {}}>
            <AuthInput
              label="Сумма чаевых, ₽"
              placeholder="Введите сумму чаевых"
              position="top"
              name="donut"
              keyboardType="number-pad"
            />
          </Formik>
        )}
      </View>
      <TouchableOpacity
        style={styles.bottom}
        onPress={() => {
          isOpenDonut ? setIsOpenDonut(false) : navigation.goBack(); //@ts-ignore
          navigation.navigate(R.routes.CLIENT_HOME);
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
