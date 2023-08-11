import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Body from './Body';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../theme/themes';

interface IProps {
  label: string;
  style?: object;
  onChange?: (value: boolean) => void;
  val?: boolean;
  isGreen?: boolean;
}

const CustomCheckbox = ({label, style, onChange, val, isGreen}: IProps) => {
  return (
    <View style={[styles.container, style]}>
      <CheckBox
        style={styles.checkbox}
        value={val}
        tintColors={{
          true: isGreen ? colors.green : colors.lavender,
          false: 'rgba(232, 232, 240, 1)',
        }}
        onValueChange={onChange}
      />

      <Body color="rgba(36, 55, 87, 1)" medium style={{marginTop: 5}}>
        {label}
      </Body>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkbox: {
    borderColor: 'rgba(232, 232, 240, 1)',
    marginRight: 10,
  },
});

export default CustomCheckbox;
