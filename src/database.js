
var Promise     = require("bluebird");
var _ = require('lodash');

var Category = Promise.promisifyAll(require("./server/models/category.model"));
var Topic = Promise.promisifyAll(require("./server/models/topic.model"));
var Question = Promise.promisifyAll(require("./server/models/question.model"));

var example = require("./example.json").categories;

module.exports = function() {
    //TODO implement this
    console.log("establish all data in example.json in database if requested");
    if(example && example.length != 0) {
        example.forEach(function (c) {
            var newC = _.cloneDeep(c);
            if(c.topics && c.topics.length != 0) {
                c.topics.forEach(function (t) {
                    var newT = _.cloneDeep(t);
                    if(t.questions && t.questions.length != 0) {
                        t.questions.forEach(function(q) {
                            addToDB(Question, q);
                            //build questions newObject with references to these objects as they are made
                        });
                    }
                    addToDB(Topic, newT);
                    //build questions newObject with references to these objects as they are made
                });
            }
            addToDB(Category, newC);
        });
    }
};

var addToDB = function(schema, object) {
    //check if in DB already
    schema.findOne({"title": "object.title"}, function(err, result) {
        if(!result) {
            //add to DB if not found
            var newObj = new schema(object);
            console.log(newObj.title + " added to " + "??correct??" + " table in mongoDB");
        }
    });

};