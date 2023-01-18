import router from "./router.js";
import store from "./storeManagerClass.js";
import { sortBy, prefixEnum, urlEnum } from "../utils/constans.js";

export class SurveyClass {
  constructor(params) {
    this.id = params.id;
    this.questions = [];
    this.name = params?.name;
    this.author = params?.author;
    this.creationDate = params.creationDate || new Date();
    this.buttons = [
      { name: "Delete", class: "delete-button", callback: this.deleteSurvey },
      {
        name: "Results",
        class: "results-button",
        callback: this.displaySurveyResults,
      },
      { name: "Answer", class: "answer-button", callback: this.answerSurvey },
    ];
    this.surveyPage = params?.surveyPage;
  }

  checkValidation() {
    if (this.questions.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const surveyContainer = document.createElement("tr");

    const surveyName = document.createElement("td");
    surveyName.innerHTML = this.name;
    surveyContainer.appendChild(surveyName);

    const surveyAuthor = document.createElement("td");
    surveyAuthor.innerHTML = this.author;
    surveyContainer.appendChild(surveyAuthor);

    const surveyCreationDate = document.createElement("td");
    surveyCreationDate.innerHTML = new Date(
      this.creationDate
    ).toLocaleDateString();
    surveyContainer.appendChild(surveyCreationDate);

    const surveyButtons = document.createElement("td");
    this.buttons.forEach((button) => {
      const surveyButton = document.createElement("button");
      surveyButton.classList.add(button.class);
      surveyButton.setAttribute("data-innerId", this.id);
      surveyButton.innerHTML = button.name;
      surveyButton.addEventListener("click", () => button.callback());
      surveyButtons.appendChild(surveyButton);
    });

    surveyContainer.appendChild(surveyButtons);
    return surveyContainer;
  }

  save() {
    store.set(`${prefixEnum.Surveys}.${this.id}`, {
      name: this.name,
      author: this.author,
      creationDate: this.creationDate,
      id: this.id,
    });
    //can add binary search
    sortBy.forEach((sort) => {
      let surveys = store.get(`${prefixEnum.Surveys}.${sort}`) || [];
      const surveyData = {};
      (surveyData["id"] = this.id), (surveyData[sort] = this[sort]);
      surveys.push(surveyData);

      surveys.sort((a, b) => {
        if (a[sort] < b[sort]) {
          return -1;
        }
        if (a[sort] > b[sort]) {
          return 1;
        }
        return 0;
      });

      store.set(`${prefixEnum.Surveys}.${sort}`, surveys);
    });

    store.set(`${prefixEnum.Questions}.${this.id}`, this.questions);
    store.set(`${prefixEnum.Answers}.${this.id}.${prefixEnum.Counter}`, 0);
    store.set("surveysCreated", this.id);
  }
  addQuestion(question) {
    const array = this.questions;
    array.push(question);
    this.questions = array;
  }

  deleteSurvey = () => {
    sortBy.forEach((sort) => {
      //can use binary search
      let surveys = store.get(`${prefixEnum.Surveys}.${sort}`);
      surveys = surveys.filter((survey) => this.id != survey.id);
      store.set(`${prefixEnum.Surveys}.${sort}`, surveys);
    });
    store.remove(`${prefixEnum.Surveys}.${this.id}`);
    store.remove(`${prefixEnum.Questions}.${this.id}`);
    const counter = store.get(
      `${prefixEnum.Answers}.${this.id}.${prefixEnum.Counter}`
    );
    for (let index = 1; index < counter; index++) {
      store.remove(`${prefixEnum.Answers}.${this.id}.${index}`);
    }
    store.remove(`${prefixEnum.Answers}.${this.id}.${prefixEnum.Counter}`);
    router.changeRoute(`${urlEnum.Survey}`, "Surveys");
  };

  displaySurveyResults = () => {
    router.changeRoute(
      `${urlEnum.Survey}/${this.id}${urlEnum.Results}`,
      "Results"
    );
  };

  answerSurvey = () => {
    router.changeRoute(`${urlEnum.Survey}/${this.id}`, "Answer Survey");
  };
}
