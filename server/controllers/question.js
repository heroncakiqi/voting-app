const passportSevice = require('../services/passport');
const passport = require('passport');
const mongoose = require('mongoose');

const Question = require('../models/Question');
const Option = mongoose.model("Option");

exports.postQuestion = async (req, res) => {
    // get question data from user
    const questionData = {
      text: req.body.text,
      author: req.user
    }
    // create question model
    const question = new Question(questionData);
    // get options from user
    const reqArry = req.body.options.split('-');

    if(reqArry.length < 2) {
      return res.status(400).json({error: 'you must provide two or more options'})
    }

    const optionsToAdd = reqArry.map(item =>  {
      return new Option({
        text: item
      });
    });

    question.options = optionsToAdd;
    await question.save();
    const questions = await Question.find();
    // show the savet question with it options
    res.status(200).json(questions);
}

exports.getQuestions = async (req, res) => {
  try{
    // find all question and show dem
    const questions = await Question.find(); 
    res.json(questions);
  }catch(err){
    res.json(err)
  }
}

 exports.addVote = async (req, res, next) => {
   //authentication middleware
   passport.authenticate('jwt', { session: false },async function(error, user, info) {
       // get the id of the option to vote
        const { optionId, questionId } = req.params;
        // find the option via the id provided
        const isQuestion = await Question.findOne({_id: questionId});
        const isOption = isQuestion.options.find(item => item.id === optionId);
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const voteData = user ? user._id.toString() : ip;
        if(isOption.votes.includes(voteData)) {
          const voteToRemoveO = isOption.votes.indexOf(voteData);
          const voteToRemoveQ = isQuestion.votes.indexOf(voteData);
          isOption.votes.splice(voteToRemoveO,1);
          isQuestion.votes.splice(voteToRemoveQ,1);
          isOption.count = isOption.count - 1
        } else{
          if(isQuestion.votes.includes(voteData)){ 
            return res.status(400).json({error: 'you cannot vote for more than one option'})
          }
         isOption.votes.push(voteData);
         isQuestion.votes.push(voteData);
         isOption.count = isOption.count + 1
        }
        await isQuestion.save();
        res.json(isQuestion);
   })(req, res, next);
 } 

exports.addOption = async (req, res) => {
  try {
    const userId = req.user._id;
    // get the question via the id provided
    const question = req.params.question;
    // get the option from the sent body
    const option = req.body.option;
    //check if the question exist
    const isQuestion = await Question.findOne({_id: question});
    // return err if not
    if(!isQuestion) return res.status(404).json({error: 'cannot find question'});
    if(isQuestion.votes.includes(userId.toString())) {
      return res.status(400).json({error: 'you cannot vote for more than one option'});
    }
    if(!option) return res.status(400).json({error: 'option not provided'});
    // creat the option model and save it
    const newOption = new Option({text:option});
    // add the option to the question
    const questionToAdd = await Question.findByIdAndUpdate(question, 
      { $addToSet: {options: newOption} },
      { new: true }
    );
    // return the updatet question
    res.json(newOption);
  }catch(err) {
    res.json(err);
  }
}

exports.usersQuestions = async (req, res) => {
  const user = req.user._id;

  const questions = await Question.find({author: user});
  if(!questions) return res.status(404).json({error: 'no data found from this user'});
  res.json(questions);
}

exports.deleteQuestion = async (req, res) => {
  const userId = req.user._id;
  const isQuestion = await Question.findOne({_id: req.params.questionId});
  if(!isQuestion) return res.status(400).json({error: 'item does not exist'});
  if(!isQuestion.author.equals(userId)) return res.status(400).json({error: 'you cannot do that!'});
  await Question.findOneAndDelete({_id: req.params.questionId});
  res.json({success: 'item deleted!'});
}