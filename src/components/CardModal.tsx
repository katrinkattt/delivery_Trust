import React, {useEffect, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {TouchableOpacity, View, ImageBackground, Text} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import Header from '../components/Header';
import Body from '../components/common/Body';
import Button from '../components/common/Button';
import {Ellipses} from '../components/common/Svgs';
import {colors} from '../theme/themes';
import {ModalCustom} from '../components/ModalCustom';
import AuthInput from '../components/common/AuthInput';
import InputTextMask from '../components/common/InputTextMask';
import {Formik} from 'formik';
import {validator, required} from '../utils/validators';
import {ICardData} from '../types/data';
import {Space} from '../components/common/Space';
import {useDispatch, useSelector} from 'react-redux';
import {loadCards} from '../state/user/slice';
// import {ICard} from '../state/user/types';
import {FormButton} from '../components/common/FormButton/FormButton';

export const CardModal = ({
  addModalVisible,
  closeFunc,
}: {
  addModalVisible: boolean;
  closeFunc: Function;
}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cards = user.cards;

  // const [addModalVisible, setAddModalVisible] = useState(false);s
  const [loading, setLoading] = useState(false);
  const initialValues: ICardData = {
    name: '',
    number: '',
    dateEnd: '',
    cvv: '',
    recToken: 'qwert',
  };
  const addCard = (data: ICardData) => {
    setLoading(true);
    const sysNum = data.number.slice(0, 1);
    console.log('sysNum', sysNum);
    const system =
      sysNum == '4'
        ? 'Visa'
        : sysNum == '5'
        ? 'Master Card'
        : sysNum == '2'
        ? 'MIR'
        : 'Card';
    const newCard = {...data, system: system};
    if (cards?.length > 0 || cards !== null) {
      dispatch(loadCards({cards: [newCard, ...cards]}));
    } else {
      dispatch(loadCards({cards: [newCard]}));
    }
    closeFunc();
    setLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <ModalCustom modalVisible={addModalVisible}>
        <View style={{width: 290}}>
          <TouchableOpacity
            onPress={() => closeFunc()}
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
          <>
            <Body
              color="#243757"
              bold
              size={16}
              style={{marginBottom: 20, marginTop: -16, fontWeight: 'bold'}}>
              Заполните информацию о Вашей карте {initialValues.name}
            </Body>
            <Formik initialValues={initialValues} onSubmit={addCard}>
              <>
                <AuthInput
                  name="name"
                  label="Имя и Фамилия*"
                  placeholder="ivan ivanov"
                  position="top"
                />
                <InputTextMask
                  name="number"
                  label="Номер карты*"
                  placeholder="**** **** **** ****"
                  position="center"
                  keyboardType="phone-pad"
                  maxLength={19}
                  mask="[0000] [0000] [0000] [0000]"
                  validate={validator(required)}
                />
                <InputTextMask
                  name="dateEnd"
                  label="Срок действия*"
                  placeholder="ММ/ГГГГ"
                  keyboardType="phone-pad"
                  position="center"
                  maxLength={10}
                  mask="[00]/[0000]"
                  validate={validator(required)}
                />
                <AuthInput
                  name="cvv"
                  label="CVV/CVC*"
                  placeholder="***"
                  position="bottom"
                  maxLength={4}
                  keyboardType="phone-pad"
                  validate={validator(required)}
                />
                <Space height={20} />
                <FormButton onPress={loading} text="ДОБАВИТЬ КАРТУ" />
              </>
            </Formik>
          </>
        </View>
      </ModalCustom>
    </View>
  );
};

const styles = ScaledSheet.create({
  subscribe: {
    padding: 25,
    textAlign: 'center',
    color: colors.darkBlue,
  },
  back: {
    height: 64,
    width: 289,
    paddingHorizontal: s(14),
    paddingVertical: vs(8),
    borderRadius: s(10),
    marginVertical: vs(16),
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 15,
  },
});
