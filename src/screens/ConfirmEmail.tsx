import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Body from '../components/common/Body';
import ConfirmCodeField from '../components/common/ConfirmCode';

export default function ConfirmEmail({route}) {
  const safeAreaInsets = useSafeAreaInsets();
  const {data} = route.params;

  return (
    <View style={[styles.container, {paddingTop: safeAreaInsets.top + 33}]}>
      <Body bold color="rgba(36, 55, 87, 1)" size={25} center>
        Мы выслали вам письмо с кодом для подтверждения e-mail
      </Body>

      <Body
        color="rgba(0, 0, 0, 0.46)"
        medium
        size={18}
        center
        style={{marginVertical: 18}}>
        Ваш адрес:
        <Text style={{color: 'rgba(47, 128, 237, 1)'}}>{data?.email}</Text>
      </Body>
      <ConfirmCodeField data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
