
var Promise = require("bluebird");

var Category = Promise.promisifyAll(require("./server/data/category/category.model"));
var Topic = Promise.promisifyAll(require("./server/data/topic/topic.model"));
var Question = Promise.promisifyAll(require("./server/data/question/question.model"));

var example = require("./example.json").categories;


module.exports = function() {
    console.log("database script was executed");
    if(example && example.length > 0) {
        example.forEach(function (c) {
            var newCat = new Category(c);
            Category.findOne({"title": c.title}, function(err, result) {
                if(!result) {
                    newCat.save(function (err) {});
                }
            });
            if(c.topics && c.topics.length > 0) {
                c.topics.forEach(function (t) {
                    t.category = newCat._id;
                    var newTop = new Topic(t);
                    Topic.findOne({"title": t.title}, function(err, result) {
                        if(!result) {
                            newTop.save(function (err) {});
                        }
                    });
                    if(t.questions && t.questions.length > 0) {
                        t.questions.forEach(function(q) {
                            q.topic = newTop._id;
                            q.category = newCat._id;
                            var newQue = new Question(q);
                            Question.findOne({"title": q.title}, function(err, result) {
                                if(!result) {
                                    newQue.save(function (err) {});
                                }
                            })
                        });
                    }
                });
            }
        });
    }

};
