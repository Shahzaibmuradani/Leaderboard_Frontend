import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  REVIEWS,
} from '../actions/types';

const initialState = {
  token: AsyncStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      AsyncStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
      };
    case REVIEWS:
      return {
        ...state,
        remarks: payload,
      };
    default:
      return state;
  }
}
