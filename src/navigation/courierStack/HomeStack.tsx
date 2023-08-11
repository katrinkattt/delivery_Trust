import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import Home from '../../screens/Home';
import RatingCourier from '../../screens/RatingCourier';

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name={'HomeCourier'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={RatingCourier}
        name={'RatingCourier'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
