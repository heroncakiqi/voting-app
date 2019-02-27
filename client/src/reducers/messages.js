import { 
  DATA_FETCH_ERROR, 
  VOTING_ERROR, 
  CLEAR_ERRORS,
  SELECT_QUESTION, 
  VOTING_SUCCESS,
  CREATE_QUESTION_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  loadingError: '',
  votingError: '',
  votingSuccess: '',
  createError: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DATA_FETCH_ERROR:
      return {...state, loadingError:action.payload};
    case VOTING_ERROR:
      return {...state, votingSuccess: '', votingError:action.payload.error}
    case CLEAR_ERRORS:
    case SELECT_QUESTION:
      return {loadingError: '', votingError: '', votingSuccess: '', createError: ''}
    case  VOTING_SUCCESS:
      return {...state, votingSuccess: action.payload};
    case CREATE_QUESTION_ERROR:
      return {...state, createError: action.payload.error}
    default:
      return state;
  }
}