
var Promise = require("bluebird");
var _ = require('lodash');

var Category = Promise.promisifyAll(require("./server/models/category.model"));
var Topic = Promise.promisifyAll(require("./server/models/topic.model"));
var Question = Promise.promisifyAll(require("./server/models/question.model"));

var example = require("./example.json").categories;


// TODO Turn this into multiple functions!!! ARRRGHHH ANTHONY!!!!!!! MY OCD WILL KILL ME!!!!
// And you should make use of filter.
// example.foreach should only call if examples length is > 0 anyway.
// you can simplify this immensely
module.exports = function() {
    console.log("establish all data in example.json in database if requested");
    if(example && example.length != 0) {
        example.forEach(function (c) {
            var newC = _.cloneDeep(c);
            newC.topics = [];
            if(c.topics && c.topics.length != 0) {
                c.topics.forEach(function (t) {
                    var newT = _.cloneDeep(t);
                    newT.questions = [];
                    if(t.questions && t.questions.length != 0) {
                        t.questions.forEach(function(q) {
                            var DBq = new Question(q);
                            addToDB(Question, DBq);
                            newT.questions.push(DBq);
                        });
                    }
                    var DBt = new Topic(newT);
                    addToDB(Topic, DBt);
                    newC.topics.push(newT);
                });
            }
            var DBc = new Category(newC);
            addToDB(Category, DBc);
        });
    }
};

var addToDB = function(schema, object) {
    //check if in DB already
    schema.findOne({"title": "object.title"}, function(err, result) {
        if(!result) {
            object.save(function (err) {
                if (!err)
                    console.log("saved in DB");
            });
        }

    });

};