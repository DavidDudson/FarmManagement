
var Express = require('express');

var router = Express.Router();

var example = require('./../../example.json');

var _ = require('lodash');

//Define variables up here so they cache, rather than inside the get block
var categories = JSON.parse(JSON.stringify(example)).categories;

var categorySummary = JSON.parse(JSON.stringify(example));
categorySummary.categories.forEach(c => delete c.topics);


    //get
router.get("/category", (req, res) => {
    res.json(categorySummary)}
);

router.get("/category/:id", (req, res) => {
    res.json(_.get(_.find(categories, c => c.id == req.params.id), "topics"))
});

    //create
router.post("/category/:id", (req, res) => {
    var newObj = req.data;
    newObj.id = 99;  //assign valid ID done by database
    categories.push(newObj);
    res.json({"id": newObj.id})
});

    //update
router.put("/category/:id", (req, res) => {
    var newObj = req.data;
    // update database
    res.sendStatus(200);
});

    //delete
router.delete("/category/:id", (req, res) => {
    _.get(_.find(categories, c => c.id == req.params.id(delete c)));
    res.sendStatus(200);
});

module.exports = router;