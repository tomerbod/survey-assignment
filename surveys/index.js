const NumberOfSurveysInPage = 4;
let currentSortBy = "creationDate";
let currentPage = 1;
const buttons = [
  { name: "Delete", class: "delete-button" },
  { name: "Results", class: "results-button" },
  { name: "Answer", class: "answer-button" },
];

//event listener for the "sort by" dropdown menu
document.getElementById("sort-by").addEventListener("change", (event) => {
  currentSortBy = event.target.value;
  renderSurveyList(currentPage, currentSortBy);
});

//event listener for the "create survey" button
document.getElementById("create-survey").addEventListener("click", () => {
  history.pushState(
    { route: "/surveys/create" },
    "Create Survey",
    "/surveys/create"
  );
  handleSurveysRoute("/surveys/create");
});

const handleDeleteButtonClick = (event) => {
  let surveys = JSON.parse(localStorage.getItem("surveys"));
  const id = event.target.dataset.innerid;

  surveys = surveys.filter((survey) => id != survey.id);
  localStorage.setItem("surveys", JSON.stringify(surveys));
  renderSurveyList(currentPage, currentSortBy);
};

// handle click events for the pagination links
const handlePaginationLinkClick = (event) => {
  event.preventDefault();
  currentPage = event.target.getAttribute("data-page") || currentPage;
  renderSurveyList(currentPage, currentSortBy);
};

const addSurveys = (surveysToDisplay, surveyListContainer) => {
  surveysToDisplay.forEach((element, index) => {
    const surveyContainer = document.createElement("div");
    surveyContainer.classList.add("survey");

    const surveyName = document.createElement("div");
    surveyName.classList.add("survey-name");
    surveyName.innerHTML = `${element.name}`;
    surveyContainer.appendChild(surveyName);

    const surveyInfo = document.createElement("div");
    surveyInfo.classList.add("survey-info");
    surveyInfo.innerHTML = `Created by ${element.author} on ${element.creationDate}`;
    surveyContainer.appendChild(surveyInfo);

    const surveyButtonContainer = document.createElement("div");
    surveyButtonContainer.classList.add("survey-buttons");
    surveyContainer.appendChild(surveyButtonContainer);

    buttons.forEach((button) => {
      const surveyButton = document.createElement("button");
      surveyButton.classList.add(button.class);
      surveyButton.setAttribute("data-innerId", element.id);
      surveyButton.innerHTML = button.name;
      surveyButtonContainer.appendChild(surveyButton);
    });

    surveyListContainer.appendChild(surveyContainer);
  });
};

const renderSurveyPage = () => {
  let surveys = JSON.parse(localStorage.getItem("surveys"));
  if (surveys) {
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

      history.pushState(
        { route: `/surveys/${id}` },
        "Answer Survey",
        `/surveys/${id}`
      );
      handleSurveysRoute(`/surveys/${id}`);
    });
  });

  Array.from(resultsButtons)?.forEach((element) => {
    element.addEventListener("click", (event) => {
      const id = event.target.dataset.innerid;
      handleSurveysRoute(`/surveys/${id}/results`);
      history.pushState(
        { route: `/surveys/${id}/results` },
        "Results",
        `/surveys/${id}/results`
      );
    });
  });

  Array.from(deleteButtons)?.forEach((element) => {
    element.addEventListener("click", handleDeleteButtonClick);
  });
};

const renderSurveyList = (page = currentPage, sortBy = currentSortBy) => {
  // retrieve the list of surveys from the local storage

  let surveys = JSON.parse(localStorage.getItem("surveys"));

  // check if there are any surveys in the local storage
  if (surveys) {
    // sort the surveys by the specified field
    surveys.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });

    handlePagination(
      surveys,
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
