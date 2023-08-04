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

export default function OrderParametrs() {
  const navigate = useNavigation();

  const [data, setData] = useState([
    {id: 1, title: 'Документы', select: false},
    {id: 2, title: 'Груз', select: true},
  ]);
  const [typeDoc, setTypeDoc] = useState('Выберите тип документа');
  const [typePac, setTypePac] = useState('Выберите тип посылки');

  const docTypeArr = [
    {val: 'dogovor', label: 'Договор'},
    {val: 'snils', label: 'СНИЛС'},
    {val: 'vartiket', label: 'Военный билет'},
  ];
  const packetTypeArr = [
    {val: 'packet', label: 'Пакет'},
    {val: 'box', label: 'Коробка'},
  ];
  const [typeOrderNum, setTypeOrderNum] = useState(1);
  const [currArr, setCurrArr] = useState(docTypeArr);

  const pressButton = (id: number) => {
    const newData = data.map(i => {
      if (i.id === id) {
        return {...i, select: (i.select = false)};
      } else {
        return {...i, select: (i.select = true)};
      }
    });
    setData(newData);
    setTypeOrderNum(id);
  };
  useEffect(() => {
    if (typeOrderNum == 1) {
      setCurrArr(docTypeArr);
    } else {
      setCurrArr(packetTypeArr);
    }
  }, [typeOrderNum]);

  const goRate = () => {
    //@ts-ignore
    navigate.navigate(R.routes.CLIENT_ORDER_CONTACT);
  };
  const setDropdown = (item: (typeof docTypeArr)[0]) => {
    if (typeOrderNum == 1) {
      setTypeDoc(item.label);
    } else {
      setTypePac(item.label);
    }
  };

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
                  item.select ? styles.senderSecondItem : styles.senderItem
                }
                onPress={() => pressButton(item.id)}>
                <View>
                  <Body
                    color={item.select ? 'black' : 'white'}
                    style={{marginRight: 10}}>
                    {item.title}
                  </Body>
                  <Space height={4} />
                </View>
                <View style={{marginTop: 3}}>
                  <Ellipses
                    color={item.select ? 'rgba(160, 172, 190, 1)' : 'white'}
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
                    {item.label}
                  </Body>
                </TouchableOpacity>
              ))}
            </>
          </AuthSelect>

          <TextAreaInput
            label="Комментарий"
            placeholder="Введите комментарий для заказа"
            position="center"
          />

          <CustomCheckbox label="От двери до двери" style={{marginTop: 16}} />

          <View style={{alignItems: 'center'}}>
            <Button
              buttonType={3}
              text="Скачать договор"
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
