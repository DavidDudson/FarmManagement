
var Express = require('express');

var router = Express.Router();

    //get
router.get("/topic/:id", function(req, res) {
    //TODO waiting on database
    res.json({"message": "to come"});
});

    //create
router.post("/topic/:id", function(req, res) {
    //TODO waiting on database
    res.json({"message": "to come"});
});

    //update
router.put("/topic/:id", function(req, res) {
    //TODO waiting on database
    res.json({"message": "to come"});
});

    //delete
router.delete("/topic/:id", function(req, res) {
    //TODO waiting on database
    res.json({"message": "to come"});
});

module.exports = router;