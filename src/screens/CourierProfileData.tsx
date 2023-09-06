import React, {useState, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Button from '../components/common/Button';
import {useNavigation} from '@react-navigation/native';
import AuthInput from '../components/common/AuthInput';
import Header from '../components/Header';
import AuthSelect from '../components/common/AuthSelect';
import ImageInput from '../components/common/ImageInput';
import CustomCheckbox from '../components/common/CustomCheckbox';
import {Formik} from 'formik';
import {ICreateUser} from '../types/data';
import {FormButton} from '../components/common/FormButton/FormButton';
import useAppSelector from '../hooks/useAppSelector';
import {getUser} from '../state/user/selectors';
import DocumentPicker from 'react-native-document-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppDispatch} from '../hooks/redux';
import {createUserAction} from '../state/user/action';
import Body from '../components/common/Body';
import {useDispatch} from 'react-redux';
import {setAddress, setFullName} from '../state/user/slice';

export default function CourierProfileData() {
  const {loading, email, role} = useAppSelector(getUser);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const disp = useDispatch();
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [document, setDocument] = useState({});
  const [documentTwo, setDocumentTwo] = useState({});
  // uri: '',
  // name: 'image.jpg', // Имя файла на сервере
  // type: 'image/jpeg', // MIME-тип файла
  const initialValues: ICreateUser = {
    full_name: '',
    region: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
  };

  const handleDocumentSelection = useCallback(async num => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      if (num === 1) {
        setDocument(response);
      } else {
        setDocumentTwo(response);
        // [{"fileCopyUri": null,
        //  "name": "Снимок экрана 2023-08-21 в 13.36.43.png",
        //   "size": 1126539,
        //   "type": "image/png",
        //   "uri": "content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-08-21%20%D0%B2%2013.36.43.png"
        // }]
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);
  const submit = (dataForm: ICreateUser) => {
    if (isCorrect) {
      disp(setAddress({address: dataForm}));
      disp(setFullName({full_name: dataForm.full_name}));

      const data = {
        ...dataForm,
        email: email || 'sixrosesg@gmail.com',
        user_type: 1,
        userType: 1,
        file: document,
      };
      // console.log('submit data::::', data);
      dispatch(
        createUserAction({
          data,
          onSuccess: () => {
            //@ts-ignore
            navigation.navigate('SigningAnAgreement');
            // navigation.navigate('TabScreen');
          },
          onError: async () => {
            setError('Ошибка сервера, попробуйте позже');
          },
        }),
      );
    } else {
      setError('Заполните корректно все поля');
    }
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {() => (
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
              containerStyle={{borderBottomWidth: 0}}
              label="Квартира"
              placeholder="Укажите номер вашей квартиры"
              position="center"
              name="apartment"
            />
            <TouchableOpacity onPress={() => handleDocumentSelection(1)}>
              <ImageInput
                containerStyle={{borderTopWidth: 1}}
                label="Разворот документа, удостоверяющего личность с фото"
                position="center"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDocumentSelection(2)}>
              <ImageInput
                label="Второй разворот документа, удостоверяющего личность *"
                position="bottom"
              />
            </TouchableOpacity>
            <CustomCheckbox
              label={`Подтверждаю корректность введенных${'\n'} данных`}
              style={{marginTop: 10}}
              onChange={() => setIsCorrect(!isCorrect)}
              val={isCorrect}
            />
            <Body size={12} color="#a22">
              {error}
            </Body>
            <View style={{marginVertical: 15}}>
              <FormButton
                //@ts-ignore
                onPress={loading}
                text="Отправить данные на проверку"
              />
            </View>
          </ScrollView>
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
