import { TOOGLE_LOADING } from '../actions/types';

const INITIAL_STATE = {
  questionsLoading: true, 
  voatingLoading: '', 
  addingQuestionLoading: false,
  formLoading: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOOGLE_LOADING:
      return {...state, ...action.payload}
    default:
      return state;
  }
}