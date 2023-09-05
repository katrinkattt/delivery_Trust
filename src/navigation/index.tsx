import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import notifee from '@notifee/react-native';

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
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../state/user/selectors';
import socket from '../socket';
import {setLastMsg, addMsgChat} from '../state/chat/slice';

const Stack = createStackNavigator();

export const Navigation = () => {
  const user = useSelector(getUser);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  console.log('STATE==>', state);
  const theme = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, background: colors.white},
  };
  async function onDisplayNotification(text: string) {
    await notifee.requestPermission();
    // console.log('title, msg', title, msg);
    console.log('onDisplayNotification WORKKK');

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel Chat',
    });
    const strBody = text;
    // Display a notification
    await notifee.displayNotification({
      id: 'defaultMsg',
      title: 'Сообщение из чата',
      body: strBody,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Подключение к серверу Socket.IO установлено');
    });
    socket.on('receive_message', data => {
      console.log('receive_message =>DATA:', data);
      if (data) {
        dispatch(setLastMsg({msg: data.text}));
        const msg = {
          chatId: data.chat_id,
          text: data.text,
          createdAt: data.createdAt,
          id: data.message_id,
          _id: data.message_id,
          user: {
            avatar: data.user_avatar,
            name: data.user_name,
            _id: data.user_id,
          },
          image: data.image,
          file: data.file,
        };
        dispatch(addMsgChat({msg: msg}));
        console.log('data.user_id ', data.user_i, 'user.user_id', user.user_id);

        if (data.user_id !== user.user_id) {
          onDisplayNotification(data.text);
        }
      }
    });
  }, []);

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
            initialRouteName={
              user?.access_token ? 'TabScreen' : 'AuthNavigator'
            }
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
