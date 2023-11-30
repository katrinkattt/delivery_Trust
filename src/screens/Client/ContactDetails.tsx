import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import Body from '../../components/common/Body';
import { ArrowRight, Ellipses } from '../../components/common/Svgs';
import AuthInput from '../../components/common/AuthInput';
import CustomCheckbox from '../../components/common/CustomCheckbox';
import Button from '../../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { Space } from '../../components/common/Space';
import R from '../../res';
import { Formik } from 'formik';
import { ICotactDetailsOrder } from '../../types/data';
import { validator, tel, req, minLength } from '../../utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { GOOGLE_API_KEY_A, GOOGLE_API_KEY_IOS } from '../../api/googleApi';
import { FormButton } from '../../components/common/FormButton/FormButton';
import {
  setNewOrderStartCoord,
  setNewOrderFinishCoord,
  setNewOrderAddress,
  setNewOrderAddressTo,
  setNewOrderRecipient,
  setNewOrderSender,
  setNewOrderAnySender,
} from '../../state/orders/slice';
import { addSenders } from '../../state/user/slice';
import { ModalCustom } from '../../components/ModalCustom';
import { colors } from '../../theme/themes';
import { useAppDispatch } from '../../hooks/redux';
import { editSenders } from '../../state/user/action';
import { OrderSender } from '../../state/user/types';
import InputTextMask from '../../components/common/InputTextMask';
import { tariffPrice } from '../../state/orders/action';

