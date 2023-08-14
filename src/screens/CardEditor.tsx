import React, {useState} from 'react';
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

const masterCardImg = require('../assets/bank.png');

export default function CardEditor() {
  const [cardArr, setCardArr] = useState([
    {
      id: 1,
      select: true,
      system: 'MIR',
      number: '**** **** **** 4256',
      recToken: 'jsdgdb',
    },
    {
      id: 2,
      select: false,
      system: 'Master Card',
      number: '**** **** **** 0321',
      recToken: 'lvabe',
    },
    {
      id: 3,
      select: false,
      system: 'Visa',
      number: '**** **** **** 4256',
      recToken: '',
    },
  ]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [delModalVisible, setDelModalVisible] = useState(false);
  const addCard = () => {
    setAddModalVisible(false);
    //reducer add card
  };
  const initialValues: ICardData = {
    name: '',
    cardNumber: '',
    dateEnd: '',
    cvv: '',
  };
  const delCard = () => {
    setDelModalVisible(false);
    //reducer del card
  };

  const pressButton = (id: number) => {
    const newData = cardArr.map(i => {
      if (i.id === id) {
        return {...i, select: (i.select = true)};
      } else {
        return {...i, select: (i.select = false)};
      }
    });
    setCardArr(newData);
  };
  return (
    <View style={{flex: 1}}>
      <ModalCustom modalVisible={addModalVisible}>
        <View style={{width: 290}}>
          <TouchableOpacity
            onPress={() => setAddModalVisible(false)}
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
                  name="cardNumber"
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
                  placeholder="ДД/ММ/ГГГГ"
                  keyboardType="phone-pad"
                  position="center"
                  maxLength={10}
                  mask="[00]/[00]/[0000]"
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
              </>
            </Formik>
            <Space height={20} />
            <Button onPress={addCard} buttonType={2} text="ДОБАВИТЬ КАРТУ" />
          </>
        </View>
      </ModalCustom>
      <ModalCustom modalVisible={delModalVisible}>
        <View style={{width: 290}}>
          <TouchableOpacity
            onPress={() => setDelModalVisible(false)}
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
              style={{marginBottom: 20, fontWeight: 'bold'}}>
              Вы уверены, что хотите удалить карту?
            </Body>
            <Button onPress={delCard} buttonType={1} text="УДАЛИТЬ" />
          </>
        </View>
      </ModalCustom>
      <Header title="Банковская карта" />
      <View style={{marginHorizontal: 15}}>
        <Body
          bold
          semiBold
          size={20}
          style={{marginTop: 20, fontWeight: 'bold'}}>
          Мои карты
        </Body>
        {cardArr.map(card => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              key={card.id}
              style={{flexDirection: 'row'}}
              onPress={() => {
                card?.recToken && pressButton(card.id);
              }}>
              <View style={{marginTop: 40, marginRight: 14}}>
                <Ellipses color={card?.select ? colors.lavender : '#ccc'} />
              </View>
              <ImageBackground
                source={masterCardImg}
                style={styles.back}
                resizeMode="stretch">
                <Body size={11} color="white">
                  {card?.system}
                </Body>
                <Body size={18} bold color="white">
                  {card?.number}
                </Body>
                {!card?.recToken && (
                  <Body size={12} bold color="white">
                    Карта недействительна
                  </Body>
                )}
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDelModalVisible(true)}
              style={{marginTop: 24, marginLeft: 10}}>
              <Body size={40} color={colors.ligthBorder}>
                ×
              </Body>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.bottom}>
        <Button
          text="ДОБАВИТЬ КАРТУ"
          onPress={() => setAddModalVisible(true)}
          buttonType={1}
        />
      </View>
    </View>
  );
}

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
