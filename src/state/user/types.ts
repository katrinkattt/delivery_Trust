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

  typeInUser: boolean;
  searchInput: boolean;
  loading?: boolean;
  access_token?: string | null;
  refresh_token?: string | null;
  role?: string;
};
