import React from 'react';
import {Image} from 'react-native';
const inProcces = '../FrameInProcess.png';

interface IProps {
  width?: number;
  height?: number;
}

const SoatIcon = (props: IProps) => {
  const {width = 18, height = 15} = props;

  return (
    <Image
      source={require(inProcces)}
      style={{width: width, resizeMode: 'contain'}}
    />
  );
};

export default SoatIcon;
//in procces order
