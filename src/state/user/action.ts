import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  IClientDateRes,
  IConfirmCode,
  IRegistr,
  ILogin,
  IRole,
  IResetPassCode,
  IResetPass,
  ICreateUser,
} from '../../types/data';
import {OrderSender, UserDataAddit, EditData, ChangePass} from './types';
import R from '../../res';
import apiClient from '../../api/instance';
export const signOutUser = createAction('user/signOut');
export const removeUserInfo = createAction('user/removeUserInfo');
export const firstJoin = createAction('user/firstJoin');
export const setReferral = createAction<string>('user/setReferral');
export const setProReminderAction = createAction<boolean>('user/proReminder');
export const setAccountRemoverAction = createAction<boolean>(
  'user/accountRemover',
);
export const userType = createAction<boolean>('user/typeUser');
export const setInputDisable = createAction<boolean>('user/disableSearch');

export const registerAction = createAsyncThunk<
  IRegistr,
  {
    data: IRegistr;
    onSuccess?: (response: IRegistr) => void;
    onError?: (e: any) => void;
  }
>('register/sendcode', async arg => {
  try {
    console.log('API_PATH_REGISTER, data:', arg.data);

    const {data: response} = await apiClient.post<IRegistr>(
      R.consts.API_PATH_REGISTER,
      arg.data,
    );

    arg.onSuccess?.(response);
    console.log(response, 'response');

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const regConfirmCodeAction = createAsyncThunk<
  IConfirmCode,
  {
    data: IConfirmCode;
    onSuccess?: (response: IConfirmCode) => void;
    onError?: (e: any) => void;
  }
>('register', async arg => {
  try {
    console.log('API_PATH_CONFIRM_CODE');

    const {data: response} = await apiClient.post<IConfirmCode>(
      R.consts.API_PATH_CONFIRM_CODE,
      {
        ...arg.data,
        passwordConfirmation: arg.data.refresh_token,
        access_token: arg.data.access_token,
      },
    );

    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const createUserAction = createAsyncThunk<
  ILogin,
  {
    data: ICreateUser;
    onSuccess?: (response: ICreateUser) => void;
    onError?: (e: any) => void;
  }
>('api/createuser', async arg => {
  console.log('DATA IN createUserAction', arg.data);
  try {
    const {data: response} = await apiClient.post<ICreateUser>(
      R.consts.API_CREATE_USER,
      arg.data,
    );
    console.log('response in API_CREATE_USER', response);

    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    console.log('e.response', e.response);

    throw e;
  }
});
export const loginAction = createAsyncThunk<
  ILogin,
  {
    data: ILogin;
    onSuccess?: (response: ILogin) => void;
    onError?: (e: any) => void;
  }
>('auth', async arg => {
  try {
    const {data: response} = await apiClient.post<ILogin>(
      R.consts.API_PATH_LOGIN,
      {
        ...arg.data,
        access_token: arg.data.access_token,
        refresh_token: arg.data.refresh_token,
      },
    );
    console.log('data', arg.data);

    arg.onSuccess?.(response);

    console.log('resp login', response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const loginTokenRefrAction = createAsyncThunk<
  ILogin,
  {
    data: ILogin;
    onSuccess?: (response: ILogin) => void;
    onError?: (e: any) => void;
  }
>('auth/refresh', async arg => {
  try {
    const {data: response} = await apiClient.post<ILogin>(
      R.consts.API_REFRESH_TOKEN,
      {
        ...arg.data,
        access_token: arg.data.access_token,
      },
    );

    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const resetPassCodeAction = createAsyncThunk<
  IResetPassCode,
  {
    data: IResetPassCode;
    onSuccess?: (response: IResetPassCode) => void;
    onError?: (e: any) => void;
  }
>('resetpassword/sendcode', async arg => {
  try {
    const {data: response} = await apiClient.post<IResetPassCode>(
      R.consts.API_RESET_PASS_CODE,
      arg.data,
    );

    arg.onSuccess?.(response);

    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const resetPassVerifyCodeAction = createAsyncThunk<
  IResetPassCode,
  {
    data: IResetPassCode;
    onSuccess?: (response: IResetPassCode) => void;
    onError?: (e: any) => void;
  }
>('resetpassword/verifycode', async arg => {
  try {
    const {data: response} = await apiClient.post<IResetPassCode>(
      R.consts.API_RESET_PASS_VERIFY,
      {
        ...arg.data,
        valid_code: arg.data.valid_code,
      },
    );

    arg.onSuccess?.(response);
    console.log('API_RESET_PASS_VERIFY resp=>>', response);

    return response;
  } catch (e: any) {
    console.log('API_RESET_PASS_VERIFY ERR:', e);

    arg.onError?.(e.response);
    throw e;
  }
});
export const resetPassAction = createAsyncThunk<
  IResetPass,
  {
    data: IResetPass;
    onSuccess?: (response: IResetPass) => void;
    onError?: (e: any) => void;
  }
>('resetpassword', async arg => {
  try {
    const {data: response} = await apiClient.post<IResetPass>(
      R.consts.API_RESET_PASS,
      {
        ...arg.data,
        email: arg.data.email,
        code: arg.data.code,
        new_password: arg.data.new_password,
      },
    );

    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const postRole = createAsyncThunk<
  IRole,
  {
    data: IRole;
    onSuccess?: (response: IRole) => void;
    onError?: (e: any) => void;
  }
>('role/type', async arg => {
  try {
    const {data: response} = await apiClient.post<IRole>(
      R.consts.API_PATH_ROLE,
      {...arg.data, email: arg.data.email, user_type: arg.data.user_type},
    );
    console.log('role resp', response);

    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
type typeSender = {sender: OrderSender[]};

export const editSenders = createAsyncThunk<
  OrderSender[],
  {
    id: number;
    data: typeSender;
    onSuccess?: (response: OrderSender[]) => void;
    onError?: (e: any) => void;
  }
>('order/put', async arg => {
  try {
    const id = arg.id;
    const {data: response} = await apiClient.put<OrderSender[]>(
      R.consts.API_SENDERS + id,
      arg.data,
    );
    console.log('response editSender', response);
    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
// /changepassword/
export const changePass = createAsyncThunk<ChangePass,
  {
    id: number;
    data: ChangePass;
    onSuccess?: (response: ChangePass) => void;
    onError?: (e: any) => void;
  }
>('user_changepass/put', async arg => {
  console.log('ChangePass put- DATA:', arg.data);
  try {
    const id = arg.id;
    const {data: response} = await apiClient.put<ChangePass>(
      R.consts.API_CH_PASS + id,
      arg.data,
    );
    console.log('R.consts.API_CH_PASS + id,', R.consts.API_USER_DATA + id);
    console.log('response changePass', response);
    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
//
export const editData = createAsyncThunk<
  EditData,
  {
    id: number;
    data: EditData;
    onSuccess?: (response: EditData) => void;
    onError?: (e: any) => void;
  }
>('user_data/put', async arg => {
  console.log('R.consts.API_USER_DATA + id,', R.consts.API_USER_DATA + arg.id);
  console.log('user_data/put DATA:', arg.data);

  try {
    const id = arg.id;
    const {data: response} = await apiClient.put<EditData>(
      R.consts.API_USER_EDIT + id,
      arg.data,
    );
    console.log('R.consts.API_USER_DATA + id,', R.consts.API_USER_DATA + id);
    console.log('user_data/put DATA:', arg.data);

    console.log('response editData', response);
    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const loadUserData = createAsyncThunk<
  UserDataAddit,
  {
    user_id?: number;
    onSuccess?: (response: UserDataAddit) => void;
    onError?: (e: any) => void;
  }
>('user_data', async arg => {
  try {
    const id = arg.user_id;
    console.log('API_USER_DATA', R.consts.API_USER_DATA + id);
    const {data: response} = await apiClient.get<UserDataAddit>(
      R.consts.API_USER_DATA + id,
    );
    arg.onSuccess?.(response);
    console.log('response in API_USER_DATA', response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});

export const ClientDataAction = createAsyncThunk<
  IClientDateRes,
  {
    data: IClientDateRes;
    onSuccess?: (response: IClientDateRes) => void;
    onError?: (e: any) => void;
  }
>('user/dataClient', async arg => {
  try {
    const {data: response} = await apiClient.post<IClientDateRes>(
      R.consts.API_PATH_CLIENT_SETTING,
      arg.data,
    );

    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});


// export const loguotUser = createAsyncThunk<[],
//   {
//     onSuccess?: (response: []) => void;
//     onError?: (e: any) => void;
//   }
// >('loguotUser', async arg => {
//   try {
//     const {data: response} = await apiClient.get<[]>(
//       R.consts.API_GET_FREE_ORDERS,
//     );
//     arg.onSuccess?.(response);
//     console.log('response in GET_FREE_ORDERS', response);
//     return response;
//   } catch (e: any) {
//     arg.onError?.(e.response);
//     throw e;
//   }
// });
