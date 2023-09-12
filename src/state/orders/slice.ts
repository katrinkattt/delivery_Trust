import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {IOrder, OrdersState, TariffOrder, CategoryOrder} from './types';
import {
  loadOrder,
  freeOrders,
  editOrder,
  createOrder,
  loadCategory,
  loadTariffs,
} from './action';

export const initialOrdersState: OrdersState = {
  orders: [],
  findOrders: [],
  loading: false,
  categoryDoc: [],
  categoryPack: [],
  tariffs: [],
  donut: 0,
  currPaymentId: 0,
  newOrder: {
    id: 0,
    category: '',
    active: true,
    complete: false,
    activeMinute: 60,
    courierCoordinates: {latitude: 0, longitude: 0},
    finishCoordinates: {latitude: 0, longitude: 0},
    startCoordinates: {latitude: 0, longitude: 0},
    price: 0,
    date: '',
    typeTarif: 24,
    tariff: 1,
    address: '',
    orderTime: '',
    addressTo: '',
    recipient: '',
    sender: '',
    sender_id: 0,
    doorToDoor: false,
    comment: '',
    paymentType: 1,
    payment_id: 1,
    phone: '',
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
      state.newOrder.tariff = typeTarif;
      state.newOrder.price = price;
      state.newOrder.activeMinute = typeTarif * 60;
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
      const {sender, sender_id} = action.payload;
      state.newOrder.sender = sender;
      state.newOrder.sender_id = sender_id;
      return state;
    },
    setNewOrderAnySender: (state, action) => {
      const {sender} = action.payload;
      state.newOrder.sender = sender.fullName;
      state.newOrder.address = sender.address;
      state.newOrder.startCoordinates = sender.startCoordinates;
      return state;
    },
    setNewOrderRecipient: (state, action) => {
      const {recipient} = action.payload;
      state.newOrder.recipient = recipient;
      return state;
    },
    setNewOrderPaymentType: (state, action) => {
      const {paymentType} = action.payload;
      state.newOrder.paymentType = paymentType;
      return state;
    },
    setDonut: (state, action) => {
      const {donut} = action.payload;
      state.donut = donut;
      return state;
    },
    setCurrPaymentId: (state, action) => {
      const {id} = action.payload;
      state.currPaymentId = id;
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
        state.donut = 0;
        state.currPaymentId = 0;
      },
    ),
      builder.addCase(loadOrder.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(loadOrder.rejected.type, state => {
        state.loading = false;
      });
    builder.addCase(
      freeOrders.fulfilled.type,
      (state, action: PayloadAction<IOrder[]>) => {
        console.log('action.payload===>', action);
        state.loading = false;
        state.findOrders = action.payload;
      },
    ),
      builder.addCase(freeOrders.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(freeOrders.rejected.type, state => {
        state.loading = false;
      });
    builder.addCase(
      editOrder.fulfilled.type,
      (state, action: PayloadAction<IOrder[]>) => {
        state.loading = false;
      },
    ),
      builder.addCase(editOrder.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(editOrder.rejected.type, state => {
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
        state.categoryDoc = action.payload.doc;
        state.categoryPack = action.payload.pack;
        state.donut = 0;
        state.currPaymentId = 0;
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
  setNewOrderFinishCoord,
  setNewOrderStartCoord,
  setNewOrderAddress,
  setNewOrderAddressTo,
  setNewOrderRecipient,
  setNewOrderSender,
  setNewOrderDoorToDoor,
  setNewOrderComment,
  setNewOrderPaymentType,
  setDonut,
  setCurrPaymentId,
  setNewOrderAnySender,
} = ordersSlice.actions;
export const orderReducer = persistReducer(persistConfig, ordersSlice.reducer);
