import {View, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    height: 350,
    width: '100%',
    backgroundColor: '#F7F7F8',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: 350,
    width: 300,
  },
});

export const OrderMap = () => {
  // useEffect(() => {
  //   if (coordinates) {
  //     refMap.current?.animateCamera(
  //       {
  //         center: {
  //           latitude: !Number.isNaN(parseFloat(coordinates.lat, 1e7))
  //             ? parseFloat(coordinates.lat, 1e7)
  //             : parseFloat(pickUpAdressLat, 1e7),
  //           longitude: !Number.isNaN(parseFloat(coordinates.lng, 1e7))
  //             ? parseFloat(coordinates.lng, 1e7)
  //             : parseFloat(pickUpAdressLng, 1e7),
  //         },
  //         zoom: 15,
  //       },
  //       1000,
  //     )
  //   }
  // }, [coordinates])
  return (
    <View style={styles.container}>
      {/* <Text>maap</Text> */}
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        mapType="mutedStandard"
        initialRegion={{
          latitude: 37.78825,
          longitude: 57.161913,
          latitudeDelta: 0.005,
          longitudeDelta: 0.021,
        }}></MapView>
    </View>
  );
};
