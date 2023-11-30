import React, {useState, useEffect, useCallback} from 'react';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Text,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import notifee, {EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
import {EyeActive, OrderIcon, SearchIcon} from '../components/common/Svgs';
import {colors} from '../theme/themes';
import DropShadow from 'react-native-drop-shadow';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CourierRating from '../components/CourierRating';
import Body from '../components/common/Body';
import HomeSlider from '../components/HomeSlider';
import sliderData from '../api/SliderData';
import R from '../res';
import {useSelector} from 'react-redux';
import {getUser} from '../state/user/selectors';
import {IOrder} from '../state/orders/types';
import {useAppDispatch} from '../hooks/redux';
import {loadOrder} from '../state/orders/action';
import {loadChat} from '../state/chat/action';
import {editData, loadUserData} from '../state/user/action';
import { API_BASE_URL, DEFAULT_AVATAR } from '../res/consts';
const {width} = Dimensions.get('window');
const userImg = require('../assets/user.png');
const header = require('../assets/header.png');

export default function Home() {
  const dispatch = useAppDispatch();
  const [overallBalance, setOverallBalance] = useState(false);
  const [tips, setTips] = useState(false);
  const [fines, setFines] = useState(false);
  const [text, setText] = useState<string>('');
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const user = useSelector(getUser);
  const order = useSelector(state => state.order);
  const activeOrder = order.orders.filter((obj: IOrder) => obj.active);
  const orderCount = activeOrder.length;
  const [avatarURL, setAvatarURL] = useState(DEFAULT_AVATAR);


  async function handleChange(e: string) {
    setText(e);
  }
  // console.log('user?.role in Home', user?.role);
  // setTimeout(() => {
  //   if (user.role === 0) {
  //     //@ts-ignore
  //     navigation.navigate('ProfileType');
  //   }
  // }, 5000);
  const sendAvatar = (ava: string)=> {
    dispatch(
    editData({
      id: user.user_id,
      data: {avatar:ava},
      onSuccess: () => {
        
      },
      onError: async e => {
        console.log('ERR EDIT', e);
      },
    }),
  );
}
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
        mode: 'import',
        copyTo: 'documentDirectory',
      });
      console.log('FULL response', response);
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
            setTimeout(()=>sendAvatar(data?.file_url) , 500)
          } else {
            console.log('Ошибка при загрузке изображения: ${response.status}');
          }
        });
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useEffect(()=> {
    if( user?.avatar){
      setAvatarURL(user?.avatar)
    }
    else{
    setAvatarURL(DEFAULT_AVATAR)
    }
  },[])

  useEffect(() => {
    dispatch(
      loadOrder({
        link: `/courier/${user.id}`,
        onSuccess: () => {
          console.log('good loadOrders');
        },
        onError: async () => {
          console.log('ERR loadOrders');
        },
      }),
    );
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
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          //@ts-ignore
          navigation.navigate(R.routes.OREDERS);
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 100}}>
      <View style={{alignItems: 'center'}}>
        <FastImage source={header} style={styles.headerImage} />
        <View style={[styles.userBox, {top: 18 + safeAreaInsets.top}]}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> handleDocumentSelection()}>
                <FastImage source={{ uri:avatarURL}} style={styles.image} />
              </TouchableOpacity>
              <View style={{marginLeft: 14}}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#243757',
                    fontSize: 20,
                    fontWeight: '700',
                    width: 140,
                  }}>
                  {user?.full_name}
                </Text>
              </View>
            </View>

            <View style={{paddingLeft: 60, marginTop: -10}}>
              <TouchableOpacity
                onPress={() => setTips(!tips)}
                activeOpacity={0.7}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Body color="#243757" style={styles.title}>
                    Чаевые за сегодня
                  </Body>

                  <EyeActive width={11} height={8} />
                </View>

                {!tips ? (
                  <Body color="#243757" style={styles.priceOne}>
                    {user?.tea} ₽
                  </Body>
                ) : (
                  <Body
                    color="#243757"
                    style={[styles.priceOne, {fontSize: 10}]}>
                    ＊＊＊＊＊＊
                  </Body>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginLeft: 41, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => setOverallBalance(!overallBalance)}
              activeOpacity={0.7}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Body color="#243757" style={styles.title}>
                  Общий баланс
                </Body>
                <EyeActive width={11} height={8} />
              </View>

              {!overallBalance ? (
                <Body color="#243757" style={styles.priceTwo}>
                  {user?.ballance} ₽
                </Body>
              ) : (
                <Body color="#243757" style={[styles.priceTwo, {fontSize: 14}]}>
                  ＊＊＊＊＊＊
                </Body>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFines(!fines)}
              activeOpacity={0.7}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Body color="#243757" style={styles.title}>
                  Штрафы
                </Body>

                <EyeActive width={11} height={8} />
              </View>

              {!fines ? (
                <Body color="#243757" style={styles.priceOne}>
                  {user?.fines} ₽
                </Body>
              ) : (
                <Body color="#243757" style={[styles.priceOne, {fontSize: 10}]}>
                  ＊＊＊＊＊＊
                </Body>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{paddingHorizontal: 16, marginTop: -58}}>
        <DropShadow style={styles.orderBox}>
          <TouchableOpacity
            onPress={() => {
              console.log('click');

              //@ts-ignore
              // navigation.navigate(R.routes.OREDERS);
              navigation.navigate('Orders');
            }}>
            <View style={styles.orderBoxContainer}>
              <View>
                <Body color="#243757" style={styles.currentOrdersText}>
                  Текущие заказы
                </Body>
                <Body color="#A1ADBF" style={styles.openOrdersText}>
                  Открыть заказы
                </Body>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <OrderIcon width={24} height={24} color="#A0ACBE" />

                <Body color="#243757" style={styles.count}>
                  {orderCount || 0}
                </Body>
              </View>
            </View>
          </TouchableOpacity>
        </DropShadow>

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
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: 15}}
        style={{flexDirection: 'row', paddingLeft: 15, marginTop: 17}}>
        {sliderData.map(item => (
          <HomeSlider item={item} key={item.id} />
        ))}
      </ScrollView>

      <View style={{alignItems: 'center', marginTop: 26}}>
        <CourierRating />
      </View>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
  },
  userBox: {
    flexDirection: 'row',
    borderRadius: 10000,
    justifyContent: 'center',
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
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.24,
    shadowRadius: 40,
  },
  orderBoxContainer: {
    width: '100%',
    height: '73@vs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  currentOrdersText: {
    fontSize: 17,
    fontWeight: '600',
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
    marginTop: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FD',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E8E8F0',
    paddingLeft: 14,
    paddingHorizontal: 21,
    overflow: 'hidden',
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
  sliderIm: {
    width: 187,
    height: 189,
  },
  flat: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
