import AsyncStorage from '@react-native-community/async-storage';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import {OrderState} from './types';

export const initialOrdersState: OrderState[] = [];
// export const initialStateOrder = initialOrder[]

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    loadOrders: (state, action) => {
      return [...state, ...action.payload];
    },
    setCompletlyOrders: (state, action) => {
      const {id} = action.payload;
      const current = state.find(obj => obj.id === id);
      if (current) {
        current.completle = true;
        current.active = false;
      }
      return state;
    },
  },
});
// const persistConfig: PersistConfig<OrderState> = {
//   key: 'loadOrders',
//   storage: AsyncStorage,
//   whitelist: ['load', 'setState'],
// };
export const {loadOrders, setCompletlyOrders} = ordersSlice.actions;
export default ordersSlice.reducer;
// export const userReducer = persistReducer(persistConfig, userSlice.reducer);
