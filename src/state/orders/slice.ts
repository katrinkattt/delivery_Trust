import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {IOrder, OrdersState, TariffOrder, CategoryOrder} from './types';
import {loadOrder, createOrder, loadCategory, loadTariffs} from './action';

export const initialOrdersState: OrdersState = {
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
    complete: false,
    activeMinute: 0,
    courierCoordinates: {latitude: 0, longitude: 0},
    finishCoordinates: {latitude: 0, longitude: 0},
    startCoordinates: {latitude: 0, longitude: 0},
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
    paymentType: '',
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
        current.complete = true;
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
      const {typeTarif, price} = action.payload;
      state.newOrder.typeTarif = typeTarif;
      state.newOrder.price = price;
      return state;
    },
    setNewOrderStartCoord: (state, action) => {
      const {coord} = action.payload;
      state.newOrder.startCoordinates = coord;
      return state;
    },
    setNewOrderFinishCoord: (state, action) => {
      const {coord} = action.payload;
      state.newOrder.finishCoordinates = coord;
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
      createOrder.fulfilled.type,
      (state, action: PayloadAction<IOrder[]>) => {
        state.loading = false;
      },
    ),
      builder.addCase(createOrder.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(createOrder.rejected.type, state => {
        state.loading = false;
      });
    builder.addCase(
      loadOrder.fulfilled.type,
      (state, action: PayloadAction<IOrder[]>) => {
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
    builder.addCase(
      loadTariffs.fulfilled.type,
      (state, action: PayloadAction<TariffOrder>) => {
        state.loading = false;
        state.tariffs = action.payload.tariffs;
      },
    ),
      builder.addCase(loadTariffs.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(loadTariffs.rejected.type, state => {
        state.loading = false;
      });
    builder.addCase(
      loadCategory.fulfilled.type,
      (state, action: PayloadAction<CategoryOrder>) => {
        state.loading = false;
        state.categoryDoc = action.payload.documents;
        state.categoryPack = action.payload.packs;
      },
    ),
      builder.addCase(loadCategory.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(loadCategory.rejected.type, state => {
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
