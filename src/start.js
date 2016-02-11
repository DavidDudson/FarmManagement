// Run the build
require('./build.js')();

var app = require('./server/server.js');

port = process.env.PORT || 9000;

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Example app listening at http://${host}:${port}`);
});

module.exports = app;