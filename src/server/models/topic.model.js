var mongoose    = require('mongoose');
var Question = require("./question.model");

var topicSchema = new mongoose.Schema({
    title       : {type : String, unique : true},
    description : String,
    questions   : [Question]
});

module.exports = mongoose.model('Topic', topicSchema);