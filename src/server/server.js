
var Express = require('express');
var path = require('path');
var app = Express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/farmfi");


    //static serving of all client-side files
app.use(Express.static(path.resolve('./src/client/')));
app.use(Express.static(path.resolve('./dist/public')));

    //APIs
app.use("/", require("./data/category/category.routes"));
app.use("/", require("./data/topic/topic.routes"));
app.use("/", require("./data/question/question.routes"));

    //HTML5 mode enabling route for client-side routing
var index = path.resolve('./src/client/index.html');
app.all('/*', function(req, res) {
    res.sendFile(index);
});

module.exports = app;