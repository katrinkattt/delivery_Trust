export type IChatsState = {
  chats: IChatState[];
  loading: boolean;
  currentChat: number;
};

export type IChatState = {
  id: number;
  chat_id?: number;
  chatId?: number;
  name?: string;
  messageLast?: string;
  image?: string;
  read?: boolean;
  messenger?: boolean;
  messages: IChatMsg[];
};
export type IChatMsg = {
  chatId?: number;
  createdAt?: string;
  text?: string;
  user: {
    avatar?: number | string;
    name?: string;
    _id: number;
    id?: number;
  };
  _id?: number;
  id?: number;
};
