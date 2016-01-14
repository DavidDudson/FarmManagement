var mongoose    = require('mongoose');


var questionSchema = new mongoose.Schema({
    title       : String,
    question    : String,
    table       : JSON
});

module.exports = mongoose.model('Question', questionSchema);