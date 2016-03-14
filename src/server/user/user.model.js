/**
 * Filename:    model.js
 * Package:     User
 * Author:      Anthony Crowcroft
 *              Fourth Wall
 * Created:     27/07/2015
 */

var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');


var userSchema = new mongoose.Schema({
    meta           : {
        firstName         : String,
        lastName          : String,
        created           : Date,
        privilege         : { type: Number, min: 1, max: 5 }
    },
    local          : {
        email        : String,
        password     : String
    },
    facebook       : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter        : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

    // generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

    // checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

    // export model for app to use
module.exports = mongoose.model('User', userSchema);
