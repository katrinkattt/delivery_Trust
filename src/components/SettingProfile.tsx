import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import AuthSelect from './common/AuthSelect';
import Body from './common/Body';
import ToggleSwitch from 'toggle-switch-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const backImage = require('../assets/bank.png');
import R from '../res';
import { useDispatch, useSelector } from 'react-redux';
import Button from './common/Button';
import { ModalCustom } from './ModalCustom';
import { colors } from '../theme/themes';
import { logout } from '../state/user/slice';
import { setNotify } from '../state/user/slice';


// interface IData {
//     id: number
//     text?: string
//     chosen?: boolean
// }

// interface IKo {
//     item: IData
// }

export default function SettingProfile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { notifyNerbay,
    notifyLate,
    notifyGetOrder } = user

  const [data, setData] = useState([
    { id: 1, title: 'Курьер подходит к дому', chosen: notifyNerbay, param: 'nerbay' },
    { id: 2, title: 'Курьер опаздывает', chosen: notifyLate, param: 'late' },
    { id: 3, title: 'Курьер взял мой заказ', chosen: notifyGetOrder, param: 'getOrder' },
  ]);
  const exampleCard = {
    system: 'Добавить карту',
    number: '**** **** **** 0000',
  };
  const currentCard =
    user.cards == null || user.cards.length < 1
      ? exampleCard
      : user.cards[user.curCard];

  console.log(notifyNerbay, 'notify');

  const pressButton = (param: string, value: boolean) => {
    console.log('param', param);
    dispatch(setNotify({ param: param, value: !value }))
    const newData = data.map(i => {
      if (i.param === param) {
        return { ...i, chosen: !i.chosen };
      } else {
        return i;
      }
    });
    setData(newData);
  };
  const [modalVisible, setModalVisible] = useState(false);
  // const handPress = (item) => {
  //     const newItem = teleg.map((val) => {
  //         if (val.id === item.id) {
  //             return { ...val, completed: !val.completed }
  //         } else {
  //             return val
  //         }
  //     })
  //     setTeleg(newItem)

  const editCard = () => {
    //@ts-ignore
    navigation.navigate(R.routes.CARD_EDITOR);
  };
  const logOut = () => {
    setModalVisible(false);
    dispatch(logout());
    navigation.navigate('AuthNavigator');
  };
  return (
    <View style={styles.card}>
      <ModalCustom modalVisible={modalVisible}>
        <View style={{ width: 290 }}>
          {/* <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{alignItems: 'flex-end', height: 30}}>
            <Text
              style={{
                marginTop: -20,
                color: colors.lavender,
                fontSize: 26,
              }}>
              ×
            </Text> */}
          {/* </TouchableOpacity> */}
          <Body
            color="#243757"
            bold
            size={16}
            style={{ marginBottom: 20, marginTop: 0, fontWeight: 'bold' }}>
            Вы действительно хотите выйти?
          </Body>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: '50%', paddingHorizontal: 10 }}>
              <Button
                onPress={() => setModalVisible(false)}
                buttonType={2}
                text="ОТМЕНИТЬ"
              />
            </View>
            <View style={{ width: '50%', paddingHorizontal: 10 }}>
              <Button onPress={logOut} buttonType={1} text="ВЫЙТИ" />
            </View>
          </View>
        </View>
      </ModalCustom>
      <Text style={styles.courierRatingText}>Банковская карта</Text>
      <TouchableOpacity onPress={editCard}>
        <ImageBackground
          source={backImage}
          style={styles.back}
          resizeMode="stretch">
          <Body size={11} color="white">
            {currentCard.system}
          </Body>

          <Body size={24} bold color="white">
            **** **** **** {currentCard.number.slice(-4)}
          </Body>
        </ImageBackground>
      </TouchableOpacity>

      {/* <AuthSelect
        label="Часовой пояс"
        placeholder="(UTC +03:00) Россия / Москва"
      /> */}
      {user?.typeInUser && (
        <Body size={20} semiBold style={styles.title}>
          Уведомления
        </Body>
      )}

      {user?.typeInUser &&
        data.map(item => (
          <View style={styles.SwitchCard} key={item.id}>
            <Body size={16} style={styles.text}>
              {item.title}
            </Body>

            <ToggleSwitch
              isOn={item.chosen}
              onColor="rgba(94, 98, 223, 1)"
              thumbOnStyle={styles.on}
              thumbOffStyle={styles.of}
              trackOnStyle={styles.ton}
              trackOffStyle={styles.tOff}
              offColor="#E8E8F0"
              labelStyle={styles.swipe}
              size="medium"
              onToggle={() => pressButton(item.param, item.chosen)}
            />
          </View>
        ))}
      <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
        <Button
          onPress={() => setModalVisible(true)}
          buttonType={1}
          text="ВЫЙТИ ИЗ ПРИЛОЖЕНИЯ"
        />
      </View>

      {/* <View style={styles.SwitchCard}>
                <Body size={16} style={styles.text}>
                    Курьер подходит к дому
                </Body>

                <ToggleSwitch
                    isOn={tog}
                    onColor="rgba(94, 98, 223, 1)"
                    thumbOnStyle={styles.on}
                    thumbOffStyle={styles.of}
                    trackOnStyle={styles.ton}
                    trackOffStyle={styles.tOff}
                    offColor="#E8E8F0"
                    labelStyle={styles.swipe}
                    size="medium"
                    onToggle={pressButton}
                />
            </View> */}

      {/* <View style={styles.SwitchCard}>
                <Body size={16} style={styles.text}>
                    Курьер подходит к дому
                </Body>

                <ToggleSwitch
                    isOn={tog}
                    onColor="rgba(94, 98, 223, 1)"
                    thumbOnStyle={styles.on}
                    thumbOffStyle={styles.of}
                    trackOnStyle={styles.ton}
                    trackOffStyle={styles.tOff}
                    offColor="#E8E8F0"
                    labelStyle={styles.swipe}
                    size="medium"
                    onToggle={()=>pressButton(item.id)}
                />
            </View>

            <View style={styles.SwitchCard}>
                <Body size={16} style={styles.text}>
                    Курьер подходит к дому
                </Body>

                <ToggleSwitch
                    isOn={tog}
                    onColor="rgba(94, 98, 223, 1)"
                    thumbOnStyle={styles.on}
                    thumbOffStyle={styles.of}
                    trackOnStyle={styles.ton}
                    trackOffStyle={styles.tOff}
                    offColor="#E8E8F0"
                    labelStyle={styles.swipe}
                    size="medium"
                    onToggle={()=>pressButton(item.id)}
                />
            </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: s(15),
  },
  courierRatingText: {
    marginTop: vs(20),
    lineHeight: 24,
    fontWeight: '600',
    fontSize: 24,
    color: 'rgba(36, 55, 87, 1)',
    fontFamily: 'Gilroy-SemiBold',
  },
  back: {
    paddingHorizontal: s(24),
    paddingVertical: vs(18),
    borderRadius: s(10),
    marginVertical: vs(16),
  },
  title: {
    marginTop: vs(29),
  },
  SwitchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    marginVertical: vs(19),
  },
  swipe: {
    color: 'black',
    fontFamily: 'Gilroy-Medium',
    fontWeight: '400',
    fontSize: 16,
    marginRight: 120,
  },
  on: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(94, 98, 223, 1)',
  },
  of: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  ton: {
    backgroundColor: 'rgba(94, 98, 223, 1)',
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(94, 98, 223, 1)',
  },
  tOff: {
    backgroundColor: '#E8E8F0',
    padding: 12,
    borderRadius: 100,
  },
});
