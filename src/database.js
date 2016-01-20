
var Promise = require("bluebird");
var _ = require('lodash');

var Category = Promise.promisifyAll(require("./server/models/category.model"));
var Topic = Promise.promisifyAll(require("./server/models/topic.model"));
var Question = Promise.promisifyAll(require("./server/models/question.model"));

var example = require("./example.json").categories;


// TODO Turn this into multiple functions!!! ARRRGHHH ANTHONY!!!!!!! MY OCD WILL KILL ME!!!!


module.exports = function() {
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
