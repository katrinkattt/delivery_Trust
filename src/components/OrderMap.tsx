import {View, StyleSheet, Text} from 'react-native';
import {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import {
  MapIconFinish,
  MapIconLocate,
  MapIconCourier,
} from '../../assets/icons/MapIcons';
import {GOOGLE_API_KEY_A} from '../api/googleApi';
import {colors} from '../theme/themes';
import {ICategoryDataType} from '../api/OrdersData';

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
interface MapProps {
  item: ICategoryDataType;
}

export const OrderMap = ({item}: MapProps) => {
  const [config, setConfig] = useState({
    coords: {latitude: 55.7422, longitude: 37.6325},
  });
  Geolocation.getCurrentPosition(config => setConfig(config));

  const [curCoord, setCurCoord] = useState({
    latitude: 55.7482,
    longitude: 37.6345,
  });

  const coordArr = [
    {
      key: 1,
      title: 'Текущее местоположение',
      coord: curCoord,
    },
    {
      key: 2,
      title: 'Финиш',
      coord: item?.finishCoord || {latitude: 55.7422, longitude: 37.6325},
    },
    {
      key: 3,
      title: item?.active ? 'Курьер' : 'От',
      coord: item?.courierCoord || {latitude: 55.7539, longitude: 37.6212},
    },
  ];
  useEffect(() => {
    const curr = {
      latitude: config?.coords?.latitude,
      longitude: config?.coords?.longitude,
    };
    //@ts-ignore
    if (curr.latitude !== 0) {
      setCurCoord(curr);
    }
  }, [config]);

  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: item?.finishCoord?.latitude || 55.74825,
            longitude: item?.finishCoord?.longitude || 37.6324,
            latitudeDelta: 0.045,
            longitudeDelta: 0.0321,
          }}>
          <MapViewDirections
            origin={coordArr[2].coord}
            destination={coordArr[1].coord}
            apikey={GOOGLE_API_KEY_A}
            strokeColor={colors.lavender}
            strokeWidth={3}
          />
          {coordArr.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coord}
              title={marker.title}>
              {marker.key === 1 ? (
                <MapIconLocate />
              ) : marker.key === 2 ? (
                <MapIconFinish />
              ) : (
                <MapIconCourier />
              )}
            </Marker>
          ))}
        </MapView>
      </View>
    </>
  );
};
