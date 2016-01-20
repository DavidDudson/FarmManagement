
var Express = require('express');

var router = Express.Router();

var Promise     = require("bluebird");
var _ = require('lodash');

var Category = Promise.promisifyAll(require("../models/category.model"));
var Topic = Promise.promisifyAll(require("./server/models/topic.model"));
var Question = Promise.promisifyAll(require("./server/models/question.model"));

    //setup
router.get("/category", (req, res) => {
    Category.find({}, function(err, result){}).exec()
        .then(function(data){
            res.json(data);
        });
});

    //get
router.get("/category/:id", (req, res) => {
    Category.findOne({"title": req.params.id}, function(err, result){}).exec()
        .then(function(cData) {
            if(cData) {
                var fndCat = cData;
                Topic.find({"category": fndCat._id}, function(err, result){}).exec()
                    .then(function(tData) {
                        if(tData) {
                            fndCat.topics = tData;
                            fndCat.topics.forEach(function(t) {
                                Question.find({"question": t._id}, function(err, result){}).exec()
                                    .then(function(qData) {
                                        if(qData) {
                                            t.questions = qData;
                                        }
                                    });
                            });
                        }

                        res.json(fndCat);

                    });
            }
            if(!cData) {
                res.sendStatus(400);
            }
        });
});

    //create
router.post("/category/", (req, res) => {
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
router.put("/category/:id", (req, res) => {
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
router.delete("/category/:id", (req, res) => {
    Category.remove({"_id": req.params.id}, function(err){
        if(!err){
            res.sendStatus(200);
        }
    });
});

module.exports = router;