var mongoose    = require('mongoose');


var questionSchema = new mongoose.Schema({
    title           : {type : String, unique : true},
    topic           : String,
    top_headings    : Boolean,
    side_headings   : Boolean,
    question        : String,
    table           : [[String]]
});

module.exports = mongoose.model('Question', questionSchema);