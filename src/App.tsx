import React, {useEffect, useState} from 'react';
import {Navigation} from '../src/navigation/index';
import {Provider, useDispatch} from 'react-redux';
import notifee from '@notifee/react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {AppStateProvider} from './contexts/AppStateContext';
import {persistor, store} from './state';
import {UIManager, Platform, LogBox, StyleSheet, View} from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppLogic from './AppLogic';
import socket from './socket';

const App = () => {
  if (__DEV__) {
    import('./reactotron').then(() => console.log('Reactotron Configured'));
  }
  // LogBox.ignoreLogs([
  //   'new NativeEventEmitter',
  //   'RCTBridge',
  //   '[react-native-gesture-handler]',
  // ]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);
  const [loading, setLoading] = useState(true);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppStateProvider>
              <AppLogic>
                <Navigation />
              </AppLogic>
            </AppStateProvider>
          </PersistGate>
        </Provider>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
