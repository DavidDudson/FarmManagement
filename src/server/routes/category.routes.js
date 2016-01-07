
var Express = require('express');

var router = Express.Router();

var example = require('./example.json');

var _ = require('lodash');

//Define variables up here so they cache, rather than inside the get block
var categories = JSON.parse(JSON.stringify(example)).categories;

var categorySummary = JSON.parse(JSON.stringify(example));
categorySummary.categories.forEach(c => delete c.Topics);


    //get
router.get("/category", function(req, res) {
    console.log(req.query.id);
    //TODO waiting on database
    if (!req.query.id) {
        res.json(categorySummary);
    } else {
        // Double Equals since we are comparing Str to Int
        res.json(_.get(_.find(categories, c => c.id == req.query.id), "Topics"))
    }
});

    //create
router.post("/category/:id", function(req, res) {
    //TODO waiting on database
    console.log(req);
    res.json(_.find(categories, "id", req.id))
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