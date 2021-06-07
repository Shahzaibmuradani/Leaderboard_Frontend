import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_POSTS,
} from '../actions/types';

//import setAuthToken from '../utils/setAuthToken';
import {setAlert} from '../actions/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Load User
export const loadUser = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
    const res = await axios.get(
      'https://hear--me--out.herokuapp.com/api/auth',
      config,
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({name, email, password, status}) => async (
  dispatch,
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({name, email, password, status});

    const res = await axios.post(
      'https://hear--me--out.herokuapp.com/api/users',
      body,
      config,
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({email, password});

    const res = await axios.post(
      'https://hear--me--out.herokuapp.com/api/auth',
      body,
      config,
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
  // navigation.navigate('AppDrawerScreen');
};

// Log User
export const log = (navigation) => async () => {
  try {
    await navigation.navigate('AppDrawerScreen');
  } catch (err) {
    console.log(err.message);
  }
};

// add review
// export const getReviews = (remarks, postid, navigation) => async (dispatch) => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': token,
//       },
//     };

//     const body = JSON.stringify({remarks});

//     const res = await axios.put(
//       `https://hear--me--out.herokuapp.com/api/posts/job/review/${postid}`,
//       body,
//       config,
//     );
//     console.log('Response :', res.data);
//     dispatch(setAlert('Review Added', '#4BB543'));
//     navigation.goBack();
//     // dispatch({
//     //   type: REVIEWS,
//     //   payload: res.data,
//     // });
//     // console.log('Asal wala', res.data);
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
//     }
//     if (err.response.status === 400)
//       dispatch(setAlert('Already Reviewed', '#F72F4D'));
//   }
// };

// add faqs
// export const addFaqs = (FormData, postid) => async (dispatch) => {
//   // const body = JSON.stringify({remarks});
//   // const id = '5fecfd0c0b8c072984de733d';
//   try {
//     const token = await AsyncStorage.getItem('token');
//     // console.log('Pehla', FormData);
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': token,
//       },
//     };

//     const {q1, q2, q3} = FormData;

//     const data = {
//       q1: q1,
//       q2: q2,
//       q3: q3,
//     };

//     const res = await axios.put(
//       `http://10.0.2.2:3000/api/posts/faqs/${postid}`,
//       data,
//       config,
//     );
//     dispatch(setAlert('Faqs Added', '#4BB543'));
//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
//     }
//     if (err.response.status === 400)
//       dispatch(setAlert('Already Added', '#F72F4D'));
//   }
// };

// Logout / Clear Profile
export const logout = (navigation) => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: CLEAR_POSTS,
  });

  navigation.navigate('Login');
};
