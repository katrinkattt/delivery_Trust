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
import {loadCards, setCards, setCurrCard} from '../state/user/slice';
import {ICard} from '../state/user/types';
import {FormButton} from '../components/common/FormButton/FormButton';

const masterCardImg = require('../assets/bank.png');

export default function CardEditor() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cards = user.cards;
  const currCard = user.curCard;
  console.log('currCard', currCard);
  // console.log();

  const cardArr = [
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
  ];
  useEffect(() => {
    //загрузка карт по сути с бека должна быть
    if (!cards?.[0].number) {
      dispatch(loadCards({cards: cardArr}));
    }

    setCurrCard({card: currCard});
  }, []);
  const [delInd, setDelInd] = useState(0);

  const delCard = () => {
    console.log('delInd', delInd);

    let arr: ICardData[] = [...cards];
    console.log('arr', arr);
    if (delInd !== currCard) {
      if (delInd > -1) {
        //@ts-ignore
        arr.splice(delInd, 1);
        console.log('arr after spl=>', arr);

        dispatch(loadCards({cards: [...arr]}));
      }
    }
    //reducer del card need
    setDelModalVisible(false);
  };

  const pressButton = (num: number) => {
    dispatch(setCurrCard({card: num}));
  };

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [delModalVisible, setDelModalVisible] = useState(false);
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
    dispatch(loadCards({cards: [newCard, ...cards]}));
    setAddModalVisible(false);
    setLoading(false);
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
              {currCard == delInd
                ? 'Активную карту невозможно удалить'
                : 'Вы уверены, что хотите удалить карту?'}
            </Body>
            <Button
              onPress={delCard}
              buttonType={1}
              text={currCard == delInd ? 'Закрыть' : 'УДАЛИТЬ'}
            />
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
        {cards?.[0].number ? (
          cards.map((card, num) => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                key={card.id}
                style={{flexDirection: 'row'}}
                onPress={() => {
                  card?.recToken && pressButton(num);
                }}>
                <View style={{marginTop: 40, marginRight: 14}}>
                  <Ellipses
                    color={currCard == num ? colors.lavender : '#ccc'}
                  />
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
                onPress={() => {
                  setDelModalVisible(true);
                  setDelInd(num);
                }}
                style={{marginTop: 24, marginLeft: 10}}>
                <Body size={40} color={colors.ligthBorder}>
                  ×
                </Body>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Body
            bold
            semiBold
            size={16}
            style={{marginTop: 40, textAlign: 'center'}}>
            Добавленых карт нет
          </Body>
        )}
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
