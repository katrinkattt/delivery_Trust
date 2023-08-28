import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import {AppleLogo, FacebookLogo, GoogleLogo} from '../components/common/Svgs';
import Body from '../components/common/Body';
import Button from '../components/common/Button';
import {useNavigation} from '@react-navigation/native';
import AuthInput from '../components/common/AuthInput';
import Header from '../components/Header';
import {requir, validator, email} from '../utils/validators';
import {ILogin} from '../types/data';
import R from '../res';
import {useDispatch} from 'react-redux';
import {loginAction, resetPassCodeAction} from '../state/user/action';
import useAppSelector from '../hooks/useAppSelector';
import {getUser} from '../state/user/selectors';
import {FormButton} from '../components/common/FormButton/FormButton';
import {setEmail} from '../state/user/slice';
import {useAppDispatch} from '../hooks/redux';

export default function Login() {
  const disp = useDispatch();
  const dispatch = useAppDispatch();
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {loading} = useAppSelector(getUser);
  const [error, setError] = useState('');
  const [emailRecov, setEmailRecov] = useState('');
  const [title, setTitle] = useState('Войти');
  const [recov, setRecov] = useState(false);
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (recov) {
      setTitle('Востановление пароля');
    } else {
      setTitle('Войти');
    }
  }, [recov]);

  const initialValues: ILogin = {
    email: '',
    password: '',
  };
  const submit = (data: ILogin) => {
    if (data.email) {
      setEmailRecov(data.email);
    } else {
      setError('Введите почту');
    }
    if (!recov) {
      dispatch(
        loginAction({
          data,
          onSuccess: () => {
            disp(setEmail({email: data.email}));
            !!user?.role
              ? //@ts-ignore
                navigation.navigate('ProfileType')
              : // @ts-ignore
                navigation.navigate('TabScreen');
          },
          onError: async e => {
            setError('Неверный логин или пароль');
            console.log('API_PATH_LOGIN', e);
          },
        }),
      );
    } else {
      dispatch(
        resetPassCodeAction({
          data: {email: data.email},
          onSuccess: () => {
            //@ts-ignore
            navigation.navigate(R.routes.CONFIRM_EMAIL, {
              data: {email: emailRecov},
            });
          },
          onError: async () => {
            setError('Укажите существующую почту');
          },
        }),
      );
    }
  };

  const recovery = () => {
    setRecov(true);
    setError('');
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submit}>
      <View style={styles.container}>
        <Header title={title} />

        <AuthInput
          label="E-mail"
          placeholder="Введите e-mail"
          keyboardType="email-address"
          position="top"
          name="email"
          validate={validator(email)}
        />
        {!recov && (
          <AuthInput
            label="Пароль"
            placeholder="Введите пароль"
            secureTextEntry
            position="bottom"
            name="password"
            validate={validator(requir)}
          />
        )}

        {recov ? (
          <TouchableOpacity
            onPress={() => setRecov(false)}
            style={{alignSelf: 'flex-end'}}>
            <Body style={styles.resetPassword} color="rgba(47, 128, 237, 1)">
              Отменить
            </Body>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={recovery} style={{alignSelf: 'flex-end'}}>
            <Body style={styles.resetPassword} color="rgba(47, 128, 237, 1)">
              Восстановить пароль
            </Body>
          </TouchableOpacity>
        )}
        <Body color="#a22">{error}</Body>
        <FormButton
          loading={loading}
          text={!recov ? 'ВОЙТИ' : 'ПОЛУЧИТЬ КОД'}
        />
        {!recov && (
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
        )}
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
