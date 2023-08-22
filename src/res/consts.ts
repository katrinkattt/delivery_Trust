import {Dimensions, Platform} from 'react-native';
import Config from 'react-native-config';

export const API_BASE_URL = Config.API_BASE_URL || 'http://92.51.39.155:5000/';

export const BASE_URL = Config.BASE_URL || 'http://92.51.39.155:5000/';

// API list
// export const API_BASE_URL = Config.API_BASE_URL

export const API_PATH_REGISTER = '/register/sendcode';
export const API_PATH_CONFIRM_CODE = '/register';
export const API_CREATE_USER = '/api/create-user';
export const API_PATH_LOGIN = '/auth';
export const API_REFRESH_TOKEN = '/auth/refresh';
export const API_RESET_PASS_CODE = '/resetpassword/sendcode';
export const API_RESET_PASS_VERIFY = '/resetpassword/verifycode';
export const API_RESET_PASS = '/resetpassword';
export const API_PATH_ROLE = '/role/type';
export const API_PATH_CLIENT_SETTING = 'api/v1/customer/settings';

//rating
export const API_GET_RATING = '/rating';
// orders
// пока так назвала
export const API_GET_ORDERS = '/orders';

//Device
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = !IS_ANDROID;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
