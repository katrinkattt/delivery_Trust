import React from 'react';
import {StyleSheet, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import AuthInput from './common/AuthInput';
import Button from './common/Button';
import {validator, requir} from '../utils/validators';
import {Formik} from 'formik';
import {IChangePass} from '../types/data';

export default function ParolProfile() {
  const initialValues: IChangePass = {
    oldPasword: '',
    password: '',
    passwordConfirmation: '',
  };
  const submitChagePass = () => {
    console.log('submitChagePass');
    //need reduser for it
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submitChagePass}>
      {() => (
        <View style={styles.card}>
          <AuthInput
            label="Старый пароль*"
            placeholder="Введите пароль"
            position="top"
            // containerStyle={styles.input}
            // parolInput={true}
            name="password"
            validate={validator(requir)}
          />
          <AuthInput
            label="Пароль*"
            placeholder="Введите новый пароль"
            position="center"
            // parolInput={true}
            name="password"
            validate={validator(requir)}
          />
          <AuthInput
            label="Повторите пароль*"
            placeholder="Повторите новый пароль"
            position="bottom"
            // parolInput={true}
            name="passwordConfirmation"
            validate={validator(requir)}
          />

          <Button containerStyle={{marginTop: 15}} text="Сменить пароль" />
        </View>
      )}
    </Formik>
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
  input: {
    // backgroundColor: 'red',
  },
});
