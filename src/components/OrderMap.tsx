import {View, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 350,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export const OrderMap = () => {
  // Geolocation.setRNConfiguration(geo);

  return (
    <View style={styles.container}>
      {/* <Text>maap</Text> */}
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 55.74825,
          longitude: 37.6324,
          latitudeDelta: 0.045,
          longitudeDelta: 0.0321,
        }}>
        <Marker
          key={1}
          coordinate={{latitude: 55.74825, longitude: 37.6324}}
          title="here"
        />
      </MapView>
    </View>
  );
};
