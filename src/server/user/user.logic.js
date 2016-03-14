/**
 * Filename:    logic.js
 * Package:     User
 * Author:      Anthony Crowcroft
 *              Fourth Wall
 * Created:     29/07/15.
 */

var LocalStrategy   = require('passport-local').Strategy;
var User            = require('./user.model');

module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use("local-login", new LocalStrategy({
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true
    }, function(req, email, password, done) {
        if(email) {
            email = email.toLowerCase();
        }
        process.nextTick(function() {
            User.findOne({"local.email": email}, function(err, result) {

                if(!result) {
                    return done(null, false);
                }

                if(!result.validPassword(password)) {
                    return done(null, false);
                }

                else {
                    return done(null, result);
                }
            });
        });

    }));

    passport.use("local-signup", new LocalStrategy({
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true
    }, function(req, email, password, done) {
        if(email) {
            email = email.toLowerCase();
        }
        process.nextTick(function() {
            User.findOne({"local.email": email}, function(err, result) {

                if(result) {
                    return done(null, false);
                }
                else {
                    var newUser = new User();
                    newUser.local.email     = email;
                    newUser.local.password  = newUser.generateHash(password);
                    newUser.meta.privilege  = 1;
                    newUser.meta.firstName  = nameTidy(req.body.name)[0];
                    newUser.meta.lastName   = nameTidy(req.body.name)[1];
                    newUser.meta.created    = Date.now()
                }

                newUser.save(function(err) {
                    if(!err) {
                        console.log("account created for " + email);
                    }
                    return done(null, newUser);
                });

            });
        });

    }));

    var isAuthenticated = function(req, res, next) {
        if(allgood) {
            return next();
        }
        res.send("not authenticated");
    };
};

    // tidy up name input into first and last names
var nameTidy = function(name) {
    var last = name.split(" ").pop();
    var first = name.split((" " + last))[0];
    return [first, last];
};