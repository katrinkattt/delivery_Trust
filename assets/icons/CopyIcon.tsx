import {View, Image} from 'react-native';
const iconCopy = '../solar_copy-outline.png';

export const CopyIcon = () => (
  <View>
    <Image
      style={{height: 24, width: 24, resizeMode: 'contain'}}
      source={require(iconCopy)}
    />
  </View>
);
