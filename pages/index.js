import store from "../classes/storeManagerClass.js";
import router from "../classes/router.js";
import { SurveyClass } from "../classes/surveyComponent.js";
import { paginationClass } from "../classes/paginationClass.js";
import { sortBy, prefixEnum, urlEnum } from "../utils/constans.js";

const tableString = `<tr>
<th>Name</th>
<th>Author</th>
<th>Creation Date</th>
<th>Actions</th>
</tr>`;
const options = {
  creationDate: "creation date",
  name: "name",
  author: "author",
};

export class SurveyPage {
  constructor(page = 1, sortBy = "creationDate") {
    this.page = page;
    this.sortBy = sortBy;
  }
  renderPage() {
    const container = document.createElement("div");
    this.createPageHeader(container);
    this.createCreateButton(container);
    container.appendChild(this.renderSurveys());
    return container;
  }

  createPageHeader(container) {
    container.setAttribute("id", "page");
    const title = document.createElement("h2");
    title.innerText = "Existing surveys";
    container.appendChild(title);
    const select = document.createElement("select");
    select.setAttribute("id", "sort-by");
    sortBy.forEach((option) => {
      const selectOption = document.createElement("option");
      selectOption.setAttribute("value", option);
      selectOption.innerHTML = options[option];
      select.appendChild(selectOption);
    });
    select.addEventListener("change", (event) => {
      this.sortBy = event.target.value;
      document.getElementById("elements-container").remove();
      document.getElementById("page").appendChild(this.renderSurveys());
    });
    container.appendChild(select);
  }

  createCreateButton(container) {
    const createButton = document.createElement("button");
    createButton.setAttribute("id", "create-survey");
    createButton.innerText = "Create survey";
    createButton.addEventListener("click", () => {
      router.changeRoute(`${urlEnum.Survey}${urlEnum.Create}`, "Create Survey");
    });
    container.appendChild(createButton);
  }

  renderSurveys() {
    let surveysByTopic = store.get(`${prefixEnum.Surveys}.${this.sortBy}`);
    if (surveysByTopic?.length > 0) {
      return new paginationClass({
        array: surveysByTopic,
        handlePaginationLinkClick: this.handlePaginationLinkClick.bind(this),
        page: this.page,
        handleElementsFunction: this.addSurveys,
      }).renderPagination();
    }
  }

  // handle click events for the pagination links
  handlePaginationLinkClick(event) {
    event.preventDefault();
    this.page = event.target.getAttribute("data-page") || this.page;
    document.getElementById("elements-container").remove();
    document.getElementById("page").appendChild(this.renderSurveys());
  }
  addSurveys(surveysToDisplay, surveyListContainer) {
    const table = document.createElement("table");
    table.innerHTML = tableString;
    surveysToDisplay.forEach((surveyToDisplay) => {
      const surveyData = store.get(
        `${prefixEnum.Surveys}.${surveyToDisplay.id}`
      );
      const survey = new SurveyClass({ ...surveyData, surveyPage: this });
      table.appendChild(survey.render());
    });
    surveyListContainer.appendChild(table);
  }
}
