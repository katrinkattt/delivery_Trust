import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import ClientOrder from '../../screens/Client/ClientOrders';
import OrderDetail from '../../screens/OrderDetail';
import OrderReview from '../../screens/OrderReview';

const OrdersClientStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ClientOrder}
        name={'ClientOrder'}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={OrderDetail}
        name={'OrderDetail'}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={OrderReview}
        name={'OrderReview'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersClientStack;
