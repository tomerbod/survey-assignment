import { Result } from "./resultClass.js";

export class OpenResult extends Result {
  constructor(params) {
    super(params);
    this.title = params?.title;
    this.answers = params?.answers;
    this.index = params?.index;
  }

  render() {
    const answerContainer = super.render();
    this.answers?.forEach((result) => {
      const expandButton = document.createElement("button");

      expandButton.classList.add(`expand-button`);
      expandButton.setAttribute("data-index", this.index);
      expandButton.innerHTML = "Expand";
      const answerDiv = document.createElement("div");

      answerDiv.classList.add(`answers-${this.index}`);
      answerDiv.setAttribute("style", "display: none;");
      answerDiv.innerHTML = result[this.index];
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
      answerContainer.appendChild(expandButton);
      answerContainer.appendChild(answerDiv);
    });
    return answerContainer;
  }
}
