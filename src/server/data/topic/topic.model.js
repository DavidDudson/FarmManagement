var mongoose    = require('mongoose');

var topicSchema = new mongoose.Schema({
    title       : String,
    description : String,
    category    : String
});

module.exports = mongoose.model('Topic', topicSchema);