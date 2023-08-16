import {Dimensions, Platform} from 'react-native';
import Config from 'react-native-config';

export const API_BASE_URL = Config.API_BASE_URL || 'http://92.51.39.155:5000/';

export const BASE_URL = Config.BASE_URL || 'http://92.51.39.155:5000/';

// API list
// export const API_BASE_URL = Config.API_BASE_URL

export const API_PATH_REGISTER = '/register';
export const API_PATH_CONFIRM_CODE = '/confirm';
export const API_PATH_LOGIN = '/login';
export const API_PATH_ROLE = 'api/v1/auth/role';
export const API_PATH_CLIENT_SETTING = 'api/v1/customer/settings';

//Device
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = !IS_ANDROID;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
