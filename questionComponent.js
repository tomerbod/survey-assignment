export class Question {
  constructor(params) {
    this.survey = params?.survey;
    this.title = params?.title;
    this.index = params?.index;
  }

  insert() {
    if (this.possibleAnswersCounter === 0) {
      return false;
    }
    const question = { ...this };
    delete question.survey;
    this.survey.addQuestion(question);
    return true;
  }

  render() {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionTextField = document.createElement("input");
    questionTextField.type = "text";
    questionTextField.placeholder = "Question text";
    questionTextField.setAttribute("required", "");
    questionElement.appendChild(questionTextField);
    questionTextField.addEventListener("change", (event) => {
      this.text = event.target.value;
    });

    const questionInsertButton = document.createElement("button");
    questionInsertButton.classList.add("question-insert-button");
    questionInsertButton.type = "button";
    questionInsertButton.innerHTML = "Insert";
    questionInsertButton.addEventListener("click", (event) => {
      if (this.insert()) {
        questionElement.remove();
      }
    });
    questionElement.appendChild(questionInsertButton);

    return questionElement;
  }

  renderForAnswers() {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionTitle = document.createElement("h2");
    questionTitle.innerText = this.title;
    questionElement.appendChild(questionTitle);

    return questionElement;
  }
}

export class OpenQuestion extends Question {
  constructor(params) {
    super(params);
    this.type = "open";
    this.possibleAnswersCounter = -1;
  }

  render() {
    const questionElement = super.render();
    return questionElement;
  }

  renderForAnswers() {
    const questionElement = super.renderForAnswers();
    const answerInput = document.createElement("textarea");
    answerInput.setAttribute("required", "");
    answerInput.setAttribute("name", `question-${this.index}`);
    answerInput.addEventListener("change", (event) => {
      this.currentAnswer = event.target.value;
    });
    questionElement.appendChild(answerInput);

    return questionElement;
  }
}

export class ChoiceQuestion extends Question {
  constructor(params) {
    super(params);
    this.possibleAnswers = params?.possibleAnswers || [];
    this.possibleAnswersCounter = params?.possibleAnswersCounter || 0;
  }

  render() {
    const questionElement = super.render();

    const answersContainer = document.createElement("div");
    answersContainer.classList.add("answers-container");
    questionElement.appendChild(answersContainer);

    const addAnswersButton = document.createElement("button");
    addAnswersButton.classList.add("create-answers-button");
    addAnswersButton.innerText = "Add answer";
    addAnswersButton.type = "button";
    questionElement.appendChild(addAnswersButton);

    addAnswersButton.addEventListener("click", () => {
      const answerInput = document.createElement("input");
      answerInput.type = "text";
      answerInput.placeholder = "Answer";

      answerInput.addEventListener("change", (event) => {
        this.possibleAnswers[this.possibleAnswersCounter - 1] =
          event.target.value;
      });

      answersContainer.appendChild(answerInput);
      this.possibleAnswersCounter = this.possibleAnswersCounter + 1;
    });

    return questionElement;
  }
}

export class MultipleChoiceQuestion extends ChoiceQuestion {
  constructor(params) {
    super(params);
    this.type = "multi";
  }

  render() {
    const questionElement = super.render();
    return questionElement;
  }

  renderForAnswers() {
    const questionElement = super.renderForAnswers();
    this.possibleAnswers.forEach((answer, answerIndex) => {
      const answerContainer = document.createElement("div");
      const answerInput = document.createElement("input");
      answerInput.type = "checkbox";
      answerInput.value = answerIndex;
      answerInput.setAttribute("name", `question-${this.index}`);
      answerInput.addEventListener("change", (event) => {
        let array = this.currentAnswer || [];

        const value = event.target.value;
        if (array.includes(value)) {
          array = array.filter((currentValue) => currentValue != value);
        } else {
          array.push(value);
        }
        this.currentAnswer = array;
      });
      answerContainer.appendChild(answerInput);
      const answerText = document.createElement("text");
      answerText.innerHTML = answer;
      answerContainer.appendChild(answerText);
      questionElement.appendChild(answerContainer);
    });
    return questionElement;
  }
}

export class ClosedChoiceQuestion extends ChoiceQuestion {
  constructor(params) {
    super(params);
    this.type = "closed";
  }

  render() {
    const questionElement = super.render();

    return questionElement;
  }

  renderForAnswers() {
    const questionElement = super.renderForAnswers();
    this.possibleAnswers.forEach((answer, answerIndex) => {
      const answerContainer = document.createElement("div");
      const answerInput = document.createElement("input");
      answerInput.type = "radio";
      answerInput.value = answerIndex;
      answerInput.setAttribute("name", `question-${this.index}`);
      answerInput.setAttribute("required", "");
      answerInput.addEventListener("change", (event) => {
        this.currentAnswer = event.target.value;
      });
      answerContainer.appendChild(answerInput);
      const answerText = document.createElement("text");
      answerText.innerHTML = answer;
      answerContainer.appendChild(answerText);
      questionElement.appendChild(answerContainer);
    });
    return questionElement;
  }
}
