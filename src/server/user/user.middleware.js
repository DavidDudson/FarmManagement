/**
 * Filename:    authentication.js
 * Package:     Middleware
 * Author:      Anthony Crowcroft
 *              Fourth Wall
 * Created:     25/08/15.
 */


exports.isAdmin = function(req, res, next) {
    if(req.isAuthenticated() && req.user.meta.privilege >= 5) {
        next()
    } else {
        res.redirect('/noauth');
    }
};

exports.isStaff = function(req, res, next) {
    if(req.isAuthenticated() && req.user.meta.privilege >= 3) {
        console.log("made it");
        next()
    } else {
        res.redirect('/noauth');
    }
};

exports.isClient = function(req, res, next) {
    if(req.isAuthenticated() && req.user.meta.privilege <= 1) {
        next()
    } else {
        res.redirect('/noauth');
    }
};
