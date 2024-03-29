
var Express = require('express');

var router = Express.Router();

var Promise = require("bluebird");
var Topic = Promise.promisifyAll(require("./topic.model"));
var Question = Promise.promisifyAll(require("../question/question.model"));

router.get("/topics", (req, res) => {
    Topic.find({}, function(err, result){}).exec()
        .then(function(data){
            res.json(data);
        });
});

    //get
router.get("/top/:id", (req, res) => {
    Topic.findOne({"_id": req.params.id}, function(err, result){}).exec()
        .then(function(tData) {
            if(tData) {
                var fndTop = tData;
                Question.find({"topic": fndTop._id}, function(err, result){}).exec()
                    .then(function(qData) {
                        if(qData) {
                            fndTop.questions = qData;
                        }
                        res.json(fndTop);
                    });
            }
            if(!tData) {
                res.sendStatus(400);
            }
        });
});

    //create
router.post("/top", (req, res) => {
    if(req.body.title) {
        Topic.findOne({"title": req.body.title}, function(err, result){}).exec()
            .then(function(data) {
                if(!data) {
                    var newObj = new Topic(req.body);
                    newObj.save(function(err) {
                        if(!err) {
                            res.json(newObj._id);
                        }
                    });
                }
                if(data) {
                    res.sendStatus(418);
                }
            });
    }
});

    //update
router.put("/top/:id", (req, res) => {
    Topic.update({"_id": req.params.id}, req.body, function(err, result){}).exec()
        .then(function(data) {
            if(data) {
                res.sendStatus(200);
            }
            if(!data) {
                res.sendStatus(400);
            }
        });
});

    //delete
router.delete("/top/:id", (req, res) => {
    Topic.remove({"_id": req.params.id}, function(err){}).exec()
        .then(function() {
            Question.remove({"topic": req.params.id}, function(err){}).exec()
                .then(function(){
                    res.sendStatus(200);
                });
        });
});

module.exports = router;