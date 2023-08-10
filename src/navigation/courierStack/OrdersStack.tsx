import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import OrderDetail from '../../screens/OrderDetail';
import Orders from '../../screens/Orders';
import OrderReview from '../../screens/OrderReview';

const OrderStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Orders}
        name={'Orders'}
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
      {/* <Stack.Screen
        component={OrderReview}
        name={'OrderReview'}
        options={{
          headerShown: false,
        }}
        //For users page
      /> */}
    </Stack.Navigator>
  );
};

export default OrderStack;
