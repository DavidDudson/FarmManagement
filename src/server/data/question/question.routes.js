
var Express = require('express');

var router = Express.Router();

var Promise     = require("bluebird");
var Question = Promise.promisifyAll(require("./question.model"));


//all
router.get("/questions", (req, res) => {
    Question.find({}, function(err, result){}).exec()
        .then(function(data){
            res.json(data);
        });
});


//get
router.get("/que/:id", (req, res) => {
    Question.findOne({"title": req.params.id}, function(err, result){}).exec()
        .then(function(qData) {
            if(qData) {
                res.json(qData);
            }
            if(!qData) {
                res.sendStatus(400);
            }
        });
});

//create
router.post("/que", (req, res) => {
    if(req.body.title) {
        Question.findOne({"title": req.body.title}, function(err, result){}).exec()
            .then(function(data) {
                if(!data) {
                    var newObj = new Question(req.body);
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
router.put("/que/:id", (req, res) => {
    Question.update({"_id": req.params.id}, req.body, function(err, result){}).exec()
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
router.delete("/que/:id", (req, res) => {
    Question.remove({"_id": req.params.id}, function(err){
        if(!err){
            res.sendStatus(200);
        }
    });
});

module.exports = router;