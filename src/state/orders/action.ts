import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {IOrdersLoad, ILoadCategory} from '../../types/data';
import apiClient from '../../api/instance';
import R from '../../res';
import {
  CategoryOrder,
  IOrder,
  TariffOrder,
  Payment,
  ITariffPrice,
  IPaymentComfirm,
  IDonut,
} from './types';

export const loadOrder = createAsyncThunk<
  IOrder[],
  {
    link?: string;
    onSuccess?: (response: IOrder[]) => void;
    onError?: (e: any) => void;
  }
>('orders', async arg => {
  try {
    const add = arg.link || '';
    console.log(
      'R.consts.API_GET_ORDERS+add===',
      R.consts.API_GET_ORDERS + add,
    );

    const {data: response} = await apiClient.get<IOrder[]>(
      R.consts.API_GET_ORDERS + add,
    );
    arg.onSuccess?.(response);
    console.log('response in API_GET_ORDERS', response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const freeOrders = createAsyncThunk<
  IOrder[],
  {
    onSuccess?: (response: IOrder[]) => void;
    onError?: (e: any) => void;
  }
>('orders/free', async arg => {
  try {
    const {data: response} = await apiClient.get<IOrder[]>(
      R.consts.API_GET_FREE_ORDERS,
    );
    arg.onSuccess?.(response);
    console.log('response in GET_FREE_ORDERS', response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
// API_TARIFF_PRICE
export const tariffPrice = createAsyncThunk<
  ITariffPrice,
  {
    data: ITariffPrice;
    onSuccess?: (response: ITariffPrice) => void;
    onError?: (e: any) => void;
  }
>('tarifPrice', async arg => {
  try {
    console.log('api/tariff==>', arg.data);
    const {data: response} = await apiClient.get<ITariffPrice>(
      R.consts.API_TARIFF_PRICE,
      {params: arg.data},
    );
    console.log('response API_TARIFF_PRICE::', response);

    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const createOrder = createAsyncThunk<
  IOrder,
  {
    data: IOrder;
    onSuccess?: (response: IOrder) => void;
    onError?: (e: any) => void;
  }
>('order', async arg => {
  try {
    const {data: response} = await apiClient.post<IOrder>(
      R.consts.API_CR_ORDER,
      arg.data,
    );
    console.log('response API_CR_ORDER', response);

    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const paymentConfirm = createAsyncThunk<
  IPaymentComfirm,
  {
    id: number;
    onSuccess?: (response: IPaymentComfirm) => void;
    onError?: (e: any) => void;
  }
>('payment/put', async arg => {
  try {
    const payment_id = arg.id;
    const {data: response} = await apiClient.put<IPaymentComfirm>(
      R.consts.API_CONFIRM_PAYMENT + payment_id,
    );
    console.log(
      'API_CONFIRM_PAYMENT + idOrder',
      R.consts.API_CONFIRM_PAYMENT + payment_id,
    );
    console.log('response API_CONFIRM_PAYMENT', response);
    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const editOrder = createAsyncThunk<
  IOrder,
  {
    id: number;
    data: IOrder;
    onSuccess?: (response: IOrder) => void;
    onError?: (e: any) => void;
  }
>('order/put', async arg => {
  try {
    const idOrder = `?order_id=${arg.id}`;
    const {data: response} = await apiClient.put<IOrder>(
      R.consts.API_CR_ORDER,
      arg.data,
    );
    console.log(
      ' R.consts.API_CR_ORDER + idOrder',
      R.consts.API_CR_ORDER + idOrder,
    );

    console.log('response editOrder', response);

    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const loadCategory = createAsyncThunk<
  CategoryOrder,
  {
    onSuccess?: (response: CategoryOrder) => void;
    onError?: (e: any) => void;
  }
>('categories', async arg => {
  try {
    const {data: response} = await apiClient.get<CategoryOrder>(
      R.consts.API_GET_CATEGORY,
    );
    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const loadTariffs = createAsyncThunk<
  TariffOrder[],
  {
    onSuccess?: (response: TariffOrder[]) => void;
    onError?: (e: any) => void;
  }
>('tariffs', async arg => {
  try {
    const {data: response} = await apiClient.get<TariffOrder[]>(
      R.consts.API_GET_TARIFF,
    );
    console.log('API_GET_TARIFF', response);

    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const orderTip = createAsyncThunk<
  IOrder,
  {
    data: IDonut;
    onSuccess?: (response: IDonut) => void;
    onError?: (e: any) => void;
  }
>('/order/tip', async arg => {
  try {
    console.log('ORDER API_ORDER_TIP', arg.data);
    
    const {data: response} = await apiClient.post<IOrder>(
      R.consts.API_ORDER_TIP,
      arg.data,
    );
    console.log('response API_ORDER_TIP', response);

    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const orderRate = createAsyncThunk<
  IOrder,
  {
    data: IDonut;
    onSuccess?: (response: IDonut) => void;
    onError?: (e: any) => void;
  }
>('/order/rate', async arg => {
  try {
    console.log('ORDER API_ORDER_RATE', arg.data);
    
    const {data: response} = await apiClient.post<IOrder>(
      R.consts.API_ORDER_RATE,
      arg.data,
    );
    console.log('response API_ORDER_RATE', response);

    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const paymentFunc = createAsyncThunk<
  Payment,
  {
    data: Payment;
    onSuccess?: (response: Payment) => void;
    onError?: (e: any) => void;
  }
>('payment', async arg => {
  try {
    console.log('DATA API_PAYMENT::', arg.data);

    const {data: response} = await apiClient.put<Payment>(
      R.consts.API_PAYMENT,
      arg.data,
    );
    console.log('response API_PAYMENT', response);

    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
