const required_questions = require('../constants/required');
const Question = require('../models/Question');

let bulk_store = [];
for(let i = 0; i < required_questions.length; i++) {
    let question = new Question();
    question.text = required_questions[i];
    bulk_store.push(question);
}

Question.findManyByText(required_questions)
 .then(function(documents) {
     if(documents.length === 0) {
        Question.insertMany(bulk_store)
        .then(function(doc) {
            console.log(doc);
        })
        .catch(function(error) {
            console.log(error);
        });
     }
 })
 .catch(function(error) {
     console.log(error);
 })


