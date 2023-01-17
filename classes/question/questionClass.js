export class Question {
  constructor(params) {
    Object.assign(this, params);
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
