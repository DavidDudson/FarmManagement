var mongoose    = require('mongoose');

var topicSchema = new mongoose.Schema({
    title       : {type : String, unique : true},
    description : String,
    category    : String
});

module.exports = mongoose.model('Topic', topicSchema);