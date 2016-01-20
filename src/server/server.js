
var Express = require('express');
var path = require('path');
var app = Express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/farmfi");
require("./../database")();

    //static serving of all client-side files
app.use(Express.static(path.resolve('./src/client/')));
app.use(Express.static(path.resolve('./dist/public')));

    //APIs
app.use("/", require("./routes/category.routes"));
app.use("/", require("./routes/topic.routes"));
app.use("/", require("./routes/question.routes"));

    //HTML5 mode enabling route for client-side routing
var index = path.resolve('./src/client/index.html');
app.all('/*', function(req, res) {
    res.sendFile(index);
});

module.exports = app;