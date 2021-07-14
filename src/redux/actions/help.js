import axios from 'axios';
import qs from 'qs';
import {ADD_QUERIES, GET_QUERIES, QUERIES_ERROR} from '../actions/types';
import {setAlert} from '../actions/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getQueries = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://hear--me--out.herokuapp.com/api/help/faqs`,
    );
    dispatch({
      type: GET_QUERIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: QUERIES_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

export const addQueries = (FormData, navigation) => async (dispatch) => {
  try {
    console.log(FormData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // const body = JSON.stringify({remarks});
    const res = await axios.post(
      `https://hear--me--out.herokuapp.com/api/help/faqs`,
      FormData,
      config,
    );
    dispatch(setAlert('Added Successfully', '#4BB543'));
    navigation.goBack();
    dispatch({
      type: ADD_QUERIES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, '#F72F4D')));
    }
  }
};

export const giveReview = (remarks, postid, navigation) => async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const body = JSON.stringify({remarks});
    await axios.put(
      `https://hear--me--out.herokuapp.com/api/posts/job/review/${postid}`,
      body,
      config,
    );
    navigation.goBack();
  } catch (error) {
    console.log(error.message);
  }
};

// add queries
export const Something = (FormData, _id, navigation) => async (dispatch) => {
  try {
    var count;
    const requestBody = {
      text: FormData,
    };
    const data = qs.stringify(requestBody);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const res = await axios.post(
      `http://text-processing.com/api/sentiment/`,
      data,
      config,
    );
    if (res.data.label === 'pos') {
      count = 10;
    } else if (res.data.label === 'neg') {
      count = 1;
    } else {
      count = 5;
    }
    //navigation.goBack();
    dispatch(setAlert('Response added successfully', '#4BB543'));
    dispatch(giveReview(count, _id, navigation));
  } catch (err) {
    console.log(err.message);
  }
};
