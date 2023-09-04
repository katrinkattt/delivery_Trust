import AsyncStorage from '@react-native-community/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import {
  IRegistr,
  IRole,
  ILogin,
  IResetPassCode,
  IResetPass,
} from '../../types/data';
import {userTypeEnum} from '../../enums';

import {
  postRole,
  registerAction,
  loginAction,
  loginTokenRefrAction,
  regConfirmCodeAction,
  resetPassCodeAction,
  resetPassVerifyCodeAction,
  resetPassAction,
  setInputDisable,
  signOutUser,
  userType,
  createUserAction,
} from './action';
import {UserState} from './types';

export const initialStateUser: UserState = {
  id: 0,
  user_id: 0,
  typeInUser: false,
  searchInput: false,
  loading: false,
  access_token: null,
  refresh_token: null,
  role: userTypeEnum.NO,
  code: null,
  email: null,
  valid_code: false,
  full_name: '',
  region: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {
    setCode: (state, action) => {
      const {code} = action.payload;
      state.code = code;
      return state;
    },
    setEmail: (state, action) => {
      const {email} = action.payload;
      state.email = email;
      return state;
    },
    setAddress: (state, action) => {
      const {address} = action.payload;
      state.region = address.region;
      state.city = address.city;
      state.street = address.street;
      state.house = address.house;
      if (address?.apartment) {
        state.apartment = address?.apartment;
      }
      return state;
    },
    setFullName: (state, action) => {
      const {full_name} = action.payload;
      state.full_name = full_name;
    },
    setRole: (state, action) => {
      const {role} = action.payload;
      state.role = role;
    },
  },
  extraReducers: builder => {
    builder.addCase(signOutUser.type, state => {
      state.access_token = null;
    }),
      builder.addCase(
        userType.type,
        (state, action: PayloadAction<boolean>) => {
          state.typeInUser = action.payload;
        },
      ),
      builder.addCase(
        setInputDisable.type,
        (state, action: PayloadAction<boolean>) => {
          state.searchInput = action.payload;
        },
      ),
      builder.addCase(
        registerAction.fulfilled.type,
        (state, action: PayloadAction<ILogin>) => {
          // state.token = action.payload
          state.loading = false;
        },
      ),
      builder.addCase(registerAction.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(registerAction.rejected.type, state => {
        state.loading = false;
      }),
      builder.addCase(
        regConfirmCodeAction.fulfilled.type,
        (state, action: PayloadAction<ILogin>) => {
          // state.token = action.payload;
          state.access_token = action.payload.accessToken;
          state.refresh_token = action.payload.refreshToken;
          state.loading = false;
        },
      ),
      builder.addCase(regConfirmCodeAction.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(regConfirmCodeAction.rejected.type, state => {
        state.loading = false;
      }),
      //createUserAction
      builder.addCase(
        createUserAction.fulfilled.type,
        (state, action: PayloadAction<ILogin>) => {
          console.log('IN SLISE:action.payload', action.payload);
          state.loading = false;
        },
      ),
      builder.addCase(createUserAction.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(createUserAction.rejected.type, state => {
        state.loading = false;
      });

    builder.addCase(
      loginAction.fulfilled.type,
      (state, action: PayloadAction<ILogin>) => {
        console.log('loginAction IN SLISE:action.payload', action.payload);
        state.loading = false;
        state.access_token = action.payload.accessToken;
        state.refresh_token = action.payload.refreshToken;
        state.id = action.payload?.userData?.id || 0;
        state.role = action.payload.userType;
        state.typeInUser = action.payload.userType === 2;
        state.region = action.payload?.userData?.region;
        state.city = action.payload?.userData?.city;
        state.street = action.payload?.userData?.street;
        state.house = action.payload?.userData?.house;
        state.full_name = action.payload.userData?.fullName;
        state.user_id = action.payload?.userData?.userId || 0;
      },
    ),
      builder.addCase(loginAction.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(loginAction.rejected.type, state => {
        state.loading = false;
      }),
      builder.addCase(
        loginTokenRefrAction.fulfilled.type,
        (state, action: PayloadAction<ILogin>) => {
          state.loading = false;
          state.access_token = action.payload.access_token;
        },
      ),
      builder.addCase(loginTokenRefrAction.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(loginTokenRefrAction.rejected.type, state => {
        state.loading = false;
      }),
      builder.addCase(
        resetPassCodeAction.fulfilled.type,
        (state, action: PayloadAction<IResetPassCode>) => {
          state.loading = false;
        },
      ),
      builder.addCase(resetPassCodeAction.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(resetPassCodeAction.rejected.type, state => {
        state.loading = false;
      }),
      builder.addCase(
        resetPassVerifyCodeAction.fulfilled.type,
        (state, action: PayloadAction<IResetPassCode>) => {
          state.loading = false;
          state.valid_code = action.payload.valid_code;
        },
      ),
      builder.addCase(resetPassVerifyCodeAction.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(resetPassVerifyCodeAction.rejected.type, state => {
        state.loading = false;
      }),
      builder.addCase(
        resetPassAction.fulfilled.type,
        (state, action: PayloadAction<IResetPass>) => {
          state.loading = false;
        },
      ),
      builder.addCase(resetPassAction.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(resetPassAction.rejected.type, state => {
        state.loading = false;
      }),
      builder.addCase(
        postRole.fulfilled.type,
        (state, action: PayloadAction<IRole>) => {
          state.loading = false;
          state.role = action.payload.userType;
          state.typeInUser = action.payload.userType === 'Client';
        },
      ),
      builder.addCase(postRole.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(postRole.rejected.type, state => {
        state.loading = false;
      });
  },
});

const persistConfig: PersistConfig<UserState> = {
  key: 'auth',
  storage: AsyncStorage,
};
export const {setCode, setEmail, setAddress, setFullName, setRole} =
  userSlice.actions;
export const userReducer = persistReducer(persistConfig, userSlice.reducer);
