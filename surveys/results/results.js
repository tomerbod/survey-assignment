const NumberOfQuestionsInPage = 4;
let currentPage = 1;

const id = window.location.pathname.split("/")[2];
const surveyResults = store.get(`surveysAnswers.${id}`);
const surveyQuestions = store.get(`surveysQuestions.${id}`);

const handlePaginationLinkClick = (event) => {
  event.preventDefault();
  currentPage = event.target.getAttribute("data-page") || currentPage;
  renderResultList(currentPage);
};

//addResults get an "resultsToDisplay" that consists of results from the local storage and append them to "resultListContainer"
const addResults = (resultsToDisplay, resultListContainer) => {
  resultsToDisplay.forEach((question, index) => {
    const answerContainer = document.createElement("div");
    answerContainer.classList.add(`answer`);
    const answerTitle = document.createElement("h2");
    answerTitle.innerHTML = question.text;
    answerContainer.appendChild(answerTitle);

    if (question.type === "open") {
      surveyResults?.forEach((result) => {
        const expandButton = document.createElement("button");

        expandButton.classList.add(`expand-button`);
        expandButton.setAttribute("data-index", index);
        expandButton.innerHTML = "Expand";
        const answerDiv = document.createElement("div");

        answerDiv.classList.add(`answers-${index}`);
        answerDiv.setAttribute("style", "display: none;");
        answerDiv.innerHTML = result[index];
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
    } else if (question.type === "closed" || question.type === "multi") {
      // create an object to store the counts for each answer
      const answerCounts = {};
      if (question.type === "closed") {
        surveyResults?.forEach((result) => {
          const answer = result[index];
          if (!answerCounts[answer]) {
            answerCounts[answer] = 0;
          }
          answerCounts[answer]++;
        });
      } else {
        surveyResults?.forEach((result) => {
          const resultIndex =
            index + NumberOfQuestionsInPage * (currentPage - 1);
          const answer = result[resultIndex];
          answer.forEach((answer) => {
            if (!answerCounts[answer]) {
              answerCounts[answer] = 0;
            }
            answerCounts[answer]++;
          });
        });
      }

      let answersDisplayed = [];
      question.possibleAnswers.forEach((possibleAnswer) =>
        answersDisplayed.push(answerCounts[possibleAnswer] ?? 0)
      );

      const ctx = document.createElement("canvas");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: question.possibleAnswers,
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

      answerContainer.appendChild(ctx);
    }
    resultListContainer.appendChild(answerContainer);
  });
};

const renderResultList = (page = currentPage) => {
  handlePagination(
    surveyQuestions,
    handlePaginationLinkClick,
    "answer-container",
    page,
    addResults,
    NumberOfQuestionsInPage
  );
};

renderResultList();
