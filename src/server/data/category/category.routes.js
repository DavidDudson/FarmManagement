
var Express = require('express');

var router = Express.Router();

var Promise = require("bluebird");
var Category = Promise.promisifyAll(require("./category.model"));
var Topic = Promise.promisifyAll(require("../topic/topic.model"));
var Question = Promise.promisifyAll(require("../question/question.model"));

    //setup
router.get("/categories", (req, res) => {
    Category.find({}, function(err, result){}).exec()
        .then(function(data){
            res.json(data);
        });
});

    //get
router.get("/cat/:id", (req, res) => {
    console.log("Searching for category: " + req.params.id);
    var fndCat = {};
    Category.findOne({"_id": req.params.id}, function(err, result){}).lean().exec()
        .then(function(cData) {
            if(cData) {
                fndCat = cData;
                Topic.find({"category": fndCat._id}, function(err, result){}).lean().exec()
                    .then(function(tData) {
                        if(tData.length > 0) {
                            fndCat.topics = tData;
                            Question.find({"category": fndCat._id}, function(err, result){}).lean().exec()
                                .then(function(qData) {
                                    if(qData.length > 0) {
                                        fndCat.topics.forEach(function(t) {
                                            t.questions = qData.filter(function(obj){
                                                if(obj.topic == t._id) {
                                                    return obj;
                                                }
                                            });
                                        });
                                        res.json(fndCat);
                                    } else {
                                        res.json(fndCat);
                                    }
                                });
                        } else {
                            res.json(fndCat);
                        }
                    });

            }
            if(!cData) {
                res.sendStatus(400);
            }
        });
});

    //create
router.post("/cat", (req, res) => {
    if(req.body.title) {
        Category.findOne({"title": req.body.title}, function(err, result){}).exec()
            .then(function(data) {
                if(!data) {
                    var newObj = new Category(req.body);
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
router.put("/cat/:id", (req, res) => {
    Category.update({"_id": req.params.id}, req.body, function(err, result){}).exec()
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
router.delete("/cat/:id", (req, res) => {
    Category.remove({"_id": req.params.id}, function(err){}).exec()
        .then(function() {
            Topic.remove({"category": req.params.id}, function(err){}).exec()
                .then(function() {
                    Question.remove({"topic": req.params.id}, function(err){}).exec()
                        .then(function(){
                            res.sendStatus(200);
                        });
                });
        });
});

module.exports = router;