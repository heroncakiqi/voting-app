import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, TOOGLE_LOADING } from './types';



export const signup = (formProps, callback) => async dispatch => {
  try {
    dispatch({
      type: TOOGLE_LOADING,
      formLoading: true
    })
    const res = await axios.post('https://server-iiunqymrrz.now.sh/signup', formProps);  
    dispatch({
      type: AUTH_USER,
      payload: res.data.token
      });
    localStorage.setItem('token', res.data.token);
    callback();
   }
   catch(err) {
     dispatch({
       type: AUTH_ERROR,
       payload: err.response.data
     });
   }
   dispatch({
    type: TOOGLE_LOADING,
    formLoading: false
  })
}

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const login = (formProps, callback) => async dispatch => {
  dispatch({
    type: TOOGLE_LOADING,
    formLoading: true
  })
  try {
    const res = await axios.post('https://server-iiunqymrrz.now.sh/login', formProps);  
    console.log(res.data);
    dispatch({
      type: AUTH_USER,
      payload: res.data.token
      });
    localStorage.setItem('token', res.data.token);
    callback();
   }
   catch(err) {
     dispatch({
       type: AUTH_ERROR,
       payload: { password : err.response.data.error  }
     });
   }
   dispatch({
    type: TOOGLE_LOADING,
    formLoading: false
  })
}

export const removeError = () => {
  return {
    type: AUTH_ERROR,
    payload: ''
  }
}