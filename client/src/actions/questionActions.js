import axios from 'axios';

import store from '../store';

import { 
  FETCH_DATA, 
  SELECT_QUESTION, 
  DATA_FETCH_ERROR, 
  VOTING_ERROR, 
  CLEAR_ERRORS,
  VOTING_SUCCESS,
  ADD_QUESTION,
  FETCH_USER_DATA,
  CREATE_QUESTION_ERROR,
  DELETE_QUESTION
} from './types';

export const fetchData = () => async dispatch => {
  try{
    const { data } = await axios.get('http://localhost:6969/question');
    dispatch({
      type: FETCH_DATA,
      payload: data
    })
  } catch(err){
    dispatch({
      type: DATA_FETCH_ERROR,
      payload: 'Oops something went wrong loading the page! :('
    })
  }
}

export const selectQuestion = (data) => {
  return {
    type: SELECT_QUESTION,
    payload: data
  }
}

export const vote = (questionId, optionId) => async dispatch => {
  try{
    const token = store.getState().auth.authenticated || '';
    const { data } = await axios.get(`http://localhost:6969/api/vote/${questionId}/${optionId}`, {
      headers: {
        Authorization: token
      }
    });
    const prev = store.getState().activeQuestion.options.find(item => item._id === optionId) || {count: 0};
    dispatch({
      type: SELECT_QUESTION,
      payload: data
    }) 
    dispatch(fetchData());
    dispatch(fetchUserData());
    const post = store.getState().activeQuestion.options.find(item => item._id === optionId);
      dispatch({
        type: VOTING_SUCCESS,
        payload: prev.count < post.count ? `you voted for ${post.text}!` : `you took your vote back!`
      }) 
  }catch(err){
    dispatch({
      type: VOTING_ERROR,
      payload: err.response.data
    });
  }
}

export const addQuestion = (formProps, cb) => async dispatch => {
  const token = store.getState().auth.authenticated || '';
  try{
    const { data } = await axios.post('http://localhost:6969/question', formProps, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: ADD_QUESTION,
      payload: data
    })
    dispatch(fetchUserData());
    cb();
  }catch(err) {
    dispatch({
      type: CREATE_QUESTION_ERROR,
      payload: err.response.data
    })
  }
}

export const fetchUserData = () => async dispatch => {
  const token = store.getState().auth.authenticated || '';
  const { data } = await axios.get('http://localhost:6969/api/user/questions', {
    headers: {
      Authorization: token
    }
  })
  dispatch({
    type: FETCH_USER_DATA,
    payload: data
  });
}

export const deleteQuestion = (questionId) => async dispatch => {
  const token = store.getState().auth.authenticated || '';
  const { data } = await axios.delete(`http://localhost:6969/api/delete/${questionId}`, {
    headers: {
      Authorization: token
    }
  });
  dispatch(fetchUserData());
}

export const createOption = (option, questionId) => async dispatch => {
  try{
  const token = store.getState().auth.authenticated || '';
  const { data } = await axios.post(`http://localhost:6969/api/option/${questionId}`,{option: option}, {
    headers: {
      Authorization: token
    }
  });
 dispatch(vote(questionId,data._id));
  } catch(err) {
      dispatch({
        type: VOTING_ERROR,
        payload: err.response.data
      });
  }
}

export const clearMessages = () =>  {
  return {
    type: CLEAR_ERRORS
  }
}