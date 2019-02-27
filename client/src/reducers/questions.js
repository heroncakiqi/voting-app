import { FETCH_DATA, ADD_QUESTION } from '../actions/types.js';
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case FETCH_DATA:
    case ADD_QUESTION:
      return action.payload;
    default:
      return state;
  }
}