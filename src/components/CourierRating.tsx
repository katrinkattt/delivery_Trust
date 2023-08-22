import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ArrowBottom, ArrowTop, Minus} from './common/Svgs';
import {colors} from '../theme/themes';
import Body from './common/Body';
import {useNavigation} from '@react-navigation/native';
import R from '../res';
import {useAppDispatch} from '../hooks/redux';
import {loadRating} from '../state/rating/action';
import {RatingItem} from '../state/rating/types';

export interface IRatingCourier {
  name: string;
  rating: number;
  orderCount: number;
  dinamic: number;
}
export interface ICourierRating {
  full?: boolean;
}

export default function CourierRating({full}: ICourierRating) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const rating = useSelector(state => state.rating);
  const ratingA = rating?.raiting;
  console.log('RATING.RATING', ratingA);
  const ratingArr = full ? ratingA : ratingA.slice(0, 3);

  const showAllRating = () => {
    //@ts-ignore
    navigation.navigate(R.routes.RATING_COURIER);
  };
  const getRating = () => {
    dispatch(
      loadRating({
        onSuccess: () => {
          console.log('good');
        },
        onError: async () => {
          console.log('ERR');
        },
      }),
    );
  };
  useEffect(() => {
    getRating();
  }, []);
  return (
    <>
      {!full && (
        <Body color="#243757" style={styles.courierRatingText}>
          Рейтинг курьеров
        </Body>
      )}

      <View style={{paddingHorizontal: 15, width: '100%'}}>
        <View style={styles.ratingBox}>
          {rating?.raiting.length < 1 ? (
            <TouchableOpacity onPress={getRating}>
              <Body color={colors.blue} size={20} style={{paddingLeft: 20}}>
                Загрузить
              </Body>
            </TouchableOpacity>
          ) : (
            ratingArr.map((courier: RatingItem, i: number) => (
              <View
                style={[
                  styles.tableBox,
                  i % 2 == 0 ? {borderRadius: 5} : {backgroundColor: '#DCE8FF'},
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <Body color="#243757" style={styles.tableNumber}>
                    {courier.orderCount}
                  </Body>

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 40}]}>
                    {courier.name}
                  </Body>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {courier.dynamic == 1 ? (
                    <ArrowTop width={13} height={12} />
                  ) : courier.dynamic == -1 ? (
                    <ArrowBottom width={13} height={12} />
                  ) : (
                    <Minus width={13} height={3} />
                  )}

                  <Body color="#243757" style={[styles.tableName, {width: 38}]}>
                    {courier.rating}
                  </Body>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
      {!full && (
        <TouchableOpacity activeOpacity={0.7} onPress={showAllRating}>
          <Body color={colors.blue} style={styles.linkText}>
            Открыть полный рейтинг
          </Body>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  courierRatingText: {
    fontSize: 20,
    fontWeight: '600',
  },
  ratingBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8E8F0',
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#f8f9fd',
    marginTop: 16,
  },
  tableBox: {
    height: 26,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableNumber: {
    fontSize: 16,
    fontWeight: '400',
  },
  tableName: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 10,
  },
  linkText: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 12,
  },
});
