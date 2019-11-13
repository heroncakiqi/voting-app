import { FETCH_DATA, ADD_QUESTION, UPDATE_LIST, DELETE_QUESTION } from '../actions/types.js';
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case FETCH_DATA:
      return action.payload;
    case UPDATE_LIST:
        const newState = JSON.parse(JSON.stringify(state));
        const foundIndex = state.findIndex(x => x._id == action.payload._id);
        newState[foundIndex] = action.payload;
      return newState
    case ADD_QUESTION:
      return [...state, action.payload];
    case DELETE_QUESTION:
      const filteredState = state.filter(item => {
        return item._id !== action.payload
      });
      return filteredState;
    default:
      return state;
  }
}