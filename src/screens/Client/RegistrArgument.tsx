import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Button from '../../components/common/Button';
import {useNavigation} from '@react-navigation/native';
import AuthInput from '../../components/common/AuthInput';
import Header from '../../components/Header';
import AuthSelect from '../../components/common/AuthSelect';
import CustomCheckbox from '../../components/common/CustomCheckbox';
import {Formik} from 'formik';
import {ICreateUser, IClientDateRes} from '../../types/data';
import {FormButton} from '../../components/common/FormButton/FormButton';
import {useAppDispatch} from '../../hooks/redux';
import {createUserAction} from '../../state/user/action';
import Body from '../../components/common/Body';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../hooks/redux';
import {getUser} from '../../state/user/selectors';
import {setAddress, setFullName} from '../../state/user/slice';
import axios from 'axios';
import {GOOGLE_API_KEY_A} from '../../api/googleApi';
import {minLength, validator} from '../../utils/validators';

export default function ClientRegistrArgumet() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const disp = useDispatch();
  const {loading, email, role} = useAppSelector(getUser);
  const [err, setErr] = useState('');

  const initialValues: ICreateUser = {
    full_name: '',
    region: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
  };
  const [error, setError] = useState('');

  const submit = async (dataForm: ICreateUser) => {
    console.log('SUBMIT');

    if (err !== 'Определение адреса') {
      setErr('Определение адреса');
      const strAddress = `${dataForm?.city}+${dataForm?.street}+${dataForm?.house}`;
      console.log('strAddress', strAddress);

      const {
        data: {results},
      } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${strAddress}&language=ru&key=${GOOGLE_API_KEY_A}`,
      );
      if (results[0]?.geometry.location) {
        const send = {
          coord: {
            latitude: results[0]?.geometry.location.lat,
            longitude: results[0]?.geometry.location.lng,
          },
        };

        if (send.coord.latitude && send.coord.longitude) {
          setErr('');
          disp(setAddress({address: dataForm}));
          disp(setFullName({full_name: dataForm.full_name}));
          const data = {
            ...dataForm,
            email: email || 'sixrosesg@gmail.com',
            user_type: 2,
            userType: 2,
          };
          dispatch(
            createUserAction({
              data,
              onSuccess: () => {
                //@ts-ignore
                navigation.navigate('TabScreen');
              },
              onError: async e => {
                if (399 < e.status < 500) {
                  setError(e.data.message);
                } else {
                  setError('Ошибка сервера, попробуйте позже');
                }
                console.log('createUserAction CLIENT ERR::', e);
              },
            }),
          );
        }
      } else {
        setErr('Адрес не найден');
      }
    }
  };
  // const submit = (dataForm: ICreateUser) => {
  //   checkAddress(dataForm);
  // };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {() => (
          <>
            <ScrollView>
              <Header title="Персональные данные" />
              <AuthInput
                name="full_name"
                label="Фамилия имя отчество*"
                placeholder="Введите фамилию имя отчество"
                position="top"
                validate={validator(minLength(3))}
              />
              {/* <AuthInput
                name="region"
                label="Регион"
                placeholder="Укажите ваш регион"
                position="center"
              /> */}
              <AuthInput
                name="city"
                label="Город*"
                placeholder="Укажите ваш город"
                position="center"
                validate={validator(minLength(3))}
              />
              <AuthInput
                name="street"
                label="Улица*"
                placeholder="Укажите вашу улицу"
                position="center"
                validate={validator(minLength(3))}
              />
              <AuthInput
                name="house"
                label="Дом*"
                placeholder="Укажите номер вашего дома"
                position="center"
                validate={validator(minLength(1))}
              />

              <AuthInput
                containerStyle={{borderBottomWidth: 1}}
                label="Квартира"
                placeholder="Укажите номер вашей квартиры"
                position="center"
                name="apartment"
              />
              <Body size={14} color="#333">
                * Обязательные поля
              </Body>
              {/* <CustomCheckbox
                label={`Подтверждаю корректность введенных${'\n'} данных`}
                style={{marginTop: 10}}
              /> */}

              {/* <PickerInp /> */}
              <Body size={12} color="#a22" style={{marginBottom: 90}}>
                {error}
              </Body>
              <Body size={14} color="#222">
                {err}
              </Body>
              <FormButton
                containerStyle={{marginVetrical: 15}}
                //@ts-ignore
                onPress={loading}
                text="ЗАРЕГИСТРИРОВАТЬСЯ"
              />
            </ScrollView>
            {/* <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 15,
                left: 15,
              }}> */}

            {/* </View> */}
          </>
        )}
      </Formik>
    </View>
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
