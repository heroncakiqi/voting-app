const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const OptionSchema = new Schema({
  text: String,
  votes: [String],
  count: {
    type: Number,
    default: 0
  }
});

OptionSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.votes;
  return obj;
 }

mongoose.model("Option", OptionSchema);
module.exports = OptionSchema;