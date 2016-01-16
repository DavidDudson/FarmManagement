var mongoose    = require('mongoose');


var questionSchema = new mongoose.Schema({
    title       : String,
    question    : String,
    table       : [[String]]
});

module.exports = mongoose.model('Question', questionSchema);