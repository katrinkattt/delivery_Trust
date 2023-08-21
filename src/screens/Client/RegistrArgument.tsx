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

export default function ClientRegistrArgumet() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const disp = useDispatch();
  const {loading, email, role} = useAppSelector(getUser);

  const initialValues: ICreateUser = {
    full_name: '',
    region: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
  };
  const [error, setError] = useState('');

  const submit = (dataForm: ICreateUser) => {
    disp(setAddress({address: dataForm}));
    disp(setFullName({full_name: dataForm.full_name}));

    //@ts-ignore
    navigation.navigate('TabScreen'); // удалить когда бек норм ответит

    const data = {
      ...dataForm,
      email: email || 'sixrosesg@gmail.com',
      user_type: 'Client',
    };
    dispatch(
      createUserAction({
        data,
        onSuccess: () => {
          //@ts-ignore
          navigation.navigate('TabScreen');
          console.log('success');
        },
        onError: async () => {
          setError('Ошибка сервера, попробуйте позже');
        },
      }),
    );
  };

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
              />

              <AuthInput
                name="region"
                label="Регион*"
                placeholder="Выберите свой регион"
                position="center"
              />
              <AuthInput
                name="city"
                label="Город*"
                placeholder="Выберите свой город"
                position="center"
              />
              <AuthInput
                name="street"
                label="Улица*"
                placeholder="Укажите вашу улицу"
                position="center"
              />
              <AuthInput
                name="house"
                label="Дом*"
                placeholder="Укажите номер вашего дома"
                position="center"
              />

              <AuthInput
                containerStyle={{borderBottomWidth: 1}}
                label="Квартира"
                placeholder="Укажите номер вашей квартиры"
                position="center"
                name="apartment"
              />

              {/* <CustomCheckbox
                label={`Подтверждаю корректность введенных${'\n'} данных`}
                style={{marginTop: 10}}
              /> */}

              {/* <PickerInp /> */}
              <Body size={12} color="#a22" style={{marginBottom: 90}}>
                {error}
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
