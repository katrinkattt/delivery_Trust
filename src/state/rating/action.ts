import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {IRatingLoad} from '../../types/data';
import apiClient from '../../api/instance';
import R from '../../res';

export const loadRating = createAsyncThunk<
  IRatingLoad,
  {
    // data: IRatingLoad;
    onSuccess?: (response: IRatingLoad) => void;
    onError?: (e: any) => void;
  }
>('rating', async arg => {
  try {
    const {data: response} = await apiClient.get<IRatingLoad>(
      R.consts.API_GET_RATING,
    );
    arg.onSuccess?.(response);
    console.log('response in API_GET_RATING', response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
