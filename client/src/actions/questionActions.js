import axios from 'axios';
import {reset} from 'redux-form';

import store from '../store';

import { 
  FETCH_DATA, 
  SELECT_QUESTION, 
  DATA_FETCH_ERROR, 
  VOTING_ERROR, 
  CLEAR_ERRORS,
  VOTING_SUCCESS,
  ADD_QUESTION,
  CREATE_QUESTION_ERROR,
  TOOGLE_LOADING,
  UPDATE_LIST,
  DELETE_QUESTION
} from './types';

export const fetchData = (token) => async dispatch => {
  try{
    dispatch({
      type: TOOGLE_LOADING,
      payload: { questionsLoading: true }
    })

    if(token) {
      const { data } = await axios.get('https://server-iiunqymrrz.now.sh/api/user/questions', {
       headers: {
          Authorization: token
        }
      });
      dispatch({
        type: FETCH_DATA,
        payload: data
      });
    } else {
      const { data } = await axios.get('https://server-iiunqymrrz.now.sh/question');
      dispatch({
        type: FETCH_DATA,
        payload: data
      });
    }
    dispatch({
      type: TOOGLE_LOADING,
      payload: { questionsLoading: false }
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
    dispatch({
      type: TOOGLE_LOADING,
      payload: { voatingLoading: true }
    });
    dispatch({type: CLEAR_ERRORS});
    const token = store.getState().auth.authenticated || '';
    const { data } = await axios.get(`https://server-iiunqymrrz.now.sh/api/vote/${questionId}/${optionId}`, {
      headers: {
        Authorization: token
      }
    });
    const prev = store.getState().activeQuestion.options.find(item => item._id === optionId) || {count: 0};
    
    dispatch({
      type: UPDATE_LIST,
      payload: data
    })
    dispatch({
      type: SELECT_QUESTION,
      payload: data
    }); 
    const post = store.getState().activeQuestion.options.find(item => item._id === optionId);
      dispatch({
        type: VOTING_SUCCESS,
        payload: prev.count < post.count ? `you voted for ${post.text}!` : `you took your vote back!`
      }); 
  }catch(err){
    if(err.response){
      dispatch({
        type: VOTING_ERROR,
        payload: err.response.data
      });
    } else {
      console.log(err)
    }
  }
  dispatch({
    type: TOOGLE_LOADING,
    payload: { voatingLoading: false }
  })
}

export const addQuestion = (formProps, cb) => async dispatch => {
  const token = store.getState().auth.authenticated || '';
  try{
    dispatch({
      type: TOOGLE_LOADING,
      payload: { addingQuestionLoading: true }
    })
    const { data } = await axios.post('https://server-iiunqymrrz.now.sh/question', formProps, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: ADD_QUESTION,
      payload: data
    });
    dispatch({
      type: SELECT_QUESTION,
      payload: data
    });
    cb();
  }catch(err) {
    dispatch({
      type: CREATE_QUESTION_ERROR,
      payload: err.response.data
    })
  }
  dispatch({
    type: TOOGLE_LOADING,
    payload: { addingQuestionLoading: false }
  })
  dispatch(reset('newQuestion'))
}


export const deleteQuestion = (questionId) => async dispatch => {
  const token = store.getState().auth.authenticated || '';
  const { data } = await axios.delete(`https://server-iiunqymrrz.now.sh/api/delete/${questionId}`, {
    headers: {
      Authorization: token
    }
  });
  dispatch({
    type: DELETE_QUESTION,
    payload: data._id
  });
}

export const createOption = (option, questionId) => async dispatch => {
  try{
  const token = store.getState().auth.authenticated || '';
  const { data } = await axios.post(`https://server-iiunqymrrz.now.sh/api/option/${questionId}`,{
    option: option
  }, {
    headers: {
      Authorization: token
    }
  });
 dispatch(vote(questionId,data._id));

  } catch(err) {
    dispatch({
      type: TOOGLE_LOADING,
      payload: { voatingLoading: false }
    })
    const errText = err.response.data == "Unauthorized" ? {error: 'You must have an account to add options!'}: err.response.data
      dispatch({
        type: VOTING_ERROR,
        payload: errText
      });
  }
}

export const clearMessages = () =>  {
  return {
    type: CLEAR_ERRORS
  }
}

export const setLoading = () => {
  return {
    type: TOOGLE_LOADING,
    payload: true,
  }
}