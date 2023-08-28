import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {IOrdersLoad, ILoadCategory} from '../../types/data';
import apiClient from '../../api/instance';
import R from '../../res';
import {CategoryOrder, IOrder, TariffOrder, Payment} from './types';

export const loadOrder = createAsyncThunk<
  IOrder[],
  {
    onSuccess?: (response: IOrder[]) => void;
    onError?: (e: any) => void;
  }
>('orders', async arg => {
  try {
    const {data: response} = await apiClient.get<IOrder[]>(
      R.consts.API_GET_ORDERS,
    );
    arg.onSuccess?.(response);
    console.log('response in API_GET_ORDERS', response);
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
