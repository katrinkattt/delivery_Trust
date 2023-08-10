import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ArrowBottom, ArrowTop, Minus} from './common/Svgs';
import {colors} from '../theme/themes';
import Body from './common/Body';

export interface IRatingCourier {
  name: string;
  rating: number;
  orderCount: number;
  dinamic: number;
}
const ratingArr = [
  {name: 'Аркадий Ф.', rating: 85, orderCount: 566, dinamic: -1},
  {name: 'Дмитрий П.', rating: 80, orderCount: 86, dinamic: +1},
  {name: 'Игорь В.', rating: 83, orderCount: 231, dinamic: 0},
  {name: 'Александр Ф.', rating: 70, orderCount: 344, dinamic: 1},
  {name: 'Владимир А.', rating: 60, orderCount: 127, dinamic: -1},
  {name: 'Иван С.', rating: 50, orderCount: 364, dinamic: 1},
  {name: 'Саша А.', rating: 90, orderCount: 302, dinamic: 0},
  {name: 'Аркадий Ф.', rating: 40, orderCount: 291, dinamic: -1},
  {name: 'Дмитрий П.', rating: 70, orderCount: 176, dinamic: 1},
  {name: 'Игорь В.', rating: 80, orderCount: 311, dinamic: 0},
  {name: 'Александр Ф.', rating: 80, orderCount: 199, dinamic: -1},
  {name: 'Владимир А.', rating: 84, orderCount: 132, dinamic: 1},
  {name: 'Иван С.', rating: 84, orderCount: 317, dinamic: 0},
  {name: 'Саша А.', rating: 84, orderCount: 164, dinamic: -1},
  {name: 'Аркадий Ф.', rating: 84, orderCount: 281, dinamic: 1},
  {name: 'Дмитрий П.', rating: 90, orderCount: 224, dinamic: 0},
  {name: 'Игорь В.', rating: 84, orderCount: 389, dinamic: -1},
  {name: 'Александр Ф.', rating: 80, orderCount: 275, dinamic: 1},
  {name: 'Владимир А.', rating: 84, orderCount: 236, dinamic: 0},
  {name: 'Иван С.', rating: 80, orderCount: 190, dinamic: -1},
  {name: 'Саша А.', rating: 80, orderCount: 201, dinamic: 1},
  {name: 'Аркадий Ф.', rating: 84, orderCount: 222, dinamic: 0},
  {name: 'Дмитрий П.', rating: 84, orderCount: 72, dinamic: -1},
  {name: 'Игорь В.', rating: 84, orderCount: 311, dinamic: 1},
  {name: 'Александр Ф.', rating: 84, orderCount: 102, dinamic: 0},
  {name: 'Владимир А.', rating: 84, orderCount: 245, dinamic: -1},
  {name: 'Иван С.', rating: 84, orderCount: 372, dinamic: 1},
  {name: 'Саша А.', rating: 84, orderCount: 396, dinamic: 0},
  {name: 'Аркадий Ф.', rating: 84, orderCount: 231, dinamic: -1},
  {name: 'Дмитрий П.', rating: 84, orderCount: 299, dinamic: 1},
  {name: 'Игорь В.', rating: 84, orderCount: 197, dinamic: 0},
];
export default function CourierRating() {
  const [chek, setChek] = useState(false);

  const showAllRating = () => {
    setChek(!chek);
  };

  return (
    <>
      <Body color="#243757" style={styles.courierRatingText}>
        Рейтинг курьеров
      </Body>

      <View style={{paddingHorizontal: 15, width: '100%'}}>
        <View style={styles.ratingBox}>
          <View style={[styles.tableBox, {borderRadius: 5}]}>
            {/* {ratingArr.map((courier: IRatingCourier) => (

            ))} */}
            <View style={{flexDirection: 'row'}}>
              <Body color="#243757" style={styles.tableNumber}>
                566
              </Body>

              <Body
                color="#243757"
                style={[styles.tableName, {marginLeft: 40}]}>
                Аркадий Ф.
              </Body>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ArrowBottom width={13} height={12} />

              <Body
                color="#243757"
                style={[styles.tableName, {marginLeft: 13}]}>
                85
              </Body>
            </View>
          </View>

          <View style={[styles.tableBox, {backgroundColor: '#DCE8FF'}]}>
            <View style={{flexDirection: 'row'}}>
              <Body color="#243757" style={styles.tableNumber}>
                567
              </Body>

              <Body
                color="#243757"
                style={[styles.tableName, {marginLeft: 40}]}>
                Игорь Г.
              </Body>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ArrowTop width={13} height={12} />

              <Body
                color="#243757"
                style={[styles.tableName, {marginLeft: 13}]}>
                83
              </Body>
            </View>
          </View>

          <View style={styles.tableBox}>
            <View style={{flexDirection: 'row'}}>
              <Body color="#243757" style={styles.tableNumber}>
                568
              </Body>

              <Body
                color="#243757"
                style={[styles.tableName, {marginLeft: 40}]}>
                Дмитрий П.
              </Body>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Minus width={13} height={3} />

              <Body
                color="#243757"
                style={[styles.tableName, {marginLeft: 13}]}>
                80
              </Body>
            </View>
          </View>

          {chek ? (
            <>
              <View style={styles.tableBox}>
                <View style={{flexDirection: 'row'}}>
                  <Body color="#243757" style={styles.tableNumber}>
                    568
                  </Body>

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 40}]}>
                    Дмитрий П.
                  </Body>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Minus width={13} height={3} />

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 13}]}>
                    80
                  </Body>
                </View>
              </View>
              <View style={styles.tableBox}>
                <View style={{flexDirection: 'row'}}>
                  <Body color="#243757" style={styles.tableNumber}>
                    568
                  </Body>

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 40}]}>
                    Дмитрий П.
                  </Body>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Minus width={13} height={3} />

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 13}]}>
                    80
                  </Body>
                </View>
              </View>
              <View style={styles.tableBox}>
                <View style={{flexDirection: 'row'}}>
                  <Body color="#243757" style={styles.tableNumber}>
                    568
                  </Body>

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 40}]}>
                    Дмитрий П.
                  </Body>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Minus width={13} height={3} />

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 13}]}>
                    80
                  </Body>
                </View>
              </View>

              <View style={styles.tableBox}>
                <View style={{flexDirection: 'row'}}>
                  <Body color="#243757" style={styles.tableNumber}>
                    568
                  </Body>

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 40}]}>
                    Дмитрий П.
                  </Body>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Minus width={13} height={3} />

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 13}]}>
                    80
                  </Body>
                </View>
              </View>

              <View style={styles.tableBox}>
                <View style={{flexDirection: 'row'}}>
                  <Body color="#243757" style={styles.tableNumber}>
                    568
                  </Body>

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 40}]}>
                    Дмитрий П.
                  </Body>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Minus width={13} height={3} />

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 13}]}>
                    80
                  </Body>
                </View>
              </View>

              <View style={styles.tableBox}>
                <View style={{flexDirection: 'row'}}>
                  <Body color="#243757" style={styles.tableNumber}>
                    568
                  </Body>

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 40}]}>
                    Дмитрий П.
                  </Body>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Minus width={13} height={3} />

                  <Body
                    color="#243757"
                    style={[styles.tableName, {marginLeft: 13}]}>
                    80
                  </Body>
                </View>
              </View>
            </>
          ) : null}
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={showAllRating}>
        <Body color={colors.blue} style={styles.linkText}>
          Открыть полный рейтинг
        </Body>
      </TouchableOpacity>
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
  },
  linkText: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 12,
  },
});
