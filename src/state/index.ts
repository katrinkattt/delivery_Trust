import {combineReducers, configureStore, PayloadAction} from '@reduxjs/toolkit';
import Reactotron from '../reactotron';
import {userReducer} from './user/slice';
import {persistStore} from 'redux-persist';
import orderReducer from './orders/slice';

const combinedReducer = combineReducers({
  user: userReducer,
  orders: orderReducer,
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
  return configureStore({
    reducer: rootReducer,
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
