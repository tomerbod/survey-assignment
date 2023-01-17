export class Result {
  constructor(params) {
    this.title = params.title;
  }

  render() {
    const answerContainer = document.createElement("div");
    answerContainer.classList.add(`answer`);
    const answerTitle = document.createElement("h2");
    answerTitle.innerHTML = this.title;
    answerContainer.appendChild(answerTitle);

    return answerContainer;
  }

  createGraph(possibleAnswers, answerCounts) {
    let answersDisplayed = [];
    possibleAnswers.forEach((possibleAnswer) =>
      answersDisplayed.push(answerCounts[possibleAnswer] ?? 0)
    );

    const ctx = document.createElement("canvas");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: possibleAnswers,
        datasets: [
          {
            label: "# of Votes",
            data: answersDisplayed,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return ctx;
  }
}
