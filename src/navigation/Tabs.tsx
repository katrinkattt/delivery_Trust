import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '.././screens/Home';
import Profile from '.././screens/Profile';
import {
  HomeActive,
  HomeDefault,
  MessageActive,
  MessageDefault,
  OrderActive,
  OrderDefault,
  ProfileActive,
  ProfileDefault,
} from '.././components/common/Svgs';
import OrderStack from '../navigation/courierStack/OrdersStack';
import Messages from '.././screens/Messages';
import { colors } from '.././theme/themes';

import OrdersClientStack from './clientStack/OrdersClientStack';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../state/user/selectors';
import HomeClientStack from './clientStack/HomeClientStack';
import { getOrders } from '../state/orders/selectors';
import { IOrder } from '../state/orders/types';
// import {loadOrders} from '../state/orders/slice';
// import OrdersData from '../api/OrdersData';
// import OrdersDataCourier from '../api/OrdersDataCourier';

const Tab = createBottomTabNavigator();

export function TabScreen() {
  const user = useSelector(getUser);
  const isTypeInUser = user?.role;
  console.log('ROLEE', isTypeInUser);
  const order = useSelector(getOrders);
  const activeOrder = order?.orders.filter((obj: IOrder) => obj.active) || [];
  const orderList = activeOrder.length;

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!user?.typeInUser) {
  //     dispatch(loadOrders({arr: OrdersData}));
  //   } else {
  //     dispatch(loadOrders({arr: OrdersDataCourier}));
  //   }
  // }, []);
  return (
    <>
      {!user?.typeInUser ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabHeader,
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginTop: -7 }}>
                  {focused ? (
                    <HomeActive width={42} height={43} color={'#EEFFED'} />
                  ) : (
                    <HomeDefault width={28} height={43} color="#A0ACBE" />
                  )}
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="OrderStack"
            component={OrderStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginTop: -7 }}>
                  {orderList > 0 && (
                    <View
                      style={[styles.notificationBox, !focused && { right: -7 }]}>
                      <Text style={styles.notificationText}>{orderList}</Text>
                    </View>
                  )}

                  {focused ? (
                    <OrderActive width={42} height={43} color={'#EEFFED'} />
                  ) : (
                    <OrderDefault width={28} height={43} color="#A0ACBE" />
                  )}
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Messages"
            component={Messages}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginTop: -7 }}>
                  {focused ? (
                    <MessageActive width={42} height={43} color={'#EEFFED'} />
                  ) : (
                    <MessageDefault width={28} height={43} color="#A0ACBE" />
                  )}
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginTop: -7 }}>
                  {focused ? (
                    <ProfileActive width={42} height={43} color={'#EEFFED'} />
                  ) : (
                    <ProfileDefault width={28} height={43} color="#A0ACBE" />
                  )}
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styless.tabHeader,
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="HomeClientStack"
            component={HomeClientStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginTop: -7 }}>
                  {focused ? (
                    <HomeActive width={42} height={43} color={'#EEFFED'} />
                  ) : (
                    <HomeDefault width={28} height={43} color="#A0ACBE" />
                  )}
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="ClientOrderStack"
            component={OrdersClientStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginTop: -7 }}>
                  {orderList > 0 && (
                    <View
                      style={[
                        styless.notificationBox,
                        !focused && { right: -7 },
                      ]}>
                      <Text style={styless.notificationText}>{orderList}</Text>
                    </View>
                  )}

                  {focused ? (
                    <OrderActive width={42} height={43} color={'#EEFFED'} />
                  ) : (
                    <OrderDefault width={28} height={43} color="#A0ACBE" />
                  )}
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Messages"
            component={Messages}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginTop: -7 }}>
                  {focused ? (
                    <MessageActive width={42} height={43} color={'#EEFFED'} />
                  ) : (
                    <MessageDefault width={28} height={43} color="#A0ACBE" />
                  )}
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'flex-end', marginTop: -7 }}>
                  {focused ? (
                    <ProfileActive width={42} height={43} color={'#EEFFED'} />
                  ) : (
                    <ProfileDefault width={28} height={43} color="#A0ACBE" />
                  )}
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tabHeader: {
    width: '100%',
    height: 70,
    paddingBottom: 20,
    borderTopWidth: 0,
    backgroundColor: '#f7f9fd',
  },
  notificationBox: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10000,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    marginTop: 4,
    zIndex: 100,
  },
  notificationText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '500',
  },
});

const styless = StyleSheet.create({
  tabHeader: {
    width: '100%',
    height: 70,
    paddingBottom: 20,
    borderTopWidth: 0,
    backgroundColor: '#f7f9fd',
  },
  notificationBox: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10000,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    marginTop: 4,
    zIndex: 100,
  },
  notificationText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '500',
  },
});
