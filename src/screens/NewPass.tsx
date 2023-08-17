import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import {AppleLogo, FacebookLogo, GoogleLogo} from '../components/common/Svgs';
import Body from '../components/common/Body';
import Button from '../components/common/Button';
import {useNavigation} from '@react-navigation/native';
import AuthInput from '../components/common/AuthInput';
import Header from '../components/Header';
import {requir, validator, email} from '../utils/validators';
import {IResetPass} from '../types/data';
import R from '../res';
import {useDispatch} from 'react-redux';
import {resetPassAction} from '../state/user/action';
import useAppSelector from '../hooks/useAppSelector';
import {getUser} from '../state/user/selectors';
import {FormButton} from '../components/common/FormButton/FormButton';

export default function NewPass() {
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {loading} = useAppSelector(getUser);
  const [error, setError] = useState('');
  const user = useSelector(state => state.user);
  // useEffect(() => {

  // }, []);

  const initialValues: IResetPass = {
    new_password: '',
    passwordConfirmation: '',
  };
  const submit = (data: IResetPass) => {
    if (data.passwordConfirmation === data.new_password) {
      dispatch(
        //@ts-ignores
        resetPassAction({
          data: {
            email: user?.email,
            code: user?.code,
            new_password: data.new_password,
          },
          onSuccess: () => {
            //@ts-ignore
            navigation.navigate('TabScreen');
          },
          onError: async () => {
            setError('Ошибка отправки попробуйте еще');
          },
        }),
      );
    } else {
      setError('Пароли не совпадают');
    }
    // } else {
    //   setError('Пароль не менее 8 символов');
    // }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submit}>
      <View style={styles.container}>
        <Header title="Придумайте новый пароль" />

        <AuthInput
          label="Пароль"
          placeholder="Введите новый пароль"
          position="bottom"
          name="new_password"
          validate={validator(requir)}
        />
        <AuthInput
          label="Повторите пароль*"
          placeholder="Повторите новый пароль"
          position="bottom"
          name="passwordConfirmation"
          validate={validator(requir)}
        />
        <Body color="#a22">{error}</Body>
        <FormButton loading={loading} text="СОХРАНИТЬ" />
      </View>
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  resetPassword: {
    marginTop: 12,
    marginBottom: 16,
  },
  socialMediaButton: {
    width: 86,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.09)',
    borderWidth: 1,
    borderRadius: 5,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
