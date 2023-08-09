import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Body from '../components/common/Body';
import BackButton from '../components/common/BackButton';
import {
  FlagIcon,
  MessageIcon,
  MoreIcon,
  OrderIconActive,
  PhoneIcon,
  Flag,
} from '../components/common/Svgs';
import {colors} from '../theme/themes';
import Button from '../components/common/Button';
import {OrderMap} from '../components/OrderMap';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import {ICategoryDataType} from '../api/OrdersData';
import {ModalCustom} from '../components/ModalCustom';

interface IProps {
  route: {
    params: {
      item: ICategoryDataType;
    };
  };
}
export default function OrderDetail({route}: IProps) {
  const {item} = route.params;
  const safeAreaInsets = useSafeAreaInsets();
  const [order, setOrder] = useState(false);
  const time = (item?.typeTarif * 60) | 60;
  let curTime = (time - item?.activeMinute) | 1;
  const progress = useSharedValue(curTime);
  const min = useSharedValue(0);
  const max = useSharedValue(time);
  const [isOpenDot, setIsOpenDot] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, {marginTop: safeAreaInsets.top + 23}]}>
      <ModalCustom modalVisible={modalVisible}>
        <View style={{width: 250}}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{alignItems: 'flex-end'}}>
            <Text
              style={{
                marginTop: -20,
                color: colors.lavender,
                fontSize: 26,
              }}>
              ×
            </Text>
          </TouchableOpacity>

          <Body color="#243757" bold style={{marginBottom: 20}}>
            Вы уверены, что хотите отменить доставку?
          </Body>
          <Button
            onPress={() => {}} //link to next
            buttonType={1}
            text="ОТМЕНИТЬ"
          />
        </View>
      </ModalCustom>

      <View style={styles.header}>
        <BackButton />

        <View style={{marginLeft: 17, width: 210}}>
          <Body color="#243757" style={styles.title}>
            {item?.category}
          </Body>

          <Body color="#243757" style={styles.description}>
            Заказ SEAD: {item?.id}
          </Body>

          <View style={styles.priceBox}>
            <Body color="#243757" style={styles.priceText}>
              {item?.price} ₽
            </Body>
          </View>
        </View>

        <TouchableOpacity style={{marginTop: 7}} activeOpacity={0.7}>
          <MessageIcon width={28} height={28} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginLeft: 14, marginTop: 7}}
          activeOpacity={0.7}>
          <PhoneIcon width={27} height={27} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginLeft: 14, marginTop: 7}}
          onPress={() => setIsOpenDot(!isOpenDot)}
          activeOpacity={0.7}>
          <MoreIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
      {isOpenDot && (
        <View style={styles.dotMenu}>
          <TouchableOpacity
            style={[
              styles.dotMenuItem,
              {backgroundColor: colors.white, borderColor: colors.ligthBorder},
            ]}>
            <Body center>Изменить адрес</Body>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[
              styles.dotMenuItem,
              {
                backgroundColor: 'rgba(255, 239, 238, 1)',
                borderColor: 'rgba(255, 177, 170, 1)',
                marginTop: 0,
              },
            ]}>
            <Body center>Отменить доставку</Body>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 130}}>
        {item?.completle || item.active ? (
          <View style={{marginBottom: 20}}>
            <Body center bold semiBold>
              {item?.activeMinute
                ? 'Еще ' + item?.activeMinute + ' минут'
                : 'Заказ доставлен'}
            </Body>
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
        ) : (
          <View style={{marginBottom: 20}}>
            <Body center bold semiBold>
              Заказ отменен
            </Body>
          </View>
        )}
        <OrderMap item={item} />

        <View style={styles.orderDetailBox}>
          {!order && (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <OrderIconActive width={25} height={25} />

                <Body
                  color="#243757"
                  style={[styles.orderDetailText, {marginLeft: 14}]}>
                  Забрать посылку
                </Body>
              </View>

              <Body
                color="rgba(0, 0, 0, 0.36)"
                style={styles.orderDetailDescription}>
                Антонов Власий Борисович
              </Body>

              <Body
                color="#243757"
                style={[styles.orderDetailText, {marginTop: 3}]}>
                Москва, Малая Юшуньская улица, 1к1
              </Body>
            </View>
          )}
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <View style={!order ? {marginTop: 30} : {marginTop: 9}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <OrderIconActive width={25} height={25} />
                <Body
                  color="#243757"
                  style={[styles.orderDetailText, {marginLeft: 14}]}>
                  Доставить посылку
                </Body>
              </View>

              <Body
                color="rgba(0, 0, 0, 0.36)"
                style={styles.orderDetailDescription}>
                Орехов Вадим Агафонович
              </Body>

              <Body
                color="#243757"
                style={[styles.orderDetailText, {marginTop: 3}]}>
                Москва, Малая Юшуньская улица, 15к1
              </Body>
            </View>

            {order && (
              <View style={{marginBottom: 30}}>
                <FlagIcon width={20} height={20} />
              </View>
            )}
          </View>
        </View>

        <View style={{marginTop: 16}}>
          <Button
            onPress={() => setOrder(false)}
            buttonType={1}
            text={
              item.active
                ? 'ПОДТВЕРДИТЬ ДОСТАВКУ'
                : item?.completle
                ? 'ЗАБРАЛ ПОСЫЛКУ'
                : 'ЗАКАЗ ОТМЕНЕН'
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = ScaledSheet.create({
  map: {height: 300, width: 300},
  container: {
    marginHorizontal: 15,
  },
  header: {
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 23,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
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
    margin: '4@s',
    padding: '3@s',
  },
  dotMenu: {
    height: 130,
    width: 200,
    backgroundColor: colors.ligther,
    borderColor: colors.ligthBorder,
    borderRadius: 5,
    borderWidth: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 35,
    zIndex: 3,
  },
  dotMenuItem: {
    paddingVertical: 12,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  priceBox: {
    maxWidth: 85,
    height: 27,
    backgroundColor: '#D1EA7A',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 13,
    marginHorizontal: 8,
    fontWeight: '600',
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '400',
  },
  time: {
    fontSize: 17,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 309,
    borderRadius: 10,
    marginTop: 12,
  },
  orderDetailBox: {
    width: '100%',
    backgroundColor: '#F7F9FD',
    marginTop: 16,
    paddingTop: 20,
    paddingLeft: 33,
    paddingBottom: 24,
  },
  orderDetailText: {
    fontSize: 16,
    fontWeight: '600',
    width: 239,
  },
  orderDetailDescription: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 7,
  },
  buttonShadow: {
    shadowColor: '#243757',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 19,
    elevation: 5,
  },
  button: {
    width: '100%',
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#243757',
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
