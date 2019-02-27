const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
  }
});

// hash user password before saving
userSchema.pre('save',  function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if(err) return next(err);
      this.password = hash
      next();
    })
  })
});

module.exports = mongoose.model("User", userSchema);
