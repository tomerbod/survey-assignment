import { Result } from "./resultClass.js";

export class MultiResult extends Result {
  constructor(params) {
    super(params);
    Object.assign(this, params);
  }

  render() {
    const answerContainer = super.render();
    const answerCounts = this.answers?.reduce((accumulator, currentValue) => {
      currentValue[this.index]?.forEach((answer) => {
        if (!accumulator[answer]) {
          accumulator[answer] = 0;
        }
        accumulator[answer]++;
      });

      return accumulator;
    }, {});

    answerContainer.appendChild(
      this.createGraph(this.possibleAnswers, answerCounts)
    );

    return answerContainer;
  }
}
