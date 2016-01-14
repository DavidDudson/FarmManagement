var mongoose    = require('mongoose');
var Topic = require("./topic.model");

var categorySchema = new mongoose.Schema({
    title       : String,
    description : String,
    topics      : [
        Topic
    ]
});

module.exports = mongoose.model('Category', categorySchema);