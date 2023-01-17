import { Result } from "./resultClass.js";

export class ClosedResult extends Result {
  constructor(params) {
    super(params);
    Object.assign(this, params);
  }

  render() {
    const answerContainer = super.render();

    const answerCounts = this.answers?.reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue[this.index]]) {
        accumulator[currentValue[this.index]] = 0;
      }
      accumulator[currentValue[this.index]]++;
      return accumulator;
    }, {});

    answerContainer.appendChild(
      this.createGraph(this.possibleAnswers, answerCounts)
    );

    return answerContainer;
  }
}
