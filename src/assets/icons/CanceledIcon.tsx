import React from 'react';
import {Image} from 'react-native';
const cnacelIcon = '../cancelIcon.png';

interface IProps {
  width?: number;
}

const CanceledIcon = (props: IProps) => {
  const {width = 15} = props;

  return (
    <Image
      source={require(cnacelIcon)}
      style={{width: width, resizeMode: 'contain'}}
    />
  );
};

export default CanceledIcon;
//in procces order
