var mongoose    = require('mongoose');
var Topic = require("./topic.model");

var categorySchema = new mongoose.Schema({
    title       : {type : String, unique : true},
    description : String,
    topics      : [Topic]
});

module.exports = mongoose.model('Category', categorySchema);