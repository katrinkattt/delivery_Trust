import React, {useCallback, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {s, vs} from 'react-native-size-matters';
import SecondAuthInput from './common/SecondAutInput';
import Button from './common/Button';
import {useNavigation} from '@react-navigation/native';
import Body from './common/Body';
import {colors} from '../theme/themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';

export default function DataProfile() {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const [loadStatus, setLoadStatus] = useState('Заменить');
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
  return (
    <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
      <SecondAuthInput
        label="Фамилия имя отчество*"
        placeholder={user?.full_name || ''}
        position="top"
      />
      <SecondAuthInput
        label="E-mail*"
        placeholder={user?.email}
        position="center"
      />
      <SecondAuthInput
        label="Номер телефона*"
        placeholder={user?.phone || '+7 932-32-32-14'}
        position="center"
      />
      <SecondAuthInput
        label="Регион*"
        placeholder={user?.region || 'Московская область'}
        position="center"
      />
      <SecondAuthInput
        label="Город*"
        placeholder={user?.city || 'Москва'}
        position="center"
      />
      <SecondAuthInput
        label="Улица*"
        placeholder={user?.street || 'Гоголя'}
        position="center"
      />
      <SecondAuthInput
        label="Дом*"
        placeholder={user?.house || '16'}
        position="center"
      />
      <SecondAuthInput
        label="Квартира*"
        placeholder={user?.apartment || ''}
        position={user.typeInUser ? 'bottom' : 'center'}
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
      <View style={{marginTop: 20, height: 100}}>
        {/* <Body size={12} color="#000">
          временнное решение для проверки функционала ссылается на стр роли и тд
        </Body>
        <Button
          text="РЕДАКТИРОВАТЬ"
          onPress={() => {
            user?.typeInUser
              ? //@ts-ignore 'ClientRegistrArgumet'
                navigation.navigate('ClientRegistrArgumet')
              : //@ts-ignore
                navigation.navigate('CourierProfileData');
          }}
        /> */}
      </View>
    </ScrollView>
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
});
