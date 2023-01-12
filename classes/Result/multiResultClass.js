import { Result } from "./resultClass.js";

export class MultiResult extends Result {
  constructor(params) {
    super(params);
    this.title = params?.title;
    this.answers = params?.answers;
    this.index = params?.index;
    this.possibleAnswers = params?.possibleAnswers;
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

    answerContainer.appendChild(
      this.createGraph(this.possibleAnswers, answerCounts)
    );

    return answerContainer;
  }
}
