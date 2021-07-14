import {
  ADD_COMMENT,
  ADD_POST,
  ALLOW_RELEVANT,
  CLEAR_POSTS,
  ERROR_RELEVANT,
  GET_POST,
  GET_POSTS,
  GET_RELEVANT,
  MY_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  REMOVE_IRRELEVANT,
  UPDATE_LIKES,
  ADD_RESPONSE,
} from '../actions/types';

const initialState = {
  posts: [],
  postRelevants: [],
  myposts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case MY_POSTS:
      return {
        ...state,
        myposts: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? {...post, likes: payload.likes} : post,
        ),
        loading: false,
      };
    case POST_ERROR:
    case ERROR_RELEVANT:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {...state.post, comments: payload},
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload,
          ),
        },
        loading: false,
      };
    case GET_RELEVANT:
      return {
        ...state,
        postRelevants: payload,
        loading: false,
      };
    case ALLOW_RELEVANT:
      return {
        ...state,
        postRelevants: state.postRelevants.filter(
          (post) => post.isRelevant !== true,
        ),
      };
    case REMOVE_IRRELEVANT:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        postRelevants: [],
        myposts: [],
        loading: false,
      };
    case ADD_RESPONSE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {...post, responses: payload.responses}
            : post,
        ),
        loading: false,
      };
    default:
      return state;
  }
}
