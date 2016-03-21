/**
 * Filename:    routes.js
 * Package:     User
 * Author:      Anthony Crowcroft
 *              Fourth Wall
 * Created:     27/07/15.
 */

module.exports = function(app, passport) {


        // login user
    app.post("/local/login", function (req, res) {
        passport.authenticate('local-login', function(err, user) {
            if(!user) {
                console.log("Couldn't Login");
                res.send("login failed");
            }
            if(user) {
                req.logIn(user, function(err) {
                    if(!err) {
                        console.log("User Logged In");
                        return res.json({user: req.user});
                    }
                });
            }
        })(req, res);
    });
    app.get("/local/check", function (req, res) {
        console.log(req.user);
        res.json({data: req.user});

    });
        // signup new user
    //app.post("/local/signup", function (req, res) {
    //    passport.authenticate('local-signup', function(err, user) {
    //        if(!user) {
    //            res.send("signup failed");
    //        }
    //        if(user) {
    //            res.send("signup was successful");
    //        }
    //    })(req, res);
    //});

        // logout user
    app.post("/local/logout", function (req, res) {
        req.logout();
        res.send("GoodBye");
    });
};
