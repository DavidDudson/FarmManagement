var _ = require('lodash');


class Descriptable {

    constructor(name, description, data = undefined) {
        if (_.isUndefined(data)) {
            this.name = name;
            this.description = description;
        } else {
            Object.assign(this, data);
        }
    }
}

class Category extends Descriptable {
    constructor(name, description, data = undefined) {
        if (_.isUndefined(data)) {
            super(name, description);
            this.Topics = [];
        } else {
            Object.assign(this, data);
        }

    }

    addTopic(Topic) {
    this.Topics.push(Topic)
}

    removeTopic(Topic) {
        _.remove(this.Topics, Topic)
    }

    getTopic(name) {
        return _.find(this.Topics, q => q.name === name)
    }
}

class Topic extends Descriptable {
    constructor(name, description) {
        super(name, description);
        this.example = undefined;
        this.calculator = undefined;
        this.test = undefined; // This is a question. Should you go through a whole test in a single session?
    }
}

// The only calculator use is table based
class Calculator extends Descriptable {
    constructor(name, description, table) {
        super(name, description);
        this.table = table;
    }
}

// At this stage I believe the only examples are Table based
class Example extends Descriptable {
    constructor(name, description, table) {
        super(name, description);
        this.table = table;
    }
}


// A test contains a bunch of questions.
// The main test page will list these
class Test extends Descriptable {
    constructor(name, description) {
        super(name, description);
        this.questions = [];
        this.file = undefined;
    }

    addQuestion(question) {
        this.questions.push(question)
    }

    removeQuestion(question) {
        _.remove(this.question, question)
    }
}

class Question extends Descriptable {
    constructor(name, description, answer, type) {
        super(name, description);
        this.type = type;
        this.answer = answer;
    }
}

class BasicQuestion extends Question {
    constructor(name, description, answer) {
        super(name, description, answer, "basic");
    }
}

class TableQuestion extends Question {
    constructor(name, description, answer, table) {
        super(name, description, answer, "table");
        this.table = table;
    }
}

class MultiChoiceQuestion extends Question {
    constructor(name, description, answer, options) {
        super(name, description, answer, "multichoice");
        this.options = options;
    }
}
