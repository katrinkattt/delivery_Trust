// import React from 'react';
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
import {ILogin} from '../types/data';
import R from '../res';

export default function Login() {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();

  const initialValues: ILogin = {
    email: '',
    password: '',
  };
  const submit = (data: ILogin) => {
    console.log('submit');
    //@ts-ignore
    navigation.navigate(R.routes.HOME);
    // dispatch(
    //   loginAction({
    //         data,
    //         onSuccess: () => {
    //             //@ts-ignore
    //             navigation.navigate(R.routes.CONFIRM_EMAIL)
    //         },
    //         onError: async () => {
    //             setError('Предоставленный код не совпадает или истек срок действия')
    //         },
    //     }),
    // )
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submit}>
      <View style={styles.container}>
        <Header title="Войти" />

        <AuthInput
          label="E-mail"
          placeholder="Введите e-mail"
          keyboardType="email-address"
          position="top"
          name="email"
          validate={validator(email)}
        />
        <AuthInput
          label="Пароль"
          placeholder="Введите пароль"
          secureTextEntry
          position="bottom"
          name="password"
          validate={validator(requir)}
        />

        <TouchableOpacity
          //@ts-ignore
          onPress={() => navigation.navigate('ResetPasswordEmail')}
          style={{alignSelf: 'flex-end'}}>
          <Body style={styles.resetPassword} color="rgba(47, 128, 237, 1)">
            Восстановить пароль
          </Body>
        </TouchableOpacity>

        {/*//@ts-ignore*/}
        <Button onPress={() => navigation.navigate('TabScreen')} text="ВОЙТИ" />

        <View style={styles.socialButtonsContainer}>
          <View style={styles.socialMediaButton}>
            <FacebookLogo />
          </View>

          <View style={[styles.socialMediaButton, {marginHorizontal: 9}]}>
            <GoogleLogo />
          </View>

          <View style={styles.socialMediaButton}>
            <AppleLogo />
          </View>
        </View>
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
  },
});
