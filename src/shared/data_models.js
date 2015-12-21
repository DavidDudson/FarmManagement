var _ = require('lodash');


class Descriptable {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

class Topic extends Descriptable {
    constructor(name, description) {
        super(name, description)
        this.quizzes = [];
    }

    addQuiz(quiz) {
    this.quizzes.push(quiz)
}

    removeQuiz(quiz) {
        _.remove(this.quizzes, quiz)
    }

    getQuiz(name) {
        return _.find(this.quizzes, q => q.name === name)
    }
}

class Quiz extends Descriptable {
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
    }

    addQuestion(question) {
        this.questions.push(question)
    }

    removeQuestion(question) {
        _.remove(this.question, question)
    }
}

class Question extends Descriptable {
    constructor(name, description, answer) {
        super(name, description);
        this.answer = answer;
    }
}

class BasicQuestion extends Question {
    constructor(name, description, answer) {
        super(name, description, answer);
    }
}

class TableQuestion extends Question {
    constructor(name, description, answer, table) {
        super(name, description, answer);
        this.table = table;
    }
}

class MultiChoiceQuestion extends Question {
    constructor(name, description, answer, options) {
        super(name, description, answer);
        this.options = options;
    }
}
