
var Express = require('express');

var router = Express.Router();

var example = require('./example.json');

    //get
router.get("/category", function(req, res) {
    //TODO waiting on database

    response = JSON.parse(JSON.stringify(example)); // Copy the object so we can reuse the example

    response.categories.forEach(c => delete c.Topiczes);

    res.json(response);
});

    //create
router.post("/category/:id", function(req, res) {
    //TODO waiting on database
    res.json({"message": "to come"});
});

    //update
router.put("/category/:id", function(req, res) {
    //TODO waiting on database
    res.json({"message": "to come"});
});

    //delete
router.delete("/category/:id", function(req, res) {
    //TODO waiting on database
    res.json({"message": "to come"});
});

module.exports = router;