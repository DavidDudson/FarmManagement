
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
// It seems like It should be 3 functions.
// SyncCategories, SyncTopics and SyncQuestions.
//
// Note: Keep in mind that if the server goes down for any reason
// It will repopulate with the old data. This is wrong
// This needs to be a separate script that can be run to populate the database if required.

// This doesnt take into account the pushing cause im lazy.
// #FunctionalProgrammingIsBoss
// Omit:
// All Categories
// example
//  .map(c -> _.omit(c, "topics"))
//  .map(c -> new Category(c))
//  .filter(c -> Category.findOne({"title": c.title}, (result, err) => !!result))
//  .forEach(c -> c.save(err -> console.log(err))

// All topics:
// example
//  .flatmap(c -> c.topics)
//  .map(t -> _.omit(t, "questions"))
//  .map(t -> new Topic(t))
//  .filter(t -> Topic.findOne({"title": t.title}, (result, err) => !!result))
//  .forEach(t -> t.save(err -> console.log(err))

// All Questions:
// example
//  .flatmap(c -> c.topics.flatmap(t -> t.questions))
//  .map(q -> new Question(q))
//  .filter(q -> Question.findOne({"title": q.title}, (result, err) => !!result))
//  .forEach(q -> q.save(err -> console.log(err))

// After that, you dont need to check if things are in the database


// #FunctionalProgrammingIsBossTake 2
// In this case I think you will need to actually reassign t.questions at the end. I dont think filter alters the old list
// But I could be wrong. Test it :P
// All Categories
// example
//  .map(c -> syncTopics(c))
//  .map(c -> new Category(c))
//  .filter(c -> Category.findOne({"title": c.title}, (result, err) => !!result))
//  .forEach(c -> c.save(err -> console.log(err))

// All topics:
// var syncTopics = c => {
//  c.topics
//   .map(c -> syncQuestions(c))
//   .map(t -> new Topic(t))
//   .filter(t -> Topic.findOne({"title": t.title}, (result, err) => !!result))
//   .forEach(t -> t.save(err -> console.log(err))
// }

// All Questions:
// var syncQuestions = t => {
// t.questions
//  .map(q -> new Question(q))
//  .filter(q -> Question.findOne({"title": q.title}, (result, err) => !!result))
//  .forEach(q -> q.save(err -> console.log(err))
// }


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