import { ChoiceQuestion } from "./choiceQuestionClass.js";
import { questionTypeEnum } from "../../utils/constans.js";

export class MultipleChoiceQuestion extends ChoiceQuestion {
  constructor(params) {
    super(params);
    this.type = questionTypeEnum.Multi;
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
