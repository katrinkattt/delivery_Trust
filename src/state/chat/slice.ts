import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {IChatsState, IChatState, IChatFile} from './types';
import {loadChat, sendFileChat} from './action';

export const initialRatingState: IChatsState = {
  chats: [],
  loading: false,
  currentChat: 0,
};

const ChatSlice = createSlice({
  name: 'rating',
  initialState: initialRatingState,
  reducers: {
    loadChats: (state, action) => {
      const {arr} = action.payload;
      state.chats = arr;
      return state;
    },
    setCurrentChat: (state, action) => {
      const {num} = action.payload;
      state.currentChat = num;
      return state;
    },
    addMsgChat: (state, action) => {
      const {msg} = action.payload;
      state.chats[state.currentChat].messages.unshift(msg);
      return state;
    },
    setLastMsg: (state, action) => {
      const {msg} = action.payload;
      state.chats[state.currentChat].messageLast = msg;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      loadChat.fulfilled.type,
      (state, action: PayloadAction<IChatState[]>) => {
        state.loading = false;
        console.log('action.payload', action.payload);
        const chats = action.payload.map(chat => {
          const msg = chat.messages.map(m => {
            return {
              ...m,
              user: {avatar: m.user.avatar, name: m.user.name, _id: m.user.id},
              _id: m.id,
            };
          });
          const messages = {messages: msg};
          return {...chat, ...messages};
        });

        state.chats = chats;
      },
    ),
      builder.addCase(loadChat.pending.type, state => {
        state.loading = true;
      }),
      builder.addCase(loadChat.rejected.type, state => {
        state.loading = false;
      });
  },
});

const persistConfig: PersistConfig<IChatsState> = {
  key: 'chats',
  storage: AsyncStorage,
};
export const {loadChats, setCurrentChat, addMsgChat, setLastMsg} =
  ChatSlice.actions;
export const chatReducer = persistReducer(persistConfig, ChatSlice.reducer);
