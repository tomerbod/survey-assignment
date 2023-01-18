import { Result } from "./resultClass.js";

export class OpenResult extends Result {
  constructor(params) {
    super(params);
    Object.assign(this, params);
  }

  render() {
    const answerContainer = super.render();
    this.answers?.forEach((result) => {
      const expandButton = document.createElement("button");
      const answerDiv = document.createElement("div");
      this.buildAnswerDiv(answerDiv, result);
      this.buildExpandButton(expandButton, answerDiv);
      answerContainer.appendChild(expandButton);
      answerContainer.appendChild(answerDiv);
    });
    return answerContainer;
  }

  buildExpandButton(expandButton, answerDiv) {
    expandButton.classList.add(`expand-button`);
    expandButton.setAttribute("data-index", this.index);
    expandButton.innerHTML = "Expand";
    expandButton.addEventListener("click", () => {
      // show the answers when the expand button is clicked
      if (answerDiv.style.display === "none") {
        answerDiv.style.display = "block";
        expandButton.innerHTML = "X";
      } else {
        expandButton.innerHTML = "Expand";
        answerDiv.style.display = "none";
      }
    });
  }

  buildAnswerDiv(answerDiv, result) {
    answerDiv.classList.add(`answers-${this.index}`);
    answerDiv.setAttribute("style", "display: none;");
    answerDiv.innerHTML = result[this.index];
  }
}
