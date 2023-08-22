import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import {RatingState, RatingItem} from './types';
import {loadRating} from './action';
import AsyncStorage from '@react-native-community/async-storage';

export const initialRatingState: RatingState = {
  raiting: [],
  myRating: '',
  loading: false,
};

const RatingSlice = createSlice({
  name: 'rating',
  initialState: initialRatingState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadRating.fulfilled.type,
      (state, action: PayloadAction<RatingItem[]>) => {
        state.loading = false;
        state.raiting = action.payload;
      },
    ),
      builder.addCase(loadRating.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(loadRating.rejected.type, state => {
        state.loading = false;
      });
  },
});
const persistConfig: PersistConfig<RatingState> = {
  key: 'rate',
  storage: AsyncStorage,
};
export const ratingReducer = persistReducer(persistConfig, RatingSlice.reducer);
