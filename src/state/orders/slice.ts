import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {OrderState, OrdersState} from './types';
import {loadOrder} from './action';

export const initialOrdersState: OrderState = {
  orders: [],
  loading: false,
  categoryDoc: [],
  categoryPack: [],
  tariffs: [],
  senders: [],
  newOrder: {
    id: 0,
    category: '',
    active: true,
    completle: false,
    activeMinute: 0,
    courierCoord: {latitude: 0, longitude: 0},
    finishCoord: {latitude: 0, longitude: 0},
    startCoord: {latitude: 0, longitude: 0},
    price: 0,
    date: '',
    typeTarif: 0,
    address: '',
    orderTime: '',
    addressTo: '',
    recipient: '',
    sender: '',
    doorToDoor: false,
    comment: '',
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
    setNewOrderCategory: (state, action) => {
      const {category} = action.payload;
      state.newOrder.category = category;
      return state;
    },
    setNewOrderDoorToDoor: (state, action) => {
      const {doorToDoor} = action.payload;
      state.newOrder.doorToDoor = doorToDoor;
      return state;
    },
    setNewOrderTariff: (state, action) => {
      const {typeTarif} = action.payload;
      state.newOrder.typeTarif = typeTarif;
      return state;
    },
    setNewOrderStartCoord: (state, action) => {
      const {coord} = action.payload;
      state.newOrder.startCoord = coord;
      return state;
    },
    setNewOrderFinishCoord: (state, action) => {
      const {coord} = action.payload;
      state.newOrder.finishCoord = coord;
      return state;
    },
    setNewOrderAddress: (state, action) => {
      const {address} = action.payload;
      state.newOrder.address = address;
      return state;
    },
    setNewOrderAddressTo: (state, action) => {
      const {addressTo} = action.payload;
      state.newOrder.addressTo = addressTo;
      return state;
    },
    setNewOrderComment: (state, action) => {
      const {comment} = action.payload;
      state.newOrder.comment = comment;
      return state;
    },
    setNewOrderSender: (state, action) => {
      const {sender} = action.payload;
      state.newOrder.sender = sender;
      return state;
    },
    setNewOrderRecipient: (state, action) => {
      const {recipient} = action.payload;
      state.newOrder.recipient = recipient;
      return state;
    },
    addSenders: (state, action) => {
      const {sender} = action.payload;
      console.log('sender in payload::', sender);

      state.senders.push(sender);
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
export const {
  loadOrders,
  setCompletlyOrders,
  setNewOrderCategory,
  setNewOrderTariff,
  addSenders,
  setNewOrderFinishCoord,
  setNewOrderStartCoord,
  setNewOrderAddress,
  setNewOrderAddressTo,
  setNewOrderRecipient,
  setNewOrderSender,
  setNewOrderDoorToDoor,
  setNewOrderComment,
} = ordersSlice.actions;
export const orderReducer = persistReducer(persistConfig, ordersSlice.reducer);
