
module.exports = function(app, passport) {

    app.get('/auth/google', function (req, res) {
        passport.authenticate('google', {scope: ['profile', 'email']})
    });

// the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google'));

};