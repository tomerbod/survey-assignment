import store from "../../classes/storeManagerClass.js";
import { OpenResult } from "../../classes/Result/openResultClass.js";
import { ClosedResult } from "../../classes/Result/closedResultClass.js";
import { MultiResult } from "../../classes/Result/multiResultClass.js";
import { paginationClass } from "../../classes/paginationClass.js";
import {
  prefixEnum,
  NumberOfQuestionsInPage,
  questionTypeEnum,
} from "../../constans.js";

export class ResultsPage {
  constructor(params, page = 1) {
    this.page = page;
    this.id = params?.id;
    this.surveyQuestions = store.get(`${prefixEnum.Questions}.${this.id}`);
    this.surveyResults = this.getResultsData();
  }

  renderPage() {
    const container = document.createElement("div");
    container.setAttribute("id", "page");
    if (this.surveyQuestions === null) {
      const error = document.createElement("h2");
      error.innerText = `there is no survey under the id of ${this.id}`;
      container.appendChild(error);
    } else {
      const title = document.createElement("h2");
      title.innerText = "Results for survey";
      container.appendChild(title);
      container.appendChild(this.renderResultList());
    }
    return container;
  }

  handlePaginationLinkClick(event) {
    event.preventDefault();
    this.page = event.target.getAttribute("data-page") || this.page;
    document.getElementById("elements-container").remove();
    document.getElementById("page").appendChild(this.renderResultList());
  }

  renderResultList() {
    return new paginationClass({
      array: this.surveyQuestions,
      handlePaginationLinkClick: this.handlePaginationLinkClick.bind(this),
      page: this.page,
      handleElementsFunction: this.addResults.bind(this),
    }).renderPagination();
  }

  addResults(resultsToDisplay, resultListContainer) {
    resultsToDisplay.forEach((question, index) => {
      let result;
      switch (question.type) {
        case questionTypeEnum.Open:
          result = new OpenResult({
            title: question.text,
            answers: this.surveyResults,
            index: index + NumberOfQuestionsInPage * (this.page - 1),
          });
          break;
        case questionTypeEnum.Multi:
          result = new MultiResult({
            title: question.text,
            answers: this.surveyResults,
            index: index + NumberOfQuestionsInPage * (this.page - 1),
            possibleAnswers: question.possibleAnswers,
          });
          break;
        case questionTypeEnum.Closed:
          result = new ClosedResult({
            title: question.text,
            answers: this.surveyResults,
            index: index + NumberOfQuestionsInPage * (this.page - 1),
            possibleAnswers: question.possibleAnswers,
          });

          break;
      }

      resultListContainer.appendChild(result.render());
      return resultListContainer;
    });
  }

  getResultsData() {
    const results = [];
    const counter = store.get(
      `${prefixEnum.Answers}.${this.id}.${prefixEnum.Counter}`
    );
    for (let index = 1; index <= counter; index++) {
      const result = store.get(`${prefixEnum.Answers}.${this.id}.${index}`);
      results.push(result);
    }
    return results;
  }
}
