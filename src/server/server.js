
var Express = require('express');
var path = require('path');
var app = Express();

    //static serving of all client-side files
app.use(Express.static(path.resolve('./src/client/')));
app.use(Express.static(path.resolve('./dist/public')));

    //APIs
app.use("/", require("./routes/category.routes"));

    //HTML5 mode enabling route for client-side routing
var index = path.resolve('./src/client/index.html');
app.all('/*', function(req, res) {
    res.sendFile(index);
});

module.exports = app;