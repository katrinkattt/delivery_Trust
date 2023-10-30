import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import AuthInput from './common/AuthInput';
import Button from './common/Button';
import {validator, requir} from '../utils/validators';
import {Formik} from 'formik';
import {IChangePass} from '../types/data';
import {useAppDispatch} from '../hooks/redux';
import {FormButton} from './common/FormButton/FormButton';
import {useSelector} from 'react-redux';
import Body from './common/Body';
import {colors} from '../theme/themes';
import {changePass} from '../state/user/action';

export default function ParolProfile() {
  const {loading, user_id} = useSelector(state => state.user);
  const [err, setErr] = useState('');
  const dispatch = useAppDispatch();
  const initialValues: IChangePass = {
    oldPasword: '',
    newPassword: '',
    repeatNewPassword: '',
  };
  const submitChagePass = (data: IChangePass) => {
    if (data.newPassword !== data.repeatNewPassword) {
      setErr('Пароли не совпадают');
    } else {
      setErr('');
      console.log('submitChagePass');
      dispatch(
        changePass({
          id: user_id,
          data: {...data},
          onSuccess: () => {
            console.log('pass changed');
          },
          onError: async e => {
            if (e.data.message) {
              setErr(e.data.message);
            }
            console.log('ERR CHANGE PASS', e);
          },
        }),
      );
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submitChagePass}>
      {() => (
        <View style={styles.card}>
          <AuthInput
            label="Старый пароль*"
            placeholder="Введите пароль"
            position="top"
            containerStyle={styles.input}
            parolInput={true}
            name="oldPasword"
            validate={validator(requir)}
          />
          <AuthInput
            label="Пароль*"
            placeholder="Введите новый пароль"
            position="center"
            // parolInput={true}
            name="newPassword"
            validate={validator(requir)}
          />
          <AuthInput
            label="Повторите пароль*"
            placeholder="Повторите новый пароль"
            position="bottom"
            // parolInput={true}
            name="repeatNewPassword"
            validate={validator(requir)}
          />
          <Body color={colors.darkBlue}>{err}</Body>
          <FormButton onPress={loading} text="Сменить пароль" />
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
