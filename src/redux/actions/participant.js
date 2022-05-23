import axios from 'axios';
import {
  ADD_PARTICIPANT,
  DELETE_PARTICIPANT,
  EDIT_PARTICIPANT,
  GET_PARTICIPANTS,
} from './types';

const url = 'https://leaderboard-participant.herokuapp.com/api/participant';

export const getParticipants = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/0`);
    dispatch({
      type: GET_PARTICIPANTS,
      payload: res.data,
    });
  } catch (err) {
    console.log('Error', err.message);
  }
};

// add participant
export const addParticipant = (FormData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(url, FormData, config);
    dispatch({
      type: ADD_PARTICIPANT,
      payload: res.data,
    });
  } catch (err) {
    console.log('Error', err.message);
  }
};

// edit participant
export const editParticipant = (FormData, _id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`${url}/${_id}`, FormData, config);
    dispatch({
      type: EDIT_PARTICIPANT,
      payload: {_id, user: res.data},
    });
  } catch (err) {
    console.log('Error', err.message);
  }
};

// delete participant
export const deleteParticipant = (_id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/${_id}`);

    dispatch({
      type: DELETE_PARTICIPANT,
      payload: _id,
    });
  } catch (error) {
    console.log('Error ', error.message);
  }
};
