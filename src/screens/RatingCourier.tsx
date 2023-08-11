import {StyleSheet, View, ScrollView} from 'react-native';
import Header from '../components/Header';
import {Space} from '../components/common/Space';
import CourierRating from '../components/CourierRating';

export default function RatingCourier() {
  return (
    <View>
      <Header title="Рейтинг курьеров" />
      <ScrollView>
        <CourierRating full />
        <Space height={100} />
        <View style={{height: 100, width: 40}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  courierRatingText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
