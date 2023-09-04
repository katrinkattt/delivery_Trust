import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {IChatState} from './types';
import apiClient from '../../api/instance';
import R from '../../res';

export const loadChat = createAsyncThunk<
  IChatState[],
  {
    id: number; //ЧТОБ ЭТО БЫЛ user_id
    onSuccess?: (response: IChatState[]) => void;
    onError?: (e: any) => void;
  }
>('chats', async arg => {
  try {
    const {data: response} = await apiClient.get<IChatState[]>(
      R.consts.API_GET_CHAT_H + arg.id,
    );
    arg.onSuccess?.(response);
    console.log('response in API_GET_CHAT_H', response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
