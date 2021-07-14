import {
  CLEAR_PROFILE,
  CLEAR_USER,
  //   ACCOUNT_DELETED,
  //   CLEAR_PROFILE,
  GET_PROFILE,
  GET_USER,
  //   GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAlert} from './alert';

// get current profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const res = await axios.get(
      'https://hear--me--out.herokuapp.com/api/profile/me',
      config,
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// get profile
export const getProfile = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://hear--me--out.herokuapp.com/api/profile/user/${userId}`,
    );
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
    //console.log(res.data);
  } catch (err) {
    dispatch({type: CLEAR_USER});
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// create and update profile
export const createProfile = (FormData, edit, navigation) => async (
  dispatch,
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.post(
      'https://hear--me--out.herokuapp.com/api/profile',
      FormData,
      config,
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', '#4BB543'));
    navigation.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// add education
export const addEducation = (FormData, navigation) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      'https://hear--me--out.herokuapp.com/api/profile/education',
      FormData,
      config,
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', '#4BB543'));
    navigation.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//   // add experience
export const addExperience = (FormData, navigation) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.put(
      'https://hear--me--out.herokuapp.com/api/profile/experience',
      FormData,
      config,
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', '#4BB543'));
    navigation.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// edit education
export const editEducation = (FormData, id, navigation) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      `https://hear--me--out.herokuapp.com/api/profile/education/${id}`,
      FormData,
      config,
    );

    dispatch(setAlert('Education Updated', '#4BB543'));
    dispatch({
      type: CLEAR_PROFILE,
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    navigation.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// edit experience
export const editExperience = (FormData, id, navigation) => async (
  dispatch,
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    const res = await axios.put(
      `https://hear--me--out.herokuapp.com/api/profile/experience/${id}`,
      FormData,
      config,
    );

    dispatch(setAlert('Experience Updated', '#4BB543'));
    dispatch({
      type: CLEAR_PROFILE,
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    navigation.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//   export const getProfiles = () => async (dispatch) => {
//     dispatch({ type: CLEAR_PROFILE });
//     try {
//       const res = await axios.get('/api/profile');
//       dispatch({
//         type: GET_PROFILES,
//         payload: res.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   // Delete experience
//   export const deleteExperience = (id) => async (dispatch) => {
//     try {
//       const res = await axios.delete(`/api/profile/experience/${id}`);

//       dispatch({
//         type: UPDATE_PROFILE,
//         payload: res.data,
//       });

//       dispatch(setAlert('Experience Removed', 'danger'));
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   // Delete Education
//   export const deleteEducation = (id) => async (dispatch) => {
//     try {
//       const res = await axios.delete(`/api/profile/education/${id}`);

//       dispatch({
//         type: UPDATE_PROFILE,
//         payload: res.data,
//       });

//       dispatch(setAlert('Education Removed', 'danger'));
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

//   export const deleteAccount = () => async (dispatch) => {
//     if (window.confirm('Are you sure? This action can Not be undone')) {
//       try {
//         await axios.delete('/api/profile');

//         dispatch({ type: CLEAR_PROFILE });
//         dispatch({ type: ACCOUNT_DELETED });

//         dispatch(setAlert('Your account has been permanently deleted'));
//       } catch (err) {
//         dispatch({
//           type: PROFILE_ERROR,
//           payload: { msg: err.response.statusText, status: err.response.status },
//         });
//       }
//     }
//   };
