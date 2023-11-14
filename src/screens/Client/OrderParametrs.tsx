import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header';
import Body from '../../components/common/Body';
import {ArrowRight, Ellipses} from '../../components/common/Svgs';
import CustomCheckbox from '../../components/common/CustomCheckbox';
import Button from '../../components/common/Button';
import AuthSelect from '../../components/common/AuthSelect';
import TextAreaInput from '../../components/common/TextAreaInput';
import {useNavigation} from '@react-navigation/native';
import {Space} from '../../components/common/Space';
import R from '../../res';
import {useDispatch, useSelector} from 'react-redux';
import {
  setNewOrderCategory,
  setNewOrderDoorToDoor,
  setNewOrderComment,
} from '../../state/orders/slice';
import {addSenders} from '../../state/user/slice';

export default function OrderParametrs() {
  const order = useSelector(state => state.order);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const [data, setData] = useState([
    {id: 1, title: 'Документы', select: true},
    {id: 2, title: 'Груз', select: false},
  ]);
  const [typeDoc, setTypeDoc] = useState('Выберите тип документа');
  const [typePac, setTypePac] = useState('Выберите тип посылки');
  const [isDoor, setIsDoor] = useState(false);
  const [err, setErr] = useState('');
  const [comm, setComm] = useState('');

  const docTypeArr = order?.categoryDoc || [
    {name: 'СНИЛС'},
    {name: 'Военный билет'},
    {name: 'Договор'},
    {name: 'Налоговые отчеты'},
  ];
  const packetTypeArr = order?.categoryPack;
  const [typeOrderNum, setTypeOrderNum] = useState(1);
  const [currArr, setCurrArr] = useState(docTypeArr);

  const pressButton = (id: number) => {
    const newData = data.map(i => {
      if (i.id === id) {
        return {...i, select: (i.select = true)};
      } else {
        return {...i, select: (i.select = false)};
      }
    });
    setData(newData);
    setTypeOrderNum(id);
  };
  useEffect(() => {
    pressButton(1);
  }, []);
  useEffect(() => {
    if (typeOrderNum == 1) {
      setCurrArr(docTypeArr);
    } else {
      setCurrArr(packetTypeArr);
    }
  }, [typeOrderNum]);

  const goRate = () => {
    dispatch(setNewOrderDoorToDoor({doorToDoor: isDoor}));
    dispatch(setNewOrderComment({comment: comm}));
    if (data[0].select && typeDoc !== 'Выберите тип документа') {
      setErr('');
      dispatch(setNewOrderCategory({category: typeDoc}));
      //@ts-ignore
      navigate.navigate(R.routes.CLIENT_ORDER_CONTACT);
    }
    if (data[1].select && typePac !== 'Выберите тип посылки') {
      setErr('');
      dispatch(setNewOrderCategory({category: typePac}));
      //@ts-ignore
      navigate.navigate(R.routes.CLIENT_ORDER_CONTACT);
    } else {
      setErr('Выберите тип');
    }
  };
  const setDropdown = (item: (typeof docTypeArr)[0]) => {
    if (typeOrderNum == 1) {
      setTypeDoc(item.name);
    } else {
      setTypePac(item.name);
    }
  };
  useEffect(() => {
    if (!!order.newOrder.category) {
      if (
        order.newOrder.category == 'Коробка' ||
        order.newOrder.category == 'Пакет'
      ) {
        setTypePac(order.newOrder.category);
        pressButton(2);
      } else {
        setTypeDoc(order.newOrder.category);
      }
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Параметры заказа" />

      <ScrollView>
        <Body semiBold size={17} style={{paddingLeft: 17}}>
          Тип отправления
        </Body>

        <ScrollView
          contentContainerStyle={{paddingLeft: 17}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            {data.map(item => (
              <TouchableOpacity
                key={item.id}
                style={
                  item.select ? styles.senderItem : styles.senderSecondItem
                }
                onPress={() => pressButton(item.id)}>
                <View>
                  <Body
                    color={item.select ? 'white' : 'black'}
                    style={{marginRight: 10}}>
                    {item.title}
                  </Body>
                  <Space height={4} />
                </View>
                <View style={{marginTop: 3}}>
                  <Ellipses
                    color={item.select ? '#333' : 'rgba(160, 172, 190, 1)'}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.recipientFormContainer}>
          <Body semiBold size={17} style={{marginBottom: 15}}>
            Параметры
          </Body>
          <AuthSelect
            label={typeOrderNum === 1 ? 'Тип документа' : 'Тип посылки'}
            placeholder={typeOrderNum === 1 ? typeDoc : typePac}
            position="top">
            <>
              {currArr.map(item => (
                <TouchableOpacity onPress={() => setDropdown(item)}>
                  <Body
                    color="rgba(0, 0, 0, 0.46)"
                    size={15}
                    style={{paddingHorizontal: 28, paddingBottom: 10}}>
                    {item.name}
                  </Body>
                </TouchableOpacity>
              ))}
            </>
          </AuthSelect>

          <TextAreaInput
            label="Комментарий"
            placeholder="Введите комментарий для заказа"
            position="center"
            value={comm}
            setValue={setComm}
          />
          <Body color="#a22" size={12}>
            {err}
          </Body>
          <CustomCheckbox
            label="От двери до двери"
            style={{marginTop: 16}}
            onChange={() => setIsDoor(!isDoor)}
            val={isDoor}
          />

          <View style={{alignItems: 'center'}}>
            <Button
              buttonType={3}
              onPress={goRate}
              containerStyle={{width: 259, marginTop: 20}}
              renderContent={() => (
                <>
                  <Body
                    style={{marginRight: 80}}
                    semiBold
                    color="rgba(255, 255, 255, 1)"
                    size={15}>
                    ДАЛЕЕ
                  </Body>
                  <ArrowRight />
                </>
              )}
            />
          </View>
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
});
