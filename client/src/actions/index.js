import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';



export const signup = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:6969/signup', formProps);  
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
}

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const login = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:6969/login', formProps);  
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
}

export const removeError = () => {
  return {
    type: AUTH_ERROR,
    payload: ''
  }
}