const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');


const User = require('../models/User');

// setup local strategy for users to login
const localLogin = new LocalStrategy({usernameField: 'email'}, async (email, password, next) => {
  try {
  const user = await User.findOne({email: email});
  if(!user) return next("wrong email or password", false);
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return next("wrong email or password", false);
  return next(null, user)
  } catch(err) {
    next(err, false);
  }
});


// setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};
 
// create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, next) => {
  try{
    // find the user with the providet jwt token
    const user = await User.findById(payload.sub);
    if(!user) return next(null, false);
    if(user) return next(null, user);
  } catch(err){
    next(err, false);
  }
});

// tell passport to use the strategy
passport.use(jwtLogin);
passport.use(localLogin);