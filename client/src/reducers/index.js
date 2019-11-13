import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import questions from './questions';
import activeQuestion from './activeQuestion';
import messages from './messages';
import userQuestions from './userQuestions';
import loading from './loading';

export default combineReducers({
  auth,
  form,
  questionsList: questions,
  activeQuestion,
  userQuestions,
  messages,
  loading
});