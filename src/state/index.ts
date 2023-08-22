import {combineReducers, configureStore, PayloadAction} from '@reduxjs/toolkit';
import Reactotron from '../reactotron';
import {userReducer} from './user/slice';
import {ratingReducer} from './rating/slice';
import {persistStore} from 'redux-persist';
import {orderReducer} from './orders/slice';
import AsyncStorage from '@react-native-community/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

const combinedReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  rating: ratingReducer,
});

//TODO: find how to give type for function
// @ts-ignore
const rootReducer: typeof combinedReducer = (
  state: any,
  action: PayloadAction,
) => {
  return combinedReducer(state, action);
};

const setupStore = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return configureStore({
    reducer: persistedReducer,
    enhancers: [
      // @ts-ignore
      Reactotron.createEnhancer(),
    ],
  });
};

const store = setupStore();

const persistor = persistStore(store);

export {persistor, store};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
