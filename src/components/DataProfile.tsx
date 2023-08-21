import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {s, vs} from 'react-native-size-matters';
import SecondAuthInput from './common/SecondAutInput';
import Button from './common/Button';
import {useNavigation} from '@react-navigation/native';
import Body from './common/Body';

export default function DataProfile() {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  return (
    <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
      <SecondAuthInput
        label="Фамилия имя отчество*"
        placeholder={user?.full_name || ''}
        position="top"
      />
      <SecondAuthInput
        label="E-mail*"
        placeholder={user?.email}
        position="center"
      />
      <SecondAuthInput
        label="Номер телефона*"
        placeholder="+7 932-32-32-14"
        position="center"
      />
      <SecondAuthInput
        label="Регион*"
        placeholder={user?.region || 'Московская область'}
        position="center"
      />
      <SecondAuthInput
        label="Город*"
        placeholder={user?.city || 'Москва'}
        position="center"
      />
      <SecondAuthInput
        label="Улица*"
        placeholder={user?.street || 'Гоголя'}
        position="center"
      />
      <SecondAuthInput
        label="Дом*"
        placeholder={user?.house || '16'}
        position="center"
      />
      <SecondAuthInput
        label="Квартира*"
        placeholder={user?.apartment || ''}
        position="bottom"
      />
      <View style={{marginTop: 20}}>
        <Body size={12} color="#000">
          временнное решение для проверки функционала ссылается на стр роли и тд
        </Body>
        <Button
          text="РЕДАКТИРОВАТЬ"
          onPress={() => {
            //@ts-ignore 'ClientRegistrArgumet'
            navigation.navigate('ProfileType');
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: vs(20),
    marginHorizontal: s(15),
    borderRadius: s(10),
    borderColor: '#E8E8F0',
    paddingVertical: vs(10),
  },
});
