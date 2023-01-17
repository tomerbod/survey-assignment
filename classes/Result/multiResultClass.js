import { Result } from "./resultClass.js";

export class MultiResult extends Result {
  constructor(params) {
    super(params);
    Object.assign(this, params);
  }

  render() {
    const answerContainer = super.render();
    const answerCounts = {};
    this.answers?.forEach((result) => {
      const answer = result[this.index];
      answer.forEach((answer) => {
        if (!answerCounts[answer]) {
          answerCounts[answer] = 0;
        }
        answerCounts[answer]++;
      });
    });

    const answerCounts2 = this.answers?.reduce((accumulator, currentValue) => {
      currentValue[this.index]?.forEach((answer) => {
        if (!accumulator[answer]) {
          accumulator[answer] = 0;
        }
        accumulator[answer]++;
      });

      return accumulator;
    }, {});

    console.log({ answerCounts });
    console.log({ answerCounts2 });

    answerContainer.appendChild(
      this.createGraph(this.possibleAnswers, answerCounts)
    );

    return answerContainer;
  }
}
