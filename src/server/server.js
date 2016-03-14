
var Express = require('express');
var path = require('path');
var app = Express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://farmfi:hans23eva25@ds051665.mongolab.com:51665/heroku_g7bpvmg0");

var flash = require('connect-flash');
app.use(flash());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session');
app.use(session({secret  : 'MassEy4ThEw1n'}));

var passport = require('passport');
require('./user/user.logic.js')(passport);
app.use(passport.initialize());
app.use(passport.session());

    //static serving of all client-side files
app.use(Express.static(path.resolve('./src/client/')));
app.use(Express.static(path.resolve('./dist/public')));

    //APIs
app.use("/", require("./data/category/category.routes"));
app.use("/", require("./data/topic/topic.routes"));
app.use("/", require("./data/question/question.routes"));
require("./user/user.routes")(app, passport);

    //HTML5 mode enabling route for client-side routing
var index = path.resolve('./src/client/index.html');
app.all('/*', function(req, res) {
    res.sendFile(index);
});

module.exports = app;