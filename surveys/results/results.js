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
    let result;
    if (question.type === "open") {
      result = new OpenResult({
        title: question.text,
        answers: surveyResults,
        index: index,
      });
    }
    if (question.type === "closed") {
      result = new ClosedResult({
        title: question.text,
        answers: surveyResults,
        index: index,
        possibleAnswers: question.possibleAnswers,
      });
    }
    if (question.type === "multi") {
      result = new MultiResult({
        title: question.text,
        answers: surveyResults,
        index: index + NumberOfQuestionsInPage * (currentPage - 1),
        possibleAnswers: question.possibleAnswers,
      });
    }

    resultListContainer.appendChild(result.render());
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
