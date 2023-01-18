import { ChoiceQuestion } from "./choiceQuestionClass.js";
import { questionTypeEnum } from "../../constans.js";

export class ClosedChoiceQuestion extends ChoiceQuestion {
  constructor(params) {
    super(params);
    this.type = questionTypeEnum.Closed;
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
