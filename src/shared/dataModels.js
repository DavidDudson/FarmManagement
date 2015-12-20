var _ = require('lodash');

class Topic {
    constructor(name, description) {
        this.quizzes = [];
        this.name = name;
        this.description = description;
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

class Quiz {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.example = undefined;
        this.calculator = undefined;
        this.test = undefined;
    }
}

class Test {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.questions = [];
    }

    addQuestion(question) {
        this.questions.push(question)
    }

    removeQuestion(question) {
        _.remove(this.question, question)
    }
}

class Question {
    constructor(description) {
        this.description = description;
        this.answer = undefined;
    }
}

class BasicQuestion extends Question {
    constructor(description, answer) {
        super(description);
        this.answer = answer;
    }
}

class TableQuestion extends Question {
    constructor(description, table) {
        super(description);
        this.table = table;
        this.answer = answer;
    }
}

class MultiChoiceQuestion extends Question {
    constructor(description, options, answer) {
        super(description);
        this.options = options;
        this.answer = answer;
    }
}
