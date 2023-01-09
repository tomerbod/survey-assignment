const NumberOfSurveysInPage = 4;
let currentSortBy = "creationDate";
let currentPage = 1;

const addSurveys = (surveysToDisplay, surveyListContainer) => {
  const table = document.createElement("table");
  table.innerHTML = `<tr>
  <th>Name</th>
  <th>Author</th>
  <th>Creation Date</th>
  <th>Actions</th>
</tr>`;
  surveysToDisplay.forEach((surveyToDisplay) => {
    const surveyData = store.get(`surveys.${surveyToDisplay.id}`);
    const survey = new SurveyComponent(surveyData);
    table.appendChild(survey.render());
  });
  surveyListContainer.appendChild(table);
};

//event listener for the "sort by" dropdown menu
document.getElementById("sort-by").addEventListener("change", (event) => {
  currentSortBy = event.target.value;
  renderSurveyList(currentPage, currentSortBy);
});

//event listener for the "create survey" button
document.getElementById("create-survey").addEventListener("click", () => {
  router.changeRoute("/surveys/create", "Create Survey");
});

// handle click events for the pagination links
const handlePaginationLinkClick = (event) => {
  event.preventDefault();
  currentPage = event.target.getAttribute("data-page") || currentPage;
  renderSurveyList(currentPage, currentSortBy);
};

const renderSurveyPage = () => {
  let surveysByTopic = store.get(`surveys.${currentSortBy}`);
  if (surveysByTopic?.length > 0) {
    renderSurveyList(currentPage, currentSortBy);
  } else {
    document.getElementById("survey-list").innerHTML = "No surveys found.";
  }
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
  }

  const deleteButtons = document.getElementsByClassName("delete-button");

  Array.from(deleteButtons)?.forEach((element) => {
    element.addEventListener("click", () =>
      renderSurveyList(currentPage, currentSortBy)
    );
  });
};

// add event listeners to the delete buttons

renderSurveyPage();
