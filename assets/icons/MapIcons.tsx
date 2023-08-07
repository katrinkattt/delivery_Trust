import React from 'react';
import {View, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../src/theme/themes';

export const MapIconFinish = () => {
  return (
    <Svg width={26} height={26} fill="none">
      <Path
        d="M13.4449 24.5248C13.3283 24.634 13.1715 24.7008 12.9999 24.7008C12.8278 24.7008 12.671 24.634 12.5548 24.5248L6.17704 18.5327C4.24177 16.7144 3.0332 14.1322 3.0332 11.2674C3.0332 5.76325 7.49524 1.30078 12.9999 1.30078C18.5041 1.30078 22.9665 5.76325 22.9665 11.2674C22.9665 14.1322 21.758 16.7144 19.8227 18.5327L13.4449 24.5248ZM12.9999 7.36745C10.8458 7.36745 9.09987 9.11335 9.09987 11.2674C9.09987 13.4215 10.8458 15.1674 12.9999 15.1674C15.154 15.1674 16.8999 13.4215 16.8999 11.2674C16.8999 9.11335 15.154 7.36745 12.9999 7.36745Z"
        fill="#243757"
      />
    </Svg>
  );
};
export const MapIconLocate = () => (
  <View
    style={{
      backgroundColor: 'rgba(147, 122, 234, 0.21)',
      height: 50,
      width: 50,
      borderRadius: 25,
      display: 'flex',
      justifyContent: 'center',
    }}>
    <View
      style={{
        height: 24,
        width: 24,
        backgroundColor: colors.white,
        borderColor: colors.lavender,
        borderRadius: 12,
        borderWidth: 2,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: colors.lavender,
          alignSelf: 'center',
        }}
      />
    </View>
  </View>
);

export const MapIconCourier = () => (
  <View>
    <Image
      style={{height: 36, width: 36, resizeMode: 'contain'}}
      source={require('../CourierOnMap.png')}
    />
  </View>
);
