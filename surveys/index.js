const router = new Router();

const NumberOfSurveysInPage = 4;
let currentSortBy = "creationDate";
let currentPage = 1;

//event listener for the "sort by" dropdown menu
document.getElementById("sort-by").addEventListener("change", (event) => {
  currentSortBy = event.target.value;
  renderSurveyList(currentPage, currentSortBy);
});

//event listener for the "create survey" button
document.getElementById("create-survey").addEventListener("click", () => {
  router.changeRoute("/surveys/create", "Create Survey");
});

const handleDeleteButtonClick = (event) => {
  const id = event.target.dataset.innerid;
  sortBy.forEach((sort) => {
    let surveys = store.get(`surveys.${sort}`);
    surveys = surveys.filter((survey) => id != survey.id);
    store.set(`surveys.${sort}`, surveys);
  });
  store.remove(`surveys.${id}`);
  store.remove(`surveysQuestions.${id}`);
  store.remove(`surveysAnswers.${id}`);
  renderSurveyList(currentPage, currentSortBy);
};

// handle click events for the pagination links
const handlePaginationLinkClick = (event) => {
  event.preventDefault();
  currentPage = event.target.getAttribute("data-page") || currentPage;
  renderSurveyList(currentPage, currentSortBy);
};

const addSurveys = (surveysToDisplay, surveyListContainer) => {
  surveysToDisplay.forEach((surveyToDisplay) => {
    const surveyData = store.get(`surveys.${surveyToDisplay.id}`);
    const survey = new SurveyComponent(surveyData);

    surveyListContainer.appendChild(survey.render());
  });
};

const renderSurveyPage = () => {
  let surveysByTopic = store.get(`surveys.${currentSortBy}`);
  if (surveysByTopic?.length > 0) {
    renderSurveyList(currentPage, currentSortBy);
  } else {
    document.getElementById("survey-list").innerHTML = "No surveys found.";
  }
};
const handleButtons = () => {
  // add event listeners to the delete buttons
  const deleteButtons = document.getElementsByClassName("delete-button");
  const answerButtons = document.getElementsByClassName("answer-button");
  const resultsButtons = document.getElementsByClassName("results-button");

  Array.from(answerButtons)?.forEach((element) => {
    element.addEventListener("click", (event) => {
      const id = event.target.dataset.innerid;
      router.changeRoute(`/surveys/${id}`, "Answer Survey");
    });
  });

  Array.from(resultsButtons)?.forEach((element) => {
    element.addEventListener("click", (event) => {
      const id = event.target.dataset.innerid;
      router.changeRoute(`/surveys/${id}/results`, "Results");
    });
  });

  Array.from(deleteButtons)?.forEach((element) => {
    element.addEventListener("click", handleDeleteButtonClick);
  });
};

const renderSurveyList = (page = currentPage, sortBy = currentSortBy) => {
  // retrieve the list of surveys from the local storage

  let surveysByTopic = store.get(`surveys.${currentSortBy}`);

  // check if there are any surveys in the local storage
  if (surveysByTopic) {
    handlePagination(
      surveysByTopic,
      handlePaginationLinkClick,
      "survey-list",
      page,
      addSurveys,
      NumberOfSurveysInPage
    );

    handleButtons();
  }
};

renderSurveyPage();
