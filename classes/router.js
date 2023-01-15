import { SurveyPage } from "../pages/index.js";
import { AnswerPage } from "../pages/answer/answer.js";
import { ResultsPage } from "../pages/results/results.js";
import { CreatePage } from "../pages/create/create.js";
//on first opening
export class Router {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  handleSurveysRoute(route = `${urlEnum.Survey}`) {
    const url = route.split("#")[1];
    const surveyId = url.split("/")[2];
    if (document.getElementById("page")) {
      document.getElementById("page").remove();
    }

    const pageContainer = document.getElementById("pageContainer");

    switch (true) {
      case url === "/surveys":
        pageContainer.appendChild(new SurveyPage().renderPage());
        break;
      case url === "/surveys/create":
        pageContainer.append(new CreatePage().renderPage());
        break;
      case url === `/surveys/${surveyId}` && /^\d+$/.test(surveyId):
        pageContainer.append(new AnswerPage({ id: surveyId }).renderPage());
        break;
      case url === `/surveys/${surveyId}/results` && /^\d+$/.test(surveyId):
        pageContainer.append(
          new ResultsPage({
            id: surveyId,
          }).renderPage()
        );

        break;
      default:
        this.changeRoute(`${urlEnum.Survey}`, "Surveys");
        break;
    }
  }

  changeRoute(route, routeName) {
    history.pushState({ route: route }, routeName, route);
    this.handleSurveysRoute(route);
  }
}

const router = new Router();
export default router;
