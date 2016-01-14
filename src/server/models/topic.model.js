var mongoose    = require('mongoose');
var Question = require("./question.model");

var topicSchema = new mongoose.Schema({
    title       : String,
    description : String,
    questions       : [
        Question
    ]
});

module.exports = mongoose.model('Topic', topicSchema);