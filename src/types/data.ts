/*********** USER ***********/
export interface IUser {
  id: number | string;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: IUser;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}

interface Reply {
  title: string;
  value: string;
  messageId?: any;
}

interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}
export interface ICardData {
  name: string;
  cardNumber: string;
  dateEnd: string;
  cvv: string;
}

export interface ICotactDetailsOrder {
  fio: string;
  phone: string;
  city: string;
  street: string;
  home: string;
  apartment: string | undefined;
  entrance: string | undefined;
  doorCode: string | undefined;
}

export interface IRegistr {
  email?: string;
  phone?: string;
  password?: string;
  passwordConfirmation?: string;
  access_token?: string;
}
export interface IConfirmCode {
  email?: string;
  confirmation_code?: string;
  password?: string;
  phone?: string;
  access_token?: string;
  refresh_token?: string;
  message?: string;
}

export interface ILogin {
  email?: string;
  password?: string;
  access_token?: string;
  refresh_token?: string;
  accessToken?: string;
  refreshToken?: string;
}
export interface IResetPassCode {
  email?: string;
  code?: string;
  valid_code?: boolean;
}
export interface IResetPass {
  email?: string;
  code?: string;
  new_password?: string;
  passwordConfirmation?: string;
}

export interface IRole {
  email?: string;
  user_type?: number;
  access_token?: string;
  role?: string;
}
export interface IChangePass {
  oldPasword: string;
  password: string;
  passwordConfirmation: string;
}

export interface ClientRegistData {
  name?: string;
  reg?: string;
  city?: string;
  street?: string;
  home?: string;
  room?: string;
}

export interface IClientDateRes {
  name?: string;
  lastName?: string;
  middleName?: string;
  region?: string;
  city?: string;
  street?: string;
  house?: string;
  flat?: string;
}
