import React, { useState, useEffect, useCallback } from 'react';
import { ScaledSheet } from 'react-native-size-matters/extend';
import {
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
  Text,
  ScrollView, RefreshControl,
} from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import FastImage from 'react-native-fast-image';
import { FlagIcon, SearchIcon } from '../../components/common/Svgs';
import { colors } from '../../theme/themes';
import DropShadow from 'react-native-drop-shadow';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';
import CategoryData from '../../api/ClientHomeData';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
const userImg = require('../../assets/use.png');
const header = require('../../assets/head.png');
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { API_BASE_URL, DEFAULT_AVATAR } from '../../res/consts';
import Body from '../../components/common/Body';
import Button from '../../components/common/Button';
import HomeClientItems from '../../components/HomeClientItems';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getUser } from '../../state/user/selectors';
import R from '../../res';
import { useAppDispatch } from '../../hooks/redux';
import { loadCategory, loadTariffs, loadOrder } from '../../state/orders/action';
import { loadChat } from '../../state/chat/action';
import { IOrder } from '../../state/orders/types';
import { editData, loadUserData } from '../../state/user/action';
import { setNewOrderCategory } from '../../state/orders/slice';

const { width } = Dimensions.get('window');

export default interface IData {
  id?: number;
  title?: string;
}

