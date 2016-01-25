
var Express = require('express');

var router = Express.Router();

var Promise = require("bluebird");
var Category = Promise.promisifyAll(require("./category.model"));
var Topic = Promise.promisifyAll(require("../topic/topic.model"));
var Question = Promise.promisifyAll(require("../question/question.model"));

var _ = "lodash";
    //setup
router.get("/categories", (req, res) => {
    Category.find({}, function(err, result){}).exec()
        .then(function(data){
            res.json(data);
        });
});

    //get
router.get("/category/:id", (req, res) => {
    console.log("Searching for category: " + req.params.id);
    Category.findOne({"_id": req.params.id}, function(err, result){}).lean().exec()
        .then(function(cData) {
            if(cData) {
                var fndCat = cData;
                Topic.find({"category": fndCat._id}, function(err, result){}).lean().exec()
                    .then(function(tData) {
                        if(tData) {
                            fndCat.topics = tData;
                            res.json(fndCat); // comment this to add questions
                        } else {
                            res.json(fndCat);
                        }
                    });
                //Question.find({"category": fndCat._id}, function(err, result){}).lean().exec()
                //    .then(function(qData) {
                //        if(qData) {
                //            fndCat.topics.forEach(function(t) {
                //                var fndList = _.differenceWith(qData, {"topic": t._id}, _.isEqual );
                //                res.json(fndList);
                //            });
                //        } else {
                //            res.json(fndCat);
                //        }
                //    });
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