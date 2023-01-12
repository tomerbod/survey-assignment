import store from "../../classes/storeManagerClass.js";
import { SurveyClass } from "../../classes/surveyComponent.js";
import { OpenQuestion } from "../../classes/question/openQuestionClass.js";
import { ClosedChoiceQuestion } from "../../classes/question/ClosedChoiceClass.js";
import { MultipleChoiceQuestion } from "../../classes/question/multipleChoiceClass.js";
import router from "../../classes/router.js";

export class CreatePage {
  constructor() {
    this.id = (store.get("surveysCreated") || 0) + 1;
    this.survey = new SurveyClass({ id: this.id });
    this.questionType = questionTypeEnum.Open;
  }

  renderPage() {
    const container = document.createElement("div");
    container.setAttribute("id", "page");
    const formContainer = document.createElement("form");
    formContainer.setAttribute("id", "create-survey-form");

    this.renderInputs(formContainer);

    this.renderQuestionsControlers(formContainer);

    const createsurveyButton = document.createElement("input");
    createsurveyButton.setAttribute("type", "submit");
    createsurveyButton.setAttribute("value", "Create");
    createsurveyButton.setAttribute("id", "create-question-button");
    createsurveyButton.addEventListener("click", (event) => {
      // prevent the form from being submitted
      event.preventDefault();

      if (!this.survey.checkValidation()) {
        event.preventDefault();
        return;
      }
      this.survey.save();
      router.changeRoute(`${urlEnum.Survey}`, "Surveys");
    });
    formContainer.appendChild(createsurveyButton);

    container.appendChild(formContainer);
    return container;
  }

  renderInputs(formContainer) {
    const labelName = document.createElement("label");
    labelName.setAttribute("for", "survey-name");
    labelName.innerHTML = "Survey name";
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "survey-name");
    inputName.setAttribute("required", "");
    inputName.addEventListener("change", (event) => {
      this.survey.name = event.target.value;
    });
    formContainer.appendChild(labelName);
    formContainer.appendChild(inputName);

    const labelAuthor = document.createElement("label");
    labelAuthor.setAttribute("for", "author");
    labelAuthor.innerHTML = "Author";
    const inputAuthor = document.createElement("input");
    inputAuthor.setAttribute("type", "text");
    inputAuthor.setAttribute("id", "author");
    inputAuthor.setAttribute("required", "");
    inputAuthor.addEventListener("change", (event) => {
      this.survey.author = event.target.value;
    });
    formContainer.appendChild(labelAuthor);
    formContainer.appendChild(inputAuthor);
  }

  renderQuestionsControlers(formContainer) {
    // Create h2 for questions
    const questionsHeading = document.createElement("h2");
    questionsHeading.innerHTML = "Questions";

    // Create div for questions container
    const questionsContainer = document.createElement("div");
    questionsContainer.setAttribute("id", "questions-container");

    // Create button for adding a question
    const addQuestionButton = document.createElement("button");
    addQuestionButton.setAttribute("type", "button");
    addQuestionButton.setAttribute("id", "add-question-button");
    addQuestionButton.innerHTML = "Add question";
    addQuestionButton.addEventListener("click", (event) => {
      this.addQuestion(questionsContainer);
    });

    // Create select for question type selector
    const questionTypeSelector = document.createElement("select");
    questionTypeSelector.setAttribute("id", "question-type-selector");

    // Create options for open, closed, and multi-select question types
    //lala
    Object.entries(questionTypeEnum).forEach((questionType) => {
      const optionQuestion = document.createElement("option");
      optionQuestion.setAttribute("value", questionType[1]);
      optionQuestion.innerHTML = questionType[1];
      questionTypeSelector.appendChild(optionQuestion);
    });

    questionTypeSelector.addEventListener("change", (event) => {
      this.questionType = event.target.value;
    });

    // Append elements to the container
    questionsContainer.appendChild(addQuestionButton);
    questionsContainer.appendChild(questionTypeSelector);
    formContainer.appendChild(questionsContainer);
  }

  addQuestion(questionsContainer) {
    let question;
    switch (this.questionType) {
      case questionTypeEnum.Open:
        question = new OpenQuestion({ survey: this.survey });
        break;
      case questionTypeEnum.Multi:
        question = new MultipleChoiceQuestion({ survey: this.survey });
        break;
      case questionTypeEnum.Closed:
        question = new ClosedChoiceQuestion({ survey: this.survey });

        break;
    }
    questionsContainer.appendChild(question.render());
  }
}
