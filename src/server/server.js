
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

module.exports = app;