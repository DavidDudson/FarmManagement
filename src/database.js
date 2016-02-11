
var Promise = require("bluebird");

var Category = Promise.promisifyAll(require("./server/data/category/category.model"));
var Topic = Promise.promisifyAll(require("./server/data/topic/topic.model"));
var Question = Promise.promisifyAll(require("./server/data/question/question.model"));

var example = require("./example.json").categories;

var mongoose = require('mongoose');
mongoose.connect("mongodb://farmfi:hans23eva25@ds051665.mongolab.com:51665/heroku_g7bpvmg0");
console.log("stuff1");
if(example && example.length > 0) {
    console.log("stuff2");
    example.forEach(function (c) {
        var newCat = new Category(c);
        console.log(newCat);
        newCat.save(function (err) {
        });

        if(c.topics && c.topics.length > 0) {
            c.topics.forEach(function (t) {
                t.category = newCat._id;
                var newTop = new Topic(t);
                console.log(newTop);
                newTop.save(function (err) {});

                if(t.questions && t.questions.length > 0) {
                    t.questions.forEach(function(q) {
                        q.topic = newTop._id;
                        q.category = newCat._id;
                        var newQue = new Question(q);
                        console.log(newQue);
                        newQue.save(function (err) {});
                    });
                }
            });
        }
    });
}

//mongoose.connection.close();
//process.exit();
