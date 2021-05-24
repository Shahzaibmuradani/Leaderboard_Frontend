import axios from 'axios';
import {
  ADD_COMMENT,
  ADD_POST,
  ALLOW_RELEVANT,
  ERROR_RELEVANT,
  GET_POST,
  GET_POSTS,
  GET_RELEVANT,
  MY_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  REMOVE_IRRELEVANT,
  UPDATE_LIKES,
} from './types';

//import setAuthToken from '../utils/setAuthToken';
import {setAlert} from '../actions/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

// get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.get(
      `http://hear--me--out.herokuapp.com/api/posts/all`,
      config,
    );
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// get all non relevant posts
export const getNotRelevant = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.get(
      `http://hear--me--out.herokuapp.com/api/posts/relevant`,
      config,
    );
    dispatch({
      type: GET_RELEVANT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_RELEVANT,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// get posts by id
export const getPost = (postId, post_type) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    if (post_type === 'job') {
      const res = await axios.get(
        `https://hear--me--out.herokuapp.com/api/posts/job/${postId}`,
        config,
      );
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } else if (post_type === 'event') {
      const res = await axios.get(
        `https://hear--me--out.herokuapp.com/api/posts/event/${postId}`,
        config,
      );
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// get my posts
export const getMyposts = (post_type) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    if (post_type === 'job') {
      const res = await axios.get(
        `https://hear--me--out.herokuapp.com/api/posts/user/job`,
        config,
      );
      dispatch({
        type: MY_POSTS,
        payload: res.data,
      });
    } else if (post_type === 'event') {
      const res = await axios.get(
        `https://hear--me--out.herokuapp.com/api/posts/user/event`,
        config,
      );
      dispatch({
        type: MY_POSTS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// create job post
export const createJob = (FormData, navigation) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.post(
      `https://hear--me--out.herokuapp.com/api/posts/job`,
      FormData,
      config,
    );
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Added', '#4BB543'));
    navigation.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
  }
};

// create job post
export const createEvent = (FormData, navigation) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.post(
      `https://hear--me--out.herokuapp.com/api/posts/event`,
      FormData,
      config,
    );
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Added', '#4BB543'));
    //console.log(res.data);
    navigation.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
  }
};

// add like
export const addLike = (postId, post_type) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    if (post_type === 'job') {
      const res = await axios.put(
        `http://hear--me--out.herokuapp.com/api/posts/job/like/${postId}`,
        {},
        config,
      );

      dispatch({
        type: UPDATE_LIKES,
        payload: {postId, like: res.data},
      });
    } else if (post_type === 'event') {
      const res = await axios.put(
        `http://hear--me--out.herokuapp.com/api/posts/event/like/${postId}`,
        {},
        config,
      );

      dispatch({
        type: UPDATE_LIKES,
        payload: {postId, like: res.data},
      });
    }
  } catch (error) {
    console.log('Error ', error.message);
  }
};

// remove like
export const removeLike = (postId, post_type) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    if (post_type === 'job') {
      const res = await axios.put(
        `http://hear--me--out.herokuapp.com/api/posts/job/unlike/${postId}`,
        {},
        config,
      );

      dispatch({
        type: UPDATE_LIKES,
        payload: {postId, like: res.data},
      });
    } else if (post_type === 'event') {
      const res = await axios.put(
        `http://hear--me--out.herokuapp.com/api/posts/event/unlike/${postId}`,
        {},
        config,
      );

      dispatch({
        type: UPDATE_LIKES,
        payload: {postId, like: res.data},
      });
    }

    //navigation.goBack();
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// create comment
export const createComment = (
  postId,
  post_type,
  FormData,
  //  navigation,
) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    if (post_type === 'job') {
      const res = await axios.post(
        `https://hear--me--out.herokuapp.com/api/posts/job/comment/${postId}`,
        FormData,
        config,
      );
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });

      dispatch(setAlert('Comment Added', '#4BB543'));
    } else if (post_type === 'event') {
      const res = await axios.post(
        `https://hear--me--out.herokuapp.com/api/posts/event/comment/${postId}`,
        FormData,
        config,
      );
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });

      dispatch(setAlert('Comment Added', '#4BB543'));
    }

    //navigation.goBack();
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// delete comment
export const deleteComment = (postId, commentId, navigation) => async (
  dispatch,
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    await axios.delete(
      `https://hear--me--out.herokuapp.com/api/posts/job/comment/${postId}/${commentId}`,
      config,
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Removed', '#4BB543'));
    navigation.goBack();
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// allow relevant
export const allowRelevant = (postId, post_type) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    if (post_type === 'job') {
      const res = await axios.put(
        `http://hear--me--out.herokuapp.com/api/posts/job/relevant/${postId}`,
        {},
        config,
      );
      dispatch({
        type: ALLOW_RELEVANT,
        payload: res.data,
      });
    } else if (post_type === 'event') {
      const res = await axios.put(
        `http://hear--me--out.herokuapp.com/api/posts/event/relevant/${postId}`,
        {},
        config,
      );

      dispatch({
        type: ALLOW_RELEVANT,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log('Error ', error.message);
  }
};

// allow relevant
export const deleteIrrelevant = (postId, post_type) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    if (post_type === 'job') {
      const res = await axios.delete(
        `http://hear--me--out.herokuapp.com/api/posts/job/${postId}`,
        // {},
        config,
      );
      dispatch({
        type: REMOVE_IRRELEVANT,
        payload: res.data,
      });
    } else if (post_type === 'event') {
      const res = await axios.delete(
        `http://hear--me--out.herokuapp.com/api/posts/event/${postId}`,
        //{},
        config,
      );

      dispatch({
        type: REMOVE_IRRELEVANT,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log('Error ', error.message);
  }
};

// // get questions
// export const getQuestions = () => async (dispatch) => {
//   // const id = '5fecfd0c0b8c072984de733d';
//   try {
//     // const token = await AsyncStorage.getItem('token');
//     // //console.log('Pehla', remarks);
//     // const config = {
//     //   headers: {
//     //     'x-auth-token': token,
//     //   },
//     // };

//     //const body = JSON.stringify({remarks});
//     // const postid = '6002f75c8352c9272089ccd1';
//     // const faqsid = '5ff73229f05f6825e4eddadc';

//     const res = await axios.get(
//       `http://10.0.2.2:3000/api/posts/faqs/${postid}/${faqsid}`,
//       config,
//     );
//     //   dispatch(setAlert('Review Added', '#4BB543'));
//     dispatch({
//       type: GET_POSTS,
//       payload: res.data,
//     });
//     // console.log(res.data);
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: {msg: err.response.statusText, status: err.response.status},
//     });
//   }
// };

// add answers
// export const addAnswers = (FormData, id, faqid) => async (dispatch) => {
//   // console.log('Data', FormData);
//   // console.log(id);
//   // console.log(faqid);
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': token,
//       },
//     };
//     const res = await axios.put(
//       `http://10.0.2.2:3000/api/posts/faqs/${id}/${faqid}`,
//       FormData,
//       config,
//     );
//     dispatch(setAlert('Answers Submitted', '#4BB543'));
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
//     }
//     if (err.response.status === 400)
//       dispatch(setAlert('Already Attempted', '#F72F4D'));
//   }
// };
