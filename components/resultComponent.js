class Result {
  constructor(params) {
    this.title = params?.title;
    this.answers = params?.answers;
    this.index = params?.index;
  }

  render() {
    const answerContainer = document.createElement("div");
    answerContainer.classList.add(`answer`);
    const answerTitle = document.createElement("h2");
    answerTitle.innerHTML = this.title;
    answerContainer.appendChild(answerTitle);

    return answerContainer;
  }
}

class OpenResult extends Result {
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

class ClosedResult extends Result {
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
      if (!answerCounts[answer]) {
        answerCounts[answer] = 0;
      }
      answerCounts[answer]++;
    });

    answerContainer.appendChild(
      createGraph(this.possibleAnswers, answerCounts)
    );

    return answerContainer;
  }
}

class MultiResult extends Result {
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
      createGraph(this.possibleAnswers, answerCounts)
    );

    return answerContainer;
  }
}

const createGraph = (possibleAnswers, answerCounts) => {
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
};
