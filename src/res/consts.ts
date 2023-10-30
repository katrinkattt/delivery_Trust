import {Dimensions, Platform} from 'react-native';
import Config from 'react-native-config';

export const API_BASE_URL = Config.API_BASE_URL || 'http://92.51.39.155:5000/';

export const BASE_URL = Config.BASE_URL || 'http://92.51.39.155:5000/';
// API list
// export const API_BASE_URL = Config.API_BASE_URL

export const API_PATH_REGISTER = '/register/sendcode';
export const API_PATH_CONFIRM_CODE = '/register';
export const API_CREATE_USER = '/api/createuser';
export const API_PATH_LOGIN = '/auth';
export const API_REFRESH_TOKEN = '/auth/refresh';
export const API_RESET_PASS_CODE = '/resetpassword/sendcode';
export const API_RESET_PASS_VERIFY = '/resetpassword/verifycode';
export const API_RESET_PASS = '/resetpassword';
export const API_PATH_ROLE = '/role/type';
export const API_PATH_CLIENT_SETTING = 'api/v1/customer/settings';
export const API_SENDERS = '/user/client/';
export const API_USER_DATA = '/user_data/';
export const API_USER_EDIT = '/user_data/';
export const API_CH_PASS = '/changepassword/';

//rating
export const API_GET_RATING = '/rating';
// orders
// пока так назвала
export const API_CR_ORDER = '/order';
export const API_GET_ORDERS = '/orders';
export const API_GET_FREE_ORDERS = '/orders?active=True&courier=None';
export const API_GET_CATEGORY = '/api/categories';
export const API_GET_TARIFF = '/api/tariff';
export const API_TARIFF_PRICE = '/api/tariff';
export const API_PAYMENT = '/payment';

//chat
export const API_GET_CHAT_H = '/get_chat_history/';
export const API_FILE_CHAT = '/upload';

//Device
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = !IS_ANDROID;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
