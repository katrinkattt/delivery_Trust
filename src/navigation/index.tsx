import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {colors} from '.././theme/themes';
import AuthNavigator from '.././screens/AuthNavigator';
import OrderDetail from '.././screens/OrderDetail';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Login from '.././screens/Login';
import Register from '.././screens/Register';
import ResetPasswordEmail from '.././screens/ResetPasswordEmail';
import ResetPasswordSave from '.././screens/ResetPasswordSave';
import ConfirmEmail from '.././screens/ConfirmEmail';
import NewPass from '../screens/NewPass';
import ProfileType from '.././screens/ProfileType';
import CourierProfileData from '.././screens/CourierProfileData';
import SigningAnAgreement from '.././screens/SigningAnAgreement';
import Agreement from '../screens/Agrement';
import ClientRegistrArgumet from '.././screens/Client/RegistrArgument';
import Detail from '.././screens/Client/Detail';
import RatingCourier from '../screens/RatingCourier';
import CardEditor from '../screens/CardEditor';
import {MessageScreen} from '../components/messages/MessageScreen';
import R from '../res';
import {TabScreen} from './Tabs';

const Stack = createStackNavigator();

export const Navigation = () => {
  const theme = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, background: colors.white},
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <NavigationContainer theme={theme}>
        <BottomSheetModalProvider>
          <Stack.Navigator
            initialRouteName="AuthNavigator"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
            <Stack.Screen name="NewPass" component={NewPass} />
            <Stack.Screen
              name="ResetPasswordEmail"
              component={ResetPasswordEmail}
            />
            <Stack.Screen
              name="ResetPasswordSave"
              component={ResetPasswordSave}
            />
            <Stack.Screen name="ProfileType" component={ProfileType} />
            <Stack.Screen
              name="CourierProfileData"
              component={CourierProfileData}
            />
            <Stack.Screen
              name="SigningAnAgreement"
              component={SigningAnAgreement}
            />
            <Stack.Screen name="Agreement" component={Agreement} />
            {/*/@ts-ignore/*/}
            <Stack.Screen name="Detail" component={Detail} />
            {/* <Stack.Screen name="ClientOrderDetail" component={ClientOrderDetail} /> */}
            <Stack.Screen
              name="ClientRegistrArgumet"
              component={ClientRegistrArgumet}
            />
            {/*/@ts-ignore/*/}
            <Stack.Screen
              name={R.routes.MESSAGE_SCREEN}
              component={MessageScreen}
            />
            <Stack.Screen
              name={R.routes.RATING_COURIER}
              component={RatingCourier}
            />
            <Stack.Screen name="CardEditor" component={CardEditor} />

            <Stack.Screen name="TabScreen" component={TabScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </>
  );
};
