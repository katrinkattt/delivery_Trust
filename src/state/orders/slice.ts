import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {OrderState, OrdersState} from './types';
import {loadOrder} from './action';

export const initialOrdersState: OrderState = {
  orders: [],
  loading: false,
  newOrder: {
    id: 0,
    category: '',
    active: true,
    completle: false,
    activeMinute: 0,
    courierCoord: {latitude: 0, longitude: 0},
    finishCoord: {latitude: 0, longitude: 0},
    price: 100,
    date: '',
    typeTarif: 0,
    address: '',
    orderTime: '',
    addressTo: '',
    recipient: '',
    sender: ',',
  },
};
// export const initialStateOrder = initialOrder[]

const ordersSlice = createSlice({
  name: 'order',
  initialState: initialOrdersState,
  reducers: {
    loadOrders: (state, action) => {
      const {arr} = action.payload;
      state.orders = arr;
      return state;
    },
    setCompletlyOrders: (state, action) => {
      const {id} = action.payload;
      const current = state.orders.find(obj => obj.id === id);
      if (current) {
        current.completle = true;
        current.active = false;
      }
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      loadOrder.fulfilled.type,
      (state, action: PayloadAction<OrdersState[]>) => {
        state.loading = false;
        state.orders = action.payload;
      },
    ),
      builder.addCase(loadOrder.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(loadOrder.rejected.type, state => {
        state.loading = false;
      });
  },
});
const persistConfig: PersistConfig<OrderState> = {
  key: 'orders',
  storage: AsyncStorage,
  whitelist: ['load', 'setState'],
};
export const {loadOrders, setCompletlyOrders} = ordersSlice.actions;
export const orderReducer = persistReducer(persistConfig, ordersSlice.reducer);
