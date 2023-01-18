import { isSurveyIdValid } from "../utils/validators.js";
import { urlEnum } from "../utils/constans.js";
import { SurveyPage } from "../pages/index.js";
import { AnswerPage } from "../pages/answer/answer.js";
import { CreatePage } from "../pages/create/create.js";
import { ResultsPage } from "../pages/results/results.js";

//on first opening
class Router {
  handleSurveysRoute(route = `${urlEnum.Survey}`) {
    const url = route.split("#")[1];
    const surveyId = url.split("/")[2];
    document.getElementById("page")?.remove();

    const pageContainer = document.getElementById("pageContainer");
    switch (true) {
      case url === "/surveys":
        pageContainer.appendChild(new SurveyPage().renderPage());
        break;
      case url === "/surveys/create":
        pageContainer.appendChild(new CreatePage().renderPage());
        break;
      case url === `/surveys/${surveyId}` && isSurveyIdValid(surveyId):
        pageContainer.appendChild(
          new AnswerPage({ id: surveyId }).renderPage()
        );
        break;
      case url === `/surveys/${surveyId}/results` && isSurveyIdValid(surveyId):
        pageContainer.appendChild(
          new ResultsPage({ id: surveyId }).renderPage()
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
