import {
  ADD_PARTICIPANT,
  DELETE_PARTICIPANT,
  EDIT_PARTICIPANT,
  GET_PARTICIPANTS,
} from '../actions/types';

const initialState = {
  loading: true,
  participants: [],
  error: {},
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_PARTICIPANTS:
      return {
        ...state,
        participants: payload,
        loading: false,
      };

    case ADD_PARTICIPANT:
      return {
        ...state,
        participants: [payload, ...state.participants],
        loading: false,
      };

    case EDIT_PARTICIPANT:
      return {
        ...state,
        participants: state.participants.map((user) =>
          user._id === payload._id ? payload.user : user,
        ),
        loading: false,
      };

    case DELETE_PARTICIPANT:
      return {
        ...state,
        participants: state.participants.filter((user) => user._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
