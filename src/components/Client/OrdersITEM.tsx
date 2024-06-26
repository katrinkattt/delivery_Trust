import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Body from '../common/Body';
import {Flag} from '.././common/Svgs';
import {useNavigation} from '@react-navigation/native';
import R from '../../res';
import {IOrder} from '../../state/orders/types';
import SoatIcon from '../../assets/icons/SoatIcom';
import {Space} from '../common/Space';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import ApplyIcon from '../../assets/icons/ApplyIcon';
import CanceledIcon from '../../assets/icons/CanceledIcon';

interface IProps {
  item: IOrder;
}

export default function OrdersITEM({item}: IProps) {
  const time = (item?.typeTarif * 60) | 60;
  let curTime = (time - item?.activeMinute) | 1;
  const progress = useSharedValue(curTime);
  const min = useSharedValue(0);
  const max = useSharedValue(time);
  const navigation = useNavigation();

  const goToDetailOrder = () => {
    // if (item.payment == 1) {
      //@ts-ignore
      navigation.navigate(R.routes.ORDER_DETAIL_MAP, {item: item, user: true});
    // }
  };

  return (
    <TouchableOpacity
      style={item.active ? styles.container : styles.containerTwo}
      activeOpacity={0.7}
      onPress={goToDetailOrder}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.active && item.payment == 1 ? (
            <SoatIcon />
          ) : item.complete && item.payment == 1 ? (
            <ApplyIcon />
          ) : (
            <CanceledIcon />
          )}

          <Space width={10} />
          <Body semiBold size={20}>
            {item.category}
          </Body>
        </View>

        <Body semiBold size={17}>
          {item.price} ₽
        </Body>
      </View>
      <Space height={5} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Body>{item?.createdAt}</Body>
        <Body color={item.complete || item.active ? '#888' : '#d55'} size={14}>
          {item.active && item.payment == 1
            ? 'В доставке'
            : item.complete && item.payment == 1
            ? 'Доставлен'
            : 'Отменен'}
        </Body>
      </View>

      {item.active ? (
        <View>
          <Space height={18} />
          <Body center semiBold>
            {item.activeMinute < 90
              ? `Еще ${item.activeMinute} минут`
              : `Еще ${item.activeMinute / 60} ${
                  item?.activeMinute / 60 > 4 ? 'часов' : 'часа'
                }`}
          </Body>
          <Space height={3} />
          <View>
            <TouchableOpacity>
              <Body light size={12} center>
                {item.payment == 1 ? 'Посмотреть детали' : 'Заказ не оплачен'}
              </Body>
            </TouchableOpacity>

            <View style={{position: 'absolute', right: 0, bottom: 15}}>
              <Flag />
            </View>

            <Slider
              style={styles.tabbar}
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              bubbleMaxWidth={6}
              bubbleWidth={0}
              disableTrackFollow
              bubbleTranslateY={3}
              disable
              sliderHeight={7}
              renderThumb={() => (
                <View style={styles.dotCard}>
                  <View style={styles.dot} />
                </View>
              )}
              theme={{
                disableMinTrackTintColor: 'rgba(147, 122, 234, 1)',
                maximumTrackTintColor: 'white',
                minimumTrackTintColor: 'red',
                cacheTrackTintColor: 'red',
                bubbleBackgroundColor: '#666',
              }}
            />
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    backgroundColor: '#DCE8FF',
    borderRadius: 5,
    paddingTop: 12,
    paddingBottom: 20,
  },
  containerTwo: {
    marginTop: 18,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    backgroundColor: '#F7F9FD',
    borderRadius: 5,
    paddingTop: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabbar: {
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 100,
  },
  dotCard: {
    backgroundColor: 'rgba(100, 129, 220, 1)',
    borderRadius: 100,
  },
  dot: {
    backgroundColor: 'white',
    borderRadius: 100,
    margin: 4,
    padding: 3,
  },
  // box: {
  //     height: 28,
  //     paddingHorizontal: 12,
  //     justifyContent: 'center',
  //     borderRadius: 24,
  //     marginRight: 8,
  // },
  // text: {
  //     fontSize: 14,
  //     letterSpacing: -0.32,
  // },
  // cardOneBox: {
  //     width: '100%',
  //     height: 75,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     borderRadius: 5,
  //     backgroundColor: '#dce8ff',
  //     paddingLeft: 22,
  //     marginTop: 10,
  // },
  // cardTitle: {
  //     fontSize: 20,
  //     fontWeight: '600',
  //     lineHeight: 24,
  // },
  // cardOneDescription: {
  //     fontSize: 12,
  //     fontWeight: '400',
  //     lineHeight: 24,
  // },
  // clock: {
  //     marginTop: 7,
  //     fontSize: 17,
  //     fontWeight: '600',
  //     lineHeight: 20.83,
  // },
  // cardRightBox: {
  //     width: 84,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#CEDEFF',
  //     borderRadius: 5,
  // },
  // cardTwoBox: {
  //     width: '100%',
  //     height: 75,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     borderRadius: 5,
  //     backgroundColor: '#F5F5F5',
  //     paddingLeft: 22,
  //     marginTop: 10,
  //     borderWidth: 1,
  //     borderColor: '#E8E8F0',
  // },
  // price: {
  //     fontSize: 17,
  //     fontWeight: '600',
  //     lineHeight: 20.83,
  //     textAlign: 'right',
  // },
  // deliveredText: {
  //     fontSize: 12,
  //     fontWeight: '400',
  //     lineHeight: 24,
  // },
});
