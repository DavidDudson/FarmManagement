/**
 * Filename:    config.js
 * Package:     User
 * Author:      Anthony Crowcroft
 *              Fourth Wall
 * Created:     02/08/15.
 */

var Promise = require("bluebird");
var User    = Promise.promisifyAll(require("./user.model"));

    // create admin account from the server.config.json
module.exports = function() {
    Promise.map(config, function(user) {
        User.findOne({"local.email": user.email}, function(err, result){

            if(!result) {
                var newUser = new User();
                newUser.local.email      = user.email;
                newUser.local.password   = newUser.generateHash(user.password);
                newUser.meta.privilege   = user.privilege;
                newUser.meta.firstName   = user.firstName;
                newUser.meta.created     = Date.now();
                newUser.save(function(err) {
                    if(!err) {
                        console.log("account created for " + user.email);
                    }
                });
            }
            else {
                console.log("account already existing for " + user.email);
            }
        });
    });
};