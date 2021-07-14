import {
  CLEAR_PROFILE,
  CLEAR_USER,
  GET_PROFILE,
  GET_USER,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profiles: [],
  profile: null,
  getuser: null,
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        getuser: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        getuser: null,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        getuser: null,
        loading: false,
      };
    default:
      return state;
  }
}
