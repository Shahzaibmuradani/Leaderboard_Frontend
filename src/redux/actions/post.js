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
  ADD_RESPONSE,
} from './types';

//import setAuthToken from '../utils/setAuthToken';
import {setAlert} from './alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

var fcm =
  ' d2tZSzHBSGamCV1kU2aRRz:APA91bEbZDry8Wf9o-eVWnR13mD22D-FLBYxxn_-L-tUxK9H1c91kGoTRGq9my13bAIg3AaIE4uVgbrbP5PjN6PI2uMRA1XEuIg-Y5NmAQtvC-yg2oV9zl5AW04Op0ujGq2MOTFWQJlg';

var fcmOne =
  'dn8SZQFVTc2y0GDWsPy_7a:APA91bEwS88IWejr8NepcK8ZWY2A-SnECaBDHL7KkCK_1cWJBlUcPx4zo82oyRnQnPC-34czpeIxQVgIYh0T52TyyQdX5-keUXpzu6UYrzSDLgTb3-0jPeAdWcyeUN5RjCFnaMJCWy4u';

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

export const notify = (text, field, location, post_type) => async () => {
  try {
    let headers = new Headers({
      Authorization:
        'key=AAAAjrYfvfg:APA91bFz7jsCfqv_PlMYdWJbBFyDXaUKBGm2-Md4eWRGWzT9ENvorlL-9DrpBhImssmjQ0I1fvE6uONfKbkeMpJ5r2vIPYGf7zbZ24sxJ-GVWLnkcleIdqgv6OfDut2zk01SQLuJ_EhJ',
      'Content-Type': 'application/json',
    });
    var type = post_type.charAt(0).toUpperCase() + post_type.slice(1);

    const message = {
      to: fcmOne,
      notification: {
        title: `Check the Latest ${type} Post`,
        body: text + '\n' + field + '\n' + location,
        mutable_content: true,
        sound: 'default',
      },

      data: {
        url: '<url of media image>',
        dl: '<deeplink action on tap of notification>',
      },
    };

    let response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers,
      body: JSON.stringify(message),
    });

    console.log('response====>', response);
  } catch (error) {
    console.log(error.message);
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
    dispatch(
      notify(
        FormData.text,
        FormData.field,
        FormData.location,
        FormData.post_type,
      ),
    );
    navigation.navigate('MyPosts');
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
    dispatch(
      notify(
        FormData.text,
        FormData.field,
        FormData.location,
        FormData.post_type,
      ),
    );
    navigation.navigate('MyPosts');
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
  navigation,
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

    navigation.goBack();
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// delete comment
export const deleteComment = (postId, commentId, type, navigation) => async (
  dispatch,
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    if (type === 'job') {
      await axios.delete(
        `https://hear--me--out.herokuapp.com/api/posts/job/comment/${postId}/${commentId}`,
        config,
      );
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });
      dispatch(setAlert('Comment Removed', '#4BB543'));
    } else {
      await axios.delete(
        `https://hear--me--out.herokuapp.com/api/posts/event/comment/${postId}/${commentId}`,
        config,
      );
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });
      dispatch(setAlert('Comment Removed', '#4BB543'));
    }

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

export const addAnswers = (formData, postId, navigation) => async (
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
      `http://hear--me--out.herokuapp.com/api/posts/test/${postId}`,
      formData,
      config,
    );
    dispatch({
      type: ADD_RESPONSE,
      payload: {postId, responses: res.data, navigation},
    });
    // dispatch(setAlert('Answers Submitted', '#4BB543'));
    navigation.goBack();
  } catch (error) {
    console.log(error.message);
  }
};
