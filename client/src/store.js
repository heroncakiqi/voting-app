import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import Thunk from 'redux-thunk';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const INITIAL_STATE = {
  auth: {
    authenticated: localStorage.getItem('token')
  }
}

const store = createStore(reducers, INITIAL_STATE,
  compose(
    applyMiddleware(Thunk),
    reduxDevTools
  )
);

export default store