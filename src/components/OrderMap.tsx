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
import {IOrder} from '../state/orders/types';

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
  item: IOrder;
}

export const OrderMap = ({item}: MapProps) => {
  const defaultCoord = {
    start: {latitude: 55.0, longitude: 37.0},
    finish: {latitude: 55.74825, longitude: 37.6324},
  };
  const [config, setConfig] = useState({
    coords: {latitude: 55.0, longitude: 37.0},
  });
  const [curCoord, setCurCoord] = useState({
    latitude: 55.0,
    longitude: 37.0,
  });

  setInterval(() => {
    Geolocation.getCurrentPosition(config => setConfig(config));
  }, 50000);
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
            latitude:
              item?.finishCoordinates?.latitude || defaultCoord.finish.latitude,
            longitude:
              item?.finishCoordinates?.longitude ||
              defaultCoord.finish.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.0321,
          }}>
          <MapViewDirections
            origin={item?.startCoordinates || defaultCoord.start}
            destination={item?.finishCoordinates || defaultCoord.finish}
            apikey={GOOGLE_API_KEY_A}
            strokeColor={colors.lavender}
            strokeWidth={3}
          />
          <Marker
            key={'Start'}
            coordinate={
              item?.startCoordinates || {latitude: 55.7422, longitude: 37.6325}
            }
            title="Старт">
            <MapIconCourier />
          </Marker>
          <Marker
            key={'finish'}
            coordinate={
              item?.finishCoordinates || {latitude: 55.74, longitude: 37.63}
            }
            title="Финиш">
            <MapIconFinish />
          </Marker>
          {curCoord.latitude !== 55.0 && (
            <Marker
              key={'user'}
              coordinate={
                item?.finishCoordinates || {
                  latitude: 55.7422,
                  longitude: 37.6325,
                }
              }
              title="Я">
              <MapIconLocate />
            </Marker>
          )}
          {item?.courierCoordinates?.longitude !== 0 && (
            <Marker
              key={'corier'}
              coordinate={
                item?.courierCoordinates || {latitude: 55.74, longitude: 37.63}
              }
              title="Курьер">
              <MapIconCourier />
            </Marker>
          )}
        </MapView>
      </View>
    </>
  );
};
