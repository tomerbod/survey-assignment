import { Question } from "./questionClass.js";

export class OpenQuestion extends Question {
  constructor(params) {
    super(params);
    this.type = questionTypeEnum.Open;
    this.possibleAnswersCounter = -1;
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
