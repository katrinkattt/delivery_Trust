export type UserState = {
  // user: IUser | null
  // userType: string
  // firstJoin: boolean
  // loading: boolean
  // resetPasswordLoading: boolean
  // removeUserLoading: boolean
  // checkEmailLoading: boolean
  // wrongToken: boolean
  // onboarding: {
  //     continue: boolean
  //     navigationStack: {
  //         routes: Array<any>
  //         index: number
  //     }
  // }
  // switchLoading: boolean
  // showReminder: boolean
  // birthdaySuccess: boolean
  // removeAccount: boolean
  // referral: string | null
  // subscriptionInfoLoading: boolean
  id: number;
  user_id: number;
  typeInUser: boolean;
  searchInput: boolean;
  loading?: boolean;
  access_token?: string | null;
  refresh_token?: string | null;
  role?: number;
  code?: string | null;
  valid_code?: boolean;
  email?: string | null;
  full_name?: string;
  region?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  phone?: string;
  ballance?: number;
  fines?: number;
  tea?: number;
  curCard?: number;
  cards?: ICard[];
  senders?: OrderSender[];
  avatar?: string;
};

export type ICard = {
  id?: number;
  select?: boolean;
  system?: string;
  number?: string;
  recToken?: string;
  dateEnd?: string;
  cvv?: string;
  name?: string;
};
export type OrderSender = {
  full_name?: string;
  phone?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  entrance?: string;
  houseCode?: string;
  coord?: {latitude: number; longitude: number};
};
export type EditData = {
  full_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  entrance?: string;
  houseCode?: string;
  coord?: {latitude: number; longitude: number};
  avatar?: string;
};
export type ChangePass = {
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
};

export type UserDataAddit = {
  userData: {
    sender?: OrderSender[];
    cards?: ICard[];
    fines?: number;
    tea?: number;
    ballance?: number;
    city?: string;
    street?: string;
    house?: string;
    apartment?: string;
    region?: string;
    avatar?: string;
  };
  email?: string;
  phone?: string;
  userType?: number;
};
