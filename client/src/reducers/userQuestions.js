import { FETCH_USER_DATA } from '../actions/types.js';
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case FETCH_USER_DATA:
      return action.payload;
    default:
      return state;
  }
}