import React, {useCallback, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {s, vs} from 'react-native-size-matters';
import {Formik} from 'formik';
import SecondAuthInput from './common/SecondAutInput';
import AuthInput from './common/AuthInput';
import Button from './common/Button';
import {useNavigation} from '@react-navigation/native';
import Body from './common/Body';
import {colors} from '../theme/themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import InputTextMask from './common/InputTextMask';
import {EditData} from '../state/user/types';
import {minLength, tel, validator} from '../utils/validators';
import {FormButton} from './common/FormButton/FormButton';
import {useAppDispatch} from '../hooks/redux';
import {editData, loadUserData} from '../state/user/action';

export default function DataProfile() {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const [loadStatus, setLoadStatus] = useState('Заменить');
  const loading = user?.loading;
  const dispatch = useAppDispatch();
  const [showSuccessW, setShowSuccessW] = useState(false);

  const loadPassport = useCallback(async () => {
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
      setLoadStatus('Загружено');
      // axios
      //   .post(API_BASE_URL + '/upload', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   })
      //   .then(response => {
      //     console.log('response', response);

      //     if (response.status == 200) {
      //       const data = response.data;
      //       console.log('URL загруженного изображения: ${data.imageUrl}', data);

      //       if (n == 1) {
      //         setDocument(data.file_id);
      //       }
      //     } else {
      //       console.log('Ошибка при загрузке изображения: ${response.status}');
      //     }
      //   });
    } catch (err) {
      console.warn(err);
    }
  }, []);
  const initialValues: EditData = {
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '+7 999-**-**-**',
    city: user?.city || '',
    street: user?.street || '',
    house: user?.house || '',
    apartment: user?.apartment || '',
  };
  console.log('user?.phone', user?.phone);

  const submit = (data: EditData) => {
    if (
      data.full_name != user?.full_name ||
      data.city != user?.city ||
      data.street != user?.street ||
      data.house != user?.house ||
      data.apartment != user?.apartment
    ) {
      dispatch(
        editData({
          id: user.user_id,
          data: {...data},
          onSuccess: () => {
            console.log('SUCCESS EDIT');
            setShowSuccessW(true);
            setTimeout(() => {
              setShowSuccessW(false);
            }, 500);
            dispatch(
              loadUserData({
                user_id: user.user_id,
                onSuccess: () => {
                  console.log('good loadDataUser');
                },
                onError: async e => {
                  console.log('ERR loadDataUser', e);
                },
              }),
            );
          },
          onError: async e => {
            console.log('ERR EDIT', e);
          },
        }),
      );
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submit}>
      <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
        {showSuccessW && (
          <View style={styles.successWindow}>
            <Body size={17} color={colors.darkBlue} center>
              ✅ Изменениия успешно сохранены
            </Body>
          </View>
        )}
        <AuthInput
          label="Фамилия имя отчество*"
          placeholder={user?.full_name || ''}
          position="top"
          name="full_name"
        />
        <AuthInput
          label="E-mail*"
          placeholder={user?.email}
          position="center"
          name="email"
        />
        <InputTextMask
          label="Номер телефона*"
          placeholder={user?.phone || '+7 999-**-**-**'}
          keyboardType="phone-pad"
          position="center"
          name="phone"
          maxLength={16}
          mask="+[0] [000] [000]-[00]-[00]"
          validate={validator(tel)}
        />
        {/* <AuthInput
        label="Регион*"
        placeholder={user?.region || 'Московская область'}
        position="center"
      /> */}
        <AuthInput
          label="Город*"
          placeholder={user?.city || 'Москва'}
          position="center"
          name="city"
        />
        <AuthInput
          label="Улица*"
          placeholder={user?.street || 'Гоголя'}
          position="center"
          name="street"
        />
        <AuthInput
          label="Дом*"
          placeholder={user?.house || '1'}
          position="center"
          name="house"
        />
        <AuthInput
          label="Квартира*"
          placeholder={user?.apartment || ''}
          position={user.typeInUser ? 'bottom' : 'center'}
          name="apartment"
        />
        {!user.typeInUser && (
          <View>
            <SecondAuthInput
              label="Паспорт*"
              placeholder="Паспорт.jpeg"
              position="bottom"
            />
            <View style={{marginTop: -50, marginLeft: '70%'}}>
              <TouchableOpacity onPress={loadPassport}>
                <Body size={16} color={colors.lavender}>
                  {loadStatus}
                </Body>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{marginTop: 20, height: 100, flexDirection: 'row'}}>
          <View style={{width: '50%', paddingRight: 5}}>
            <Button onPress={() => {}} buttonType={1} text="ОТМЕНИТЬ" />
          </View>
          <View style={{width: '50%', paddingLeft: 5}}>
            <FormButton text="СОХРАНИТЬ" loading={loading} buttonType={2} />
          </View>
        </View>
      </ScrollView>
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
  successWindow: {
    position: 'absolute',
    marginTop: '40%',
    backgroundColor: '#fff',
    width: '70%',
    height: 50,
    zIndex: 3,
    alignSelf: 'center',
    padding: 8,
    paddingTop: 16,
    borderColor: colors.green,
    borderWidth: 2,
    borderRadius: 8,
  },
});