export default function ContactDetails() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const disp = useAppDispatch();
  const { loading } = useSelector(state => state.order);
  const user = useSelector(state => state.user);
  const [coordSender, setCoordSender] = useState({ latitude: 0, longitude: 0 });
  const [coordRecipient, setCoordRecipient] = useState({
    latitude: 0,
    longitude: 0,
  });
  const sender_id = user?.id;
  const [senders, setSenders] = useState(user?.senders);
  const [err, setErr] = useState('');
  const [currSender, setCurrSender] = useState(0);

  const sendSenders = (senders: OrderSender[]) => {
    console.log('sendSenders', senders);

    disp(
      editSenders({
        id: user.id,
        data: {
          sender: senders,
        },
        onSuccess: () => {
          console.log('senders send');
        },
        onError: async e => {
          console.log('ERR senders send', e);
        },
      }),
    );
  };
  // const addSender = (formData: ICotactDetailsOrder) => {
  //   setAddLoading(true);
  //   checkAddress(formData);
  // };
  const addSender = async (add: ICotactDetailsOrder) => {
    setErr('Определение адреса');
    const strAddress = `${add?.city}+${add?.street}+${add?.house}`;
    const stringAdd = `г. ${add?.city} ул.${add?.street} д.${add?.house} ${!!add?.apartment ? add?.apartment + 'кв' : ''
      }`;
    const {
      data: { results },
    } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${strAddress}&language=ru&key=${GOOGLE_API_KEY_A}`,
    );

    if (results[0]?.geometry.location) {
      const send = {
        fullName: add.fio,
        phone: add.phone,
        city: add.city,
        street: add.street,
        house: add.house,
        apartment: add.apartment || '',
        address: stringAdd,
        coord: {
          latitude: results[0]?.geometry.location.lat,
          longitude: results[0]?.geometry.location.lng,
        },
      };
      console.log('SEND OBJ', send);
      setErr('');
      //ВЕСЬ КОД ФУНКЦИИ ЧТО НАХОДИТСЯ НИЖЕ НЕ ЗАПУСКАЕТСЯ

      const arr = senders ? [...senders, send] : [send];
      console.log('qwertyui ARR', arr);
      setSenders(arr);
      sendSenders(arr);
      dispatch(addSenders({ sender: arr }));
      setModalVisible(false);
      setAddLoading(false);
    } else {
      setErr('Адрес не найден');
    }
  };
  //@ts-ignore
  const getCoord = async (add, user: string) => {
    const strAddress = `${add?.city}+${add?.street}+${add?.house}`;
    const stringAdd = `г. ${add?.city} ул.${add?.street} д.${add?.house} ${!!add?.apartment ? add?.apartment + 'кв' : ''
      }`;
    console.log('strAddress', strAddress);
    console.log(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${strAddress}&language=ru&key=${GOOGLE_API_KEY_A}`,
    );

    const {
      data: { results },
    } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${strAddress}&language=ru&key=${GOOGLE_API_KEY_A}`,
    );
    console.log('GOOGLE results===>', results);
    if (user === 'sender') {
      setCoordSender({
        latitude: results[0]?.geometry.location.lat,
        longitude: results[0]?.geometry.location.lng,
      });
      dispatch(setNewOrderStartCoord({ coord: coordSender }));
      dispatch(setNewOrderAddress({ address: stringAdd }));
      dispatch(
        setNewOrderSender({ sender: add?.full_name, sender_id: sender_id }),
      );
    }
    if (user === 'recipient') {
      setCoordRecipient({
        latitude: results[0]?.geometry.location.lat,
        longitude: results[0]?.geometry.location.lng,
      });
      dispatch(setNewOrderFinishCoord({ coord: coordRecipient }));
      dispatch(setNewOrderAddressTo({ addressTo: stringAdd }));
      dispatch(setNewOrderRecipient({ recipient: add.fio, phone: add.phone }));
    }
  };

  const [data, setData] = useState([{ id: 0, fullName: 'Я' }]);
  useEffect(() => {
    if (senders !== null) {
      const arr = [{ id: 0, fullName: 'Я' }, ...senders];
      setData(arr);
    }
  }, [senders]);

  const initialValues: ICotactDetailsOrder = {
    fio: '',
    phone: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    doorCode: '',
  };
  // const [state, setState] = useState(initialValues);
  const [agre, setAgre] = useState(false);

  const pressButton = (num: number) => {
    setCurrSender(num);
    if (num !== 0) {
      const sender = {
        fullName: data[num].fullName,
        address: data[num]?.address || '',
        startCoordinates: data[num].coord,
      };
      console.log('sender', sender);
      dispatch(setNewOrderAnySender({ sender: sender }));
      dispatch(
        setNewOrderSender({ sender: sender.fullName, sender_id: sender_id }),
      );
    }
  };

  const goOrderParams = (formData: ICotactDetailsOrder) => {
    if (agre) {
      console.log(
        'FORM DATA',
        formData.city,
        formData.street,
        formData.house,
        formData.phone,
      );
      if (currSender == 0) {
        getCoord(user, 'sender');
      }
      getCoord(formData, 'recipient').then(() => {
        if (coordRecipient.latitude !== 0) {
          disp(
            tariffPrice({
              data: {
                coors_from: coordSender,
                coors_delivery: coordRecipient,
              },
              onSuccess: () => {
                console.log('tariffs LOADED');
                //@ts-ignore
                navigation.navigate(R.routes.CLIENT_ORDER_RATE);
              },
              onError: async e => {
                console.log('ERR LOADED TARIFF', e);
              },
            }),
          );
        }
      });
    }
  };
  const [addLoading, setAddLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelVisible, setModalDelVisible] = useState(false);
  const [delNum, setDelNum] = useState(0);
  const initialValuesAdd: ICotactDetailsOrder = {
    fio: '',
    phone: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    doorCode: '',
  };

  console.log('currSender', currSender);
  console.log('data', data);

  const senderDel = (num: number) => {
    console.log('num', num);

    if (num !== currSender) {
      if (num !== 0) {
        const numINSenders = num - 1;
        let arr = [...senders];
        arr.splice(numINSenders, 1);

        setSenders([...arr]);
        sendSenders([...arr]);
        dispatch(addSenders({ sender: [...arr] }));
      }
    }
    setModalDelVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalCustom modalVisible={modalVisible}>
        <View style={{ width: 290 }}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                marginTop: -20,
                color: colors.lavender,
                fontSize: 26,
              }}>
              ×
            </Text>
          </TouchableOpacity>
          <Body
            color="#243757"
            bold
            size={16}
            style={{ marginBottom: 20, marginTop: -16, fontWeight: 'bold' }}>
            Добавить оттправителя
          </Body>
          <Formik initialValues={initialValuesAdd} onSubmit={addSender}>
            <>
              <View style={{ width: 290, height: 6 * 80, paddingBottom: 20 }}>
                <AuthInput
                  label="Фамилия имя отчество*"
                  placeholder="Введите фамилию имя отчество"
                  position="top"
                  name="fio"
                  validate={validator(req)}
                />
                <InputTextMask
                  label="Телефон*"
                  placeholder="Введите телефон"
                  keyboardType="phone-pad"
                  position="center"
                  name="phone"
                  maxLength={16}
                  mask="+[0] [000] [000]-[00]-[00]"
                  validate={validator(tel)}
                />
                <AuthInput
                  label="Населенный пункт*"
                  placeholder="Введите название"
                  position="center"
                  name="city"
                  validate={validator(req)}
                />
                <AuthInput
                  label="Улица*"
                  placeholder="Введите название"
                  position="center"
                  name="street"
                  validate={validator(req)}
                />
                <AuthInput
                  containerStyle={[styles.rowInput, { borderRightWidth: 0 }]}
                  label="Дом*"
                  placeholder="Введите номер"
                  position="center"
                  name="house"
                  validate={validator(minLength(1))}
                />
                <AuthInput
                  containerStyle={styles.rowInput}
                  label="Квартира*"
                  placeholder="Введите номер"
                  position="bottom"
                  name="apartment"
                />
              </View>
              <Body size={14} color="#444" style={{ paddingBottom: 10 }}>
                {err}
              </Body>
              <FormButton text="ДОБАВИТЬ" onPress={addLoading} />
            </>
          </Formik>
        </View>
      </ModalCustom>
      <ModalCustom modalVisible={modalDelVisible}>
        <View style={{ width: 290 }}>
          <TouchableOpacity
            onPress={() => setModalDelVisible(false)}
            style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                marginTop: -20,
                color: colors.lavender,
                fontSize: 26,
              }}>
              ×
            </Text>
          </TouchableOpacity>
          <Body
            color="#243757"
            bold
            size={16}
            style={{ marginBottom: 20, marginTop: -16, fontWeight: 'bold' }}>
            {currSender == delNum
              ? 'Активного отправителя невозможно удалить'
              : 'Удалить отправителя?'}
          </Body>
          <View style={styles.row}>
            <View style={{ width: '50%', padding: 20 }}>
              <Button
                onPress={() => setModalDelVisible(false)}
                buttonType={1}
                text="НЕТ"
              />
            </View>
            <View style={{ width: '50%', padding: 20 }}>
              <Button
                onPress={() => senderDel(delNum)}
                buttonType={2}
                text={currSender == delNum ? 'OK' : 'ДА'}
              />
            </View>
          </View>
        </View>
      </ModalCustom>
      <Header title="Контактные данные" />
      <ScrollView>
        <Body semiBold size={17} style={{ paddingLeft: 17 }}>
          Отправитель
        </Body>
        <ScrollView
          contentContainerStyle={{ paddingLeft: 17 }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>
            {data.map((item, num: number) => (
              <TouchableOpacity
                key={item.id}
                style={
                  data[currSender].fullName == item.fullName
                    ? styles.senderItem
                    : styles.senderSecondItem
                }
                onLongPress={() => {
                  setModalDelVisible(true);
                  setDelNum(num);
                }}
                onPress={() => pressButton(num)}>
                <View>
                  <Body
                    color={
                      data[currSender].fullName == item.fullName
                        ? 'white'
                        : 'black'
                    }
                    style={{ marginRight: 10 }}>
                    {item.fullName}
                  </Body>
                  <Space height={4} />
                </View>
                <View style={{ marginTop: 3 }}>
                  <Ellipses
                    color={
                      data[currSender].fullName == item.fullName
                        ? 'white'
                        : 'rgba(160, 172, 190, 1)'
                    }
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.senderItemm}>
            <View>
              <Body color={'black'} style={{ marginRight: 10 }}>
                Добавить нового
              </Body>
              <Space height={4} />
            </View>
            <View style={{ marginTop: 3 }}>
              <Ellipses color="white" />
            </View>
          </TouchableOpacity>
        </ScrollView>
        <Formik initialValues={initialValues} onSubmit={goOrderParams}>
          <View style={styles.recipientFormContainer}>
            <Body semiBold size={17} style={{ marginBottom: 15 }}>
              Получатель
            </Body>

            <AuthInput
              label="Фамилия имя отчество*"
              placeholder="Введите фамилию имя отчество"
              position="top"
              name="fio"
              validate={validator(req)}
            />
            <InputTextMask
              label="Телефон*"
              placeholder="Введите телефон"
              keyboardType="phone-pad"
              position="center"
              name="phone"
              maxLength={16}
              mask="+[0] [000] [000]-[00]-[00]"
              validate={validator(tel)}
            />
            <AuthInput
              label="Населенный пункт*"
              placeholder="Введите название"
              position="center"
              name="city"
              validate={validator(req)}
            />
            <AuthInput
              label="Улица*"
              placeholder="Введите название"
              position="center"
              name="street"
              validate={validator(req)}
            />

            <View style={styles.row}>
              <AuthInput
                containerStyle={[styles.rowInput, { borderRightWidth: 0 }]}
                label="Дом*"
                placeholder="Введите номер"
                position="center"
                name="house"
                validate={validator(minLength(1))}
              />
              <AuthInput
                containerStyle={styles.rowInput}
                label="Квартира*"
                placeholder="Введите номер"
                position="center"
                name="apartment"
              />
            </View>

            <View style={styles.row}>
              <AuthInput
                containerStyle={[styles.rowInput, { borderRightWidth: 0 }]}
                label="Подъезд*"
                placeholder="Введите номер"
                position="center"
                name="entrance"
              />
              <AuthInput
                containerStyle={styles.rowInput}
                label="Домофон или код*"
                placeholder="Введите номер"
                position="bottom"
                name="doorCode"
              />
            </View>

            <CustomCheckbox
              label={`Согласие на обработку персональных \nданных`}
              style={{ marginTop: 10 }}
              onChange={() => setAgre(!agre)}
              val={agre}
            />
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <FormButton text="ДАЛЕЕ   ➤" onPress={loading} />
            </View>
          </View>
        </Formik>
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
  senderItemm: {
    padding: 20,
    backgroundColor: 'rgba(232, 232, 240, 1)',
    borderRadius: 10,
    marginTop: 12,
    flexDirection: 'row',
    marginRight: 10,
  },
});