export default function HomeClient() {
  const [tips, setTips] = useState(false);
  const [text, setText] = useState<string>('');
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const order = useSelector(state => state.order);
  const activeOrder = order.orders.filter((obj: IOrder) => obj.active);
  const lastOrder = activeOrder.length > 0 ? activeOrder.length - 1 : -1;

  const time = (activeOrder[lastOrder]?.typeTarif * 60) | 60;
  let curTime = (time - activeOrder[lastOrder]?.activeMinute) | 1;
  const progress = useSharedValue(curTime);
  const min = useSharedValue(0);
  const max = useSharedValue(time);
  const user = useSelector(getUser);
  const { loading } = user
  const ava = user?.avatar ? user.avatar : DEFAULT_AVATAR
  const [avatarURL, setAvatarURL] = useState(ava);

  const handleDocumentSelection = useCallback(async () => {
    // const createdAt = new Date();
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
        mode: 'import',
        copyTo: 'documentDirectory',
      });
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
            setAvatarURL(data?.file_url)
            setTimeout(() => sendAvatar(data?.file_url), 500)
          } else {
            console.log('Ошибка при загрузке изображения: ${response.status}');
          }
        });
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    if (user?.avatar) {
      console.log('user?.avatar>>>>>', user?.avatar);
      setAvatarURL(user?.avatar)
    }
    else {
      setAvatarURL(DEFAULT_AVATAR)
    }
  }, [loading])

  const sendAvatar = (ava: string) => {
    dispatch(
      editData({
        id: user.user_id,
        data: { avatar: ava },
        onSuccess: () => {

        },
        onError: async e => {
          console.log('ERR EDIT', e);
        },
      }),
    );
  }

  const pressNewOreder = () => {
    dispatch(
      loadCategory({
        onSuccess: () => {
          console.log('good loadCategory');
        },
        onError: async () => {
          console.log('ERR loadCategory');
        },
      }),
    );
    dispatch(
      loadTariffs({
        onSuccess: () => {
          console.log('good loadTariff');
        },
        onError: async () => {
          console.log('ERR loadTariff');
        },
      }),
    );
    dispatch(setNewOrderCategory({ category: '' }));
    // @ts-ignore
    navigation.navigate(R.routes.CLIENT_ORDER_PARAM);
  };

  useEffect(() => {
    dispatch(
      loadOrder({
        link: `/client/${user.id}`,
        onSuccess: () => {
          console.log('good loadOrders');
        },
        onError: async () => {
          console.log('ERR loadOrders');
        },
      }),
    );
    dispatch(
      loadCategory({
        onSuccess: () => {
          console.log('good loadCategory');
        },
        onError: async () => {
          console.log('ERR loadCategory');
        },
      }),
    );
    dispatch(
      loadUserData({
        user_id: user.user_id,
        onSuccess: () => {
          console.log('good loadDataUser');
          if (user?.avatar) {
            console.log('user?.avatar>>>>>', user?.avatar);
            setAvatarURL(user?.avatar)
          }
          else {
            setAvatarURL(DEFAULT_AVATAR)
          }
        },
        onError: async e => {
          console.log('ERR loadDataUser', e);
        },
      }),
    );
    dispatch(
      loadChat({
        id: user.user_id,
        onSuccess: () => {
          console.log('good loadChat');
        },
        onError: async e => {
          console.log('ERR loadChat', e);
        },
      }),
    );
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          //@ts-ignore
          navigation.navigate(R.routes.CLIENT_OREDERS);
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false)
  const reload = () => {
    dispatch(
      loadUserData({
        user_id: user.user_id,
        onSuccess: () => {
          console.log('good loadDataUser');
          setAvatarURL(user?.avatar)
          setRefreshing(false)
        },
        onError: async e => {
          console.log('ERR loadDataUser', e);
          setRefreshing(false)
        },
      }),
    );
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reload();
  }, []);

  async function handleChange(e: string) {
    setText(e);
  }

  return (
    <View><ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{ alignItems: 'center' }}>
        <FastImage source={header} style={styles.headerImage} />
        <View style={[styles.userBox, { top: 18 + safeAreaInsets.top }]}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => handleDocumentSelection()}>
                <FastImage source={{ uri: avatarURL }} style={styles.image} />
              </TouchableOpacity>
              <View style={{ marginLeft: 24 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: '700',
                    width: 140,
                  }}>
                  {user?.full_name}
                </Text>
              </View>
            </View>
            {/* <Button
              text="dvvf"
              onPress={() => navigation.navigate(R.routes.CLIENT_OREDERS)}
            /> */}
            <View style={{ marginLeft: 76, marginTop: -20 }}>
              <TouchableOpacity
                onPress={() => setTips(!tips)}
                activeOpacity={0.7}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Body color="white" style={styles.title}>
                    {user?.city}, {user?.street}, {user?.house}
                  </Body>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: -88 }}>
        <DropShadow style={styles.orderBox}>
          <View style={styles.orderBoxContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log('click');
                //@ts-ignore
                // navigation.navigate(R.routes.CLIENT_OREDERS);
                navigation.navigate('ClientOrderStack');
              }}>
              <View>
                <Body color="#243757" bold style={styles.currentOrdersText}>
                  {lastOrder + 1 ? 'Заказ в процессе!' : 'Еще нет заказов'}
                </Body>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Body color="#A1ADBF" style={styles.openOrdersText}>
                  Посмотреть детали
                </Body>
                <View style={{ position: 'absolute', right: 0, top: 8 }}>
                  <FlagIcon width={24} height={24} color="#A0ACBE" />
                </View>
              </View>

              <Slider
                style={styles.tabbar}
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                bubbleMaxWidth={3}
                bubbleWidth={0}
                disableTrackFollow
                bubbleTranslateY={3}
                disable
                sliderHeight={10}
                renderThumb={() => (
                  <View style={styles.dotCard}>
                    <View style={styles.dot} />
                  </View>
                )}
                theme={{
                  disableMinTrackTintColor: 'rgba(147, 122, 234, 1)',
                  maximumTrackTintColor: 'rgba(235, 235, 236, 1)',
                  minimumTrackTintColor: '#000',
                  cacheTrackTintColor: '#333',
                  bubbleBackgroundColor: '#666',
                }}
              />
            </TouchableOpacity>
          </View>
        </DropShadow>
      </View>
      <FlatList
        data={CategoryData}
        columnWrapperStyle={styles.flatColumn}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        //@ts-ignore
        renderItem={({ item }) => <HomeClientItems data={item} />}
        ListFooterComponent={() => <View style={{ paddingBottom: 300 }} />}
        ListHeaderComponent={() => (
          <View style={{ marginHorizontal: 20 }}>
            <Button
              buttonType={2}
              text="Новый заказ"
              style={styles.btn}
              onPress={pressNewOreder}
            />

            <View style={styles.inputBox}>
              <TouchableOpacity activeOpacity={0.8}>
                <SearchIcon width={22} height={22} />
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                onChangeText={handleChange}
                value={text}
                placeholder="Поиск по всему сервису"
                placeholderTextColor="#A1ADBF"
              />
            </View>

            <Body size={20} bold>
              Документы
            </Body>
            {/* <Button
              buttonType={2}
              text="заказ"
              style={styles.btn}
              onPress={NewOreder}
            /> */}
          </View>
        )}
      />
    </ScrollView>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
  },
  userBox: {
    flexDirection: 'row',
    borderRadius: 10000,
    // justifyContent: 'center',
    left: 25,
    position: 'absolute',
  },
  image: {
    width: 56,
    height: 56,
    marginTop: '20@vs',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.ligther
  },
  headerImage: {
    width: '100%',
    height: Platform.OS === 'ios' ? width * 0.63 : width * 0.6,
  },
  title: {
    fontSize: 12,
    marginRight: 5,
    lineHeight: 24,
    fontWeight: '400',
  },
  priceOne: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 14,
  },
  priceTwo: {
    fontSize: 25,
    lineHeight: 24,
    marginTop: 2,
    fontWeight: '600',
  },
  orderBox: {
    elevation: 8,
    shadowColor: '#5D60DF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 40,
    marginBottom: '10@vs',
  },
  orderBoxContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: '10@vs',
    paddingBottom: '35@vs',
  },
  currentOrdersText: {
    fontSize: 17,

    lineHeight: 20.83,
  },
  openOrdersText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.4,
    marginTop: 1,
  },
  count: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  inputBox: {
    width: '100%',
    height: 52,
    marginTop: '0@vs',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FD',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E8E8F0',
    paddingLeft: 14,
    paddingHorizontal: 21,
    overflow: 'hidden',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    fontSize: 15,
    backgroundColor: '#F7F9FD',
    color: '#424242',
    paddingLeft: 11,
    paddingRight: 15,
  },
  searchText: {
    fontWeight: '400',
    fontSize: 15,
    color: '#5B5B5B',
  },
  slider: {
    width: 187,
    height: 189,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 21,
  },
  freeCourseText: {
    fontSize: 11,
    fontWeight: '500',
  },
  freeCourseDescription: {
    fontSize: 15.5,
    fontWeight: '600',
    marginTop: 2,
  },
  sliderButton: {
    borderWidth: 1,
    flex: 1,

    width: width,
    position: 'absolute',
    bottom: 20,
    transform: [{ scaleX: 1 }, { scaleY: 5 }],
    borderRadius: '40@s',
  },
  tabbar: {
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 100,
  },
  dotCard: {
    backgroundColor: 'rgba(100, 129, 220, 1)',
    borderRadius: '100@s',
  },
  dot: {
    backgroundColor: 'white',
    borderRadius: '100@s',
    margin: '5@s',
    padding: '4@s',
  },
  btn: {
    marginTop: '10@vs',
  },
  flatColumn: {
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  flatContent: {
    // marginTop: '10@s',
    // marginBottom: '100@s',
    // paddingBottom: '30@vs',
    paddingHorizontal: '15@s',
    // backgroundColor: 'red',
    paddingVertical: 10,
  },

  card: {
    height: '100%',
    // backgroundColor: 'red',
    padding: '20@s',
    marginTop: '5@s',
    marginBottom: '20@s',
    marginVertical: '50@vs',
  },

  //
});
