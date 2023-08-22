import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {IOrdersLoad} from '../../types/data';
import apiClient from '../../api/instance';
import R from '../../res';

export const loadOrder = createAsyncThunk<
  IOrdersLoad,
  {
    // data: IOrdersLoad;
    onSuccess?: (response: IOrdersLoad) => void;
    onError?: (e: any) => void;
  }
>('orders', async arg => {
  try {
    const {data: response} = await apiClient.get<IOrdersLoad>(
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
