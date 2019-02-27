const express = require('express');
const router = express.Router();
const passportSevice = require('./services/passport');
const passport = require('passport');

// controllers and middlewares
const authentication = require('./controllers/authentication');
const questions = require('./controllers/question');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// signup route
router.post('/signup',authentication.validateSingup, authentication.signup);

// login route
router.post('/login', authentication.login);

// post question
router.post('/question', requireAuth, questions.postQuestion);

// get all question 
router.get('/question/', questions.getQuestions);

// vote for an option
router.get('/api/vote/:questionId/:optionId', questions.addVote);

router.delete('/api/delete/:questionId', requireAuth, questions.deleteQuestion);

// add option
router.post('/api/option/:question',requireAuth, questions.addOption);

// get users questions 
router.get('/api/user/questions', requireAuth, questions.usersQuestions);

module.exports = router;