
var Express = require('express');

var router = Express.Router();

    //get
router.get("/category", function(req, res) {
    //TODO waiting on database
    res.json({"message": "to come"});
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