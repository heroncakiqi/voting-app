const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OptionSchema = require('./Options');

const QuestionSchema = new Schema({
  text: String,
  options: [OptionSchema],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  votes: [String]
});


module.exports = mongoose.model("Question", QuestionSchema);