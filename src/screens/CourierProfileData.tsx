import React, {useState, useCallback} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
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
import axios from 'axios';
import {API_BASE_URL} from '../res/consts';
import {GOOGLE_API_KEY_A} from '../api/googleApi';
import {minLength, validator} from '../utils/validators';
import {colors} from '../theme/themes';
import {SCREEN_WIDTH} from '../res/consts';

export default function CourierProfileData() {
  const {loading, email, role} = useAppSelector(getUser);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const disp = useDispatch();
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [document, setDocument] = useState('');
  const [documentTwo, setDocumentTwo] = useState('');
  const [err, setErr] = useState('');
  // uri: '',
  // name: 'image.jpg', // Имя файла на сервере
  // type: 'image/jpeg', // MIME-тип файла
  const initialValues: ICreateUser = {
    full_name: '',
    // region: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
  };
  console.log('document', document);

  const handleDocumentSelection = useCallback(async n => {
    // const createdAt = new Date();
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
        mode: 'import',
        copyTo: 'documentDirectory',
      });
      let imgRegex = /image/g;
      console.log('FULL response', response);
      // let str = response?.type;
      // if (str?.match(imgRegex)) {
      const formData = new FormData();
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? response?.fileCopyUri
            : response?.fileCopyUri.replace('file://', ''),
        name: response?.name,
        type: response?.type,
      });
      axios
        .post(API_BASE_URL + '/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('response', response);

          if (response.status == 200) {
            const data = response.data;
            console.log('URL загруженного изображения: ${data.imageUrl}', data);

            if (n == 1) {
              setDocument(data.file_id);
            }
            if (n == 2) {
              setDocumentTwo(data.file_id);
            }
          } else {
            console.log('Ошибка при загрузке изображения: ${response.status}');
          }
        });
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const submit = async (dataForm: ICreateUser) => {
    if (document !== '' && documentTwo !== '') {
      if (err !== 'Определение адреса') {
        setErr('Определение адреса');
        const strAddress = `${dataForm?.city}+${dataForm?.street}+${dataForm?.house}`;
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
              user_type: 1,
              userType: 1,
              // file_id: {
              document_photo_1: document,
              document_photo_2: documentTwo,
              // },
            };
            dispatch(
              createUserAction({
                data,
                onSuccess: () => {
                  //@ts-ignore
                  navigation.navigate('SigningAnAgreement');
                },
                onError: async e => {
                  if (399 < e.status < 500) {
                    setError(e.data.message);
                  } else {
                    setError('Ошибка сервера, попробуйте позже');
                  }
                  console.log('createUserAction COURIER ERR::', e);
                },
              }),
            );
          }
        } else {
          setErr('Адрес не найден');
        }
      }
    } else {
      setErr('Загрузите документы');
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
              validate={validator(minLength(3))}
            />
            {/* <AuthInput
              name="region"
              label="Регион"
              placeholder="Выберите свой регион"
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
              containerStyle={{borderBottomWidth: 0}}
              label="Квартира"
              placeholder="Укажите номер вашей квартиры"
              position="center"
              name="apartment"
            />
            <Body size={14} color="#333">
              * Обязательные поля
            </Body>
            <TouchableOpacity onPress={() => handleDocumentSelection(1)}>
              <ImageInput
                containerStyle={{
                  borderTopWidth: 1,
                  backgroundColor:
                    document !== '' ? colors.lavender : colors.ligther,
                }}
                label="Разворот документа, удостоверяющего личность с фото"
                position="center"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDocumentSelection(2)}>
              <ImageInput
                containerStyle={{
                  backgroundColor:
                    documentTwo !== '' ? colors.lavender : colors.ligther,
                }}
                label="Второй разворот документа, удостоверяющего личность *"
                position="bottom"
              />
            </TouchableOpacity>
            <CustomCheckbox
              label={
                SCREEN_WIDTH > 385
                  ? `Подтверждаю корректность введенных${'\n'}данных`
                  : `Подтверждаю корректность ${'\n'}введенных данных`
              }
              style={{marginTop: 10}}
              onChange={() => setIsCorrect(!isCorrect)}
              val={isCorrect}
            />
            <Body size={12} color="#a22">
              {error}
            </Body>
            <Body size={14} color="#a22">
              {err}
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
