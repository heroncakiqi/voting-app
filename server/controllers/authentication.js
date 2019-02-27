const jwt = require('jwt-simple');
const validator = require('validator');
const User = require('../models/User');
const passportSevice = require('../services/passport');
const passport = require('passport');
const config = require('../config');

// signun new users
exports.signup = async (req, res, next) => {
  try{
    // find if a user exists whith that email
    const user = await User.findOne({ email: req.body.email });
    // if a user exists, return error
    if(user) return res.status(422).json({ email: "Email is in use" });
    // create and save the new user record
    const newUser = new User(req.body);
    await newUser.save();
    // set new user tokem
    const token = jwt.encode({ sub: newUser._id, iat: new Date().getTime() }, config.secret)
    // return new users token
    res.json({ token });
  } catch(err) {
    return err
  }
}

//login users
exports.login = async (req, res, next) => {
  passport.authenticate('local', { session: false },function(error, user, info) {
    if (error) { return res.status(422).json({error}); }
    if (!user) { return res.status(422).json({info}); }
    const token = jwt.encode({ sub: user._id, iat: new Date().getTime() }, config.secret);
    res.json({ token });
  })(req, res, next);
}


// validate middleware
exports.validateSingup = (req, res, next) => {
  const errors = {};
  if(!req.body.password) {
    errors.password = 'you must provide a password!'
  }
  if(!req.body.email) {
    errors.email = 'you must provide an email!'
  }
  else if(!validator.isEmail(req.body.email)) {
    errors.email = 'That email is not valid'
  }
  
  return isEmpty(errors) ? next() : res.status(422).json(errors);
}


function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
} 