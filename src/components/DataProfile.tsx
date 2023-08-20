import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {s, vs} from 'react-native-size-matters';
import SecondAuthInput from './common/SecondAutInput';

export default function DataProfile() {
  const user = useSelector(state => state.user);
  return (
    <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
      <SecondAuthInput
        label="Фамилия имя отчество*"
        placeholder={user?.access_token.slice(1, 8) + '...token'}
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
        placeholder="Москва и московская область"
        position="center"
      />
      <SecondAuthInput label="Город*" placeholder="Москва" position="center" />
      <SecondAuthInput label="Улица*" placeholder="Гоголя" position="center" />
      <SecondAuthInput label="Дом*" placeholder="14" position="center" />
      <SecondAuthInput label="Квартира*" placeholder="113" position="bottom" />
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
