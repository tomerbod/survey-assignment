// add an event listener to the "Create survey" form's submit button
document
  .getElementById("create-survey-form")
  .addEventListener("submit", (event) => {
    // prevent the form from being submitted
    event.preventDefault();

    if (!checkValidation()) {
      event.preventDefault();
      return;
    }

    history.pushState({ route: "/surveys" }, "Surveys", "/surveys");

    // retrieve the values of the form fields
    const surveyName = document.getElementById("survey-name").value;
    const author = document.getElementById("author").value;

    // create an empty array to store the questions
    const questions = [];

    // iterate over the questions and get their text and type, and the selected answers
    const questionElements = document.getElementsByClassName("question");
    Array.from(questionElements)?.forEach((element) => {
      const questionText = element.getElementsByTagName("input")[0].value;
      const questionType = element.getElementsByTagName("select")[0].value;
      const answerElements = element
        .getElementsByClassName("answers-container")[0]
        .getElementsByTagName("input");
      // create an array to store the answers
      const possibleAnswers = [];

      // iterate over the answer elements and get their values
      Array.from(answerElements)?.forEach((element) => {
        possibleAnswers.push(element.value);
      });

      const question = {
        text: questionText,
        type: questionType,
        possibleAnswers: possibleAnswers,
      };
      questions.push(question);
    });

    //create survey id through a counter stored in the local storage
    let surveysCreated =
      (JSON.parse(localStorage.getItem("surveysCreated")) || 0) + 1;
    localStorage.setItem("surveysCreated", JSON.stringify(surveysCreated));

    localStorage.setItem(
      `surveysQuestions.${surveysCreated}`,
      JSON.stringify(questions)
    );

    const surveyWithoutQuestions = {
      name: surveyName,
      author: author,
      creationDate: new Date(),
      id: surveysCreated,
    };

    localStorage.setItem(
      `surveys.${surveysCreated}`,
      JSON.stringify(surveyWithoutQuestions)
    );

    //can add with binary search
    sortBy.forEach((sort) => {
      let surveys = JSON.parse(localStorage.getItem(`surveys.${sort}`)) || [];
      const survey = {};
      (survey["id"] = surveyWithoutQuestions.id),
        (survey[sort] = surveyWithoutQuestions[sort]);
      surveys.push(survey);

      surveys.sort((a, b) => {
        if (a[sort] < b[sort]) {
          return -1;
        }
        if (a[sort] > b[sort]) {
          return 1;
        }
        return 0;
      });

      localStorage.setItem(`surveys.${sort}`, JSON.stringify(surveys));
    });

    // handle the route of /surveys
    handleSurveysRoute();
  });

// get the container for the questions and "Add question" button
const questionsContainer = document.getElementById("questions-container");
const addQuestionButton = document.getElementById("add-question-button");

// add an event listener to the "Add question" button
addQuestionButton.addEventListener("click", (event) => {
  // create a new question element
  const questionElement = document.createElement("div");
  questionElement.classList.add("question");

  // create the question text field
  const questionTextField = document.createElement("input");
  questionTextField.type = "text";
  questionTextField.placeholder = "Question text";
  questionTextField.setAttribute("required", "");
  questionElement.appendChild(questionTextField);

  // create the question type dropdown menu
  const questionTypeMenu = document.createElement("select");
  questionTypeMenu.innerHTML = `
  <option value="closed">Closed</option>
    <option value="open">Open</option>
    <option value="multi">Multi select</option>
  `;
  questionElement.appendChild(questionTypeMenu);

  // create the container for the answers
  const answersContainer = document.createElement("div");
  answersContainer.classList.add("answers-container");
  questionElement.appendChild(answersContainer);

  // create answer button
  const addAnswersButton = document.createElement("button");
  addAnswersButton.classList.add("create-answers-button");
  addAnswersButton.innerText = "Add answer";
  addAnswersButton.type = "button";

  addAnswersButton.addEventListener("click", (event) => {
    // create an input element for the answer
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = "Answer";

    // insert the input element into the question element
    answersContainer.appendChild(answerInput);
  });

  questionElement.appendChild(addAnswersButton);
  questionsContainer.appendChild(questionElement);

  // add an event listener to the question type dropdown menu
  questionTypeMenu.addEventListener("change", (event) => {
    answersContainer.innerHTML = "";

    // get the selected question type
    const questionType = event.target.value;
    // add fields for the answers based on the selected question type
    if (questionType === "open") {
      addAnswersButton.style.display = "none";
      // open question - no fields needed
    } else if (questionType === "closed" || questionType === "multi") {
      // closed question - add radio buttons for the answers
      addAnswersButton.style.display = "block";
    }
  });
});

const checkValidation = () => {
  const questionsCurrentlyDisplayed =
    document.getElementsByClassName("question");
  if (questionsCurrentlyDisplayed.length === 0) {
    const validationLabel = document.createElement("label");
    validationLabel.innerHTML = "please insert at least one question";
    document.getElementById("create-survey-form").appendChild(validationLabel);
    return false;
  }
  return true;
};
