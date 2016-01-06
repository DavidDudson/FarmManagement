
var Express = require('express');
var path = require('path');
var app = Express();

    //static serving of all client-side files
app.use(Express.static(path.resolve('./src/client/')));
app.use(Express.static(path.resolve('./dist/public')));

    //APIs
//app.use("/", require("./routes/topic.routes"));
//app.use("/", require("./routes/category.routes"));

    //HTML5 configuration to catch nonexistent routes back to index
var index = path.resolve('./src/client/index.html');
app.all('/*', function(req, res) {
    res.sendFile(index);
});

module.exports = app;