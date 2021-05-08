import axios from 'axios';
import {GET_POSTS, POST_ERROR, UPDATE_LIKES} from './types';

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
      `https://hear--me--out.herokuapp.com/api/posts/job`,
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

// export const getPosts = () => async (dispatch) => {
//   try {
//     const token = await AsyncStorage.getItem('token');

//     const config = {
//       headers: {
//         'x-auth-token': token,
//       },
//     };
//     const res = await axios.get(`http://10.0.2.2:3000/api/posts/event`, config);
//     dispatch({
//       type: GET_POSTS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: {msg: err.response.statusText, status: err.response.status},
//     });
//   }
// };

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
export const addAnswers = (FormData, id, faqid) => async (dispatch) => {
  // console.log('Data', FormData);
  // console.log(id);
  // console.log(faqid);
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      `http://10.0.2.2:3000/api/posts/faqs/${id}/${faqid}`,
      FormData,
      config,
    );
    dispatch(setAlert('Answers Submitted', '#4BB543'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    if (err.response.status === 400)
      dispatch(setAlert('Already Attempted', '#F72F4D'));
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
      type: GET_POSTS,
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
      type: GET_POSTS,
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

export const addLike = (id) => async (dispatch) => {
  try {
    console.log(id);
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      `http://hear--me--out.herokuapp.com/api/posts/job/like/${id}`,
      {},
      config,
    );
    console.log('Data ', res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: {postId, like: res.data},
    });
  } catch (error) {
    console.log('Error ', error.message);
  }
};

// export const addLike = (postId) => async (dispatch) => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': token,
//       },
//     };
//     //  console.log(config);

//     const res = await axios.put(
//       `http://10.0.2.2:3000/api/posts/job/like/${postId}`,
//       config,
//     );
//     console.log('Response', res.data);

//     // dispatch({
//     //   type: UPDATE_LIKES,
//     //   payload: {postId, like: res.data},
//     // });

//     //navigation.goBack();
//   } catch (err) {
//     console.log(err.message);
//     // dispatch({
//     //   type: POST_ERROR,
//     //   payload: {msg: err.response.statusText, status: err.response.status},
//     // });
//   }
// };

// remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.put(
      `https://hear--me--out.herokuapp.com/api/posts/job/unlike/${postId}`,
      {},
      config,
    );
    console.log(res.data);

    dispatch({
      type: UPDATE_LIKES,
      payload: {id, like: res.data},
    });

    //navigation.goBack();
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
