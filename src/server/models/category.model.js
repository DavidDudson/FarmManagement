var mongoose    = require('mongoose');

var categorySchema = new mongoose.Schema({
    title       : {type : String, unique : true},
    description : String
});

module.exports = mongoose.model('Category', categorySchema);