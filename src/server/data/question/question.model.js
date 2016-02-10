var mongoose    = require('mongoose');


var questionSchema = new mongoose.Schema({
    title           : String,
    topic           : String,
    category        : String,
    top_headings    : Boolean,
    side_headings   : Boolean,
    question        : String,
    table           : [[String]]
});

module.exports = mongoose.model('Question', questionSchema);