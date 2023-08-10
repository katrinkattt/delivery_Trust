import React, {useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {TouchableOpacity, View, Text} from 'react-native';
import {Formik} from 'formik';
import AuthInput from '../components/common/AuthInput';
import Header from '../components/Header';
import Body from '../components/common/Body';
import Button from '../components/common/Button';
import {colors} from '../theme/themes';

export default function CardEditor() {
  const [isOpenDonut, setIsOpenDonut] = useState(false);
  // const [initialValue, setInitialValue] = useState({donut: 0});
  const donutSend = () => {
    if (isOpenDonut) {
      //fd
    } else setIsOpenDonut(true);
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Банковская карта" />
      <View style={{marginHorizontal: 15}}>
        <Body
          bold
          semiBold
          size={20}
          style={{marginTop: 20, fontWeight: 'bold'}}>
          Мои карты
        </Body>

        {/* <Button text="ДОБАВИТЬ КАРТУ" onPress={donutSend} buttonType={2} /> */}
        {/* {isOpenDonut && (
          <Formik initialValues={initialValue} onSubmit={() => {}}>
            <AuthInput
              label="Сумма чаевых, ₽"
              placeholder="Введите сумму чаевых"
              position="top"
              name="donut"
              keyboardType="number-pad"
            />
          </Formik>
        )} */}
      </View>
      <TouchableOpacity
        style={styles.bottom}
        onPress={() => setIsOpenDonut(false)}>
        <Button text="ДОБАВИТЬ КАРТУ" onPress={donutSend} buttonType={2} />
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
