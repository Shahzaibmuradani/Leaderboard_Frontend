import axios from 'axios';
import qs from 'qs';
import {ADD_QUERIES, GET_QUERIES, QUERIES_ERROR} from '../actions/types';

//import setAuthToken from '../utils/setAuthToken';
import {setAlert} from '../actions/alert';

// get queries
export const getQueries = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://10.0.2.2:3000/api/help`);
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

// add queries
export const addQueries = (FormData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // const body = JSON.stringify({remarks});
    const res = await axios.post(
      `http://10.0.2.2:3000/api/help`,
      FormData,
      config,
    );
    dispatch(setAlert('Added Successfully', '#4BB543'));
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

// add queries
export const Something = (FormData) => async () => {
  try {
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
      console.log('Positive : ' + 10);
    } else if (res.data.label === 'neg') {
      console.log('Negative : ' + 1);
    } else {
      console.log('Neutral : ' + 5);
    }
  } catch (err) {
    console.log(err.message);
  }
};
