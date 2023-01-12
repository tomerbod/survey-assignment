import store from "../../classes/storeManagerClass.js";
import router from "../../classes/router.js";
import { ClosedChoiceQuestion } from "../../classes/question/ClosedChoiceClass.js";
import { OpenQuestion } from "../../classes/question/openQuestionClass.js";
import { MultipleChoiceQuestion } from "../../classes/question/multipleChoiceClass.js";

export class AnswerPage {
  constructor(params) {
    this.id = params?.id;
    this.questionsData = store.get(`${prefixEnum.Questions}.${params?.id}`);
    this.questionsOnPage = [];
  }

  renderPage() {
    const container = document.createElement("div");
    container.setAttribute("id", "page");
    const formContainer = document.createElement("form");
    formContainer.setAttribute("id", "answer-survey-form");
    const title = document.createElement("h2");
    title.innerText = "Answer Survey";
    formContainer.appendChild(title);
    const answerContainer = document.createElement("div");
    answerContainer.setAttribute("id", "answer-container");
    this.renderQuestions(answerContainer);

    formContainer.appendChild(answerContainer);
    const createButton = document.createElement("button");
    createButton.setAttribute("id", "submit-answers-button");
    createButton.innerText = "Submit";
    createButton.type = "button";

    createButton.addEventListener("click", (event) => {
      // prevent the default form submission behavior
      event.preventDefault();
      this.saveAnswers();
    });

    formContainer.appendChild(createButton);
    container.appendChild(formContainer);
    return container;
  }

  renderQuestions(answerContainer) {
    this.questionsData?.forEach((questionData, index) => {
      let question;

      switch (questionData.type) {
        case questionTypeEnum.Open:
          question = new OpenQuestion({
            title: questionData.text,
            index: index,
          });
          break;
        case questionTypeEnum.Multi:
          question = new MultipleChoiceQuestion({
            title: questionData.text,
            possibleAnswers: questionData.possibleAnswers,
            index: index,
          });
          break;
        case questionTypeEnum.Closed:
          question = new ClosedChoiceQuestion({
            title: questionData.text,
            possibleAnswers: questionData.possibleAnswers,
            index: index,
          });
          break;
      }
      answerContainer.appendChild(question.renderForAnswers());

      this.questionsOnPage.push(question);
    });
  }

  saveAnswers() {
    const answers = [];
    this.questionsOnPage.forEach((question) => {
      switch (question.type) {
        case questionTypeEnum.Open:
          answers.push(question.currentAnswer);
          break;
        case questionTypeEnum.Closed:
          answers.push(question.possibleAnswers[question.currentAnswer]);
          break;
        case questionTypeEnum.Multi:
          let array = [];
          question.currentAnswer.forEach((answer) =>
            array.push(question.possibleAnswers[answer])
          );
          answers.push(array);
          break;
      }
    });
    let AnswersCounter = store.get(
      `${prefixEnum.Answers}.${this.id}.${prefixEnum.Counter}`
    );
    store.set(
      `${prefixEnum.Answers}.${this.id}.${AnswersCounter + 1}`,
      answers
    );
    store.set(
      `${prefixEnum.Answers}.${this.id}.${prefixEnum.Counter}`,
      AnswersCounter + 1
    );

    router.changeRoute(`${urlEnum.Survey}`, "Surveys");
  }
}
