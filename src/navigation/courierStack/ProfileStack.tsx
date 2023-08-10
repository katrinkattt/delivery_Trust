import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import Profile from '../../screens/Profile';
import CardEditor from '../../screens/CardEditor';

const ProfileStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Profile}
        name={'Profile'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CardEditor}
        name={'CardEditor'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
