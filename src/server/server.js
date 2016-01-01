
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve('./src/client/')));
app.use(express.static(path.resolve('./dist/public')));

app.get('/', function (req, res) {
    var path2 = path.resolve('./src/client/index.html');
    console.log(path2);
    res.sendFile(path2);
});

// TODO change this out of source once we have a production enviroment
// This is a hack for HTML 5 mode
app.use(function(req, res) {
    res.sendfile('./src/client/index.html');
});

module.exports = app;