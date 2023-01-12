import { Question } from "./questionClass.js";

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
