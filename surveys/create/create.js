//create survey id through a counter stored in the local storage
let surveysCreated = (store.get("surveysCreated") || 0) + 1;

const survey = new SurveyComponent({ id: surveysCreated });
// add an event listener to the "Create survey" form's submit button
document
  .getElementById("create-survey-form")
  .addEventListener("submit", (event) => {
    // prevent the form from being submitted
    event.preventDefault();

    if (!survey.checkValidation()) {
      event.preventDefault();
      return;
    }

    survey.name = document.getElementById("survey-name").value;
    survey.author = document.getElementById("author").value;

    survey.save();
    router.changeRoute("/surveys", "Surveys");
  });

// get the container for the questions and "Add question" button
const questionsContainer = document.getElementById("questions-container");
const addQuestionButton = document.getElementById("add-question-button");

// add an event listener to the "Add question" button
addQuestionButton.addEventListener("click", (event) => {
  const questionType = document.getElementById("question-type-selector").value;

  if (questionType === "open") {
    const question = new OpenQuestion({ survey: survey });
    questionsContainer.appendChild(question.render());
  }

  if (questionType === "multi") {
    const question = new MultipleChoiceQuestion({ survey: survey });
    questionsContainer.appendChild(question.render());
  }

  if (questionType === "closed") {
    const question = new ClosedChoiceQuestion({ survey: survey });
    questionsContainer.appendChild(question.render());
  }
});
