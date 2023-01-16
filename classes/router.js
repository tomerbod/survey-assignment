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

    const pageContainer = document.getElementById("pageContainer");
    switch (true) {
      case url === "/surveys":
        console.log("/surveys");
        import("../pages/index.js").then((imporedPage) => {
          document.getElementById("page")?.remove();
          pageContainer.appendChild(new imporedPage.SurveyPage().renderPage());
        });
        break;
      case url === "/surveys/create":
        import("../pages/create/create.js").then((imporedPage) => {
          document.getElementById("page")?.remove();
          pageContainer.appendChild(new imporedPage.CreatePage().renderPage());
        });
        break;
      case url === `/surveys/${surveyId}` && /^\d+$/.test(surveyId):
        import("../pages/answer/answer.js").then((imporedPage) => {
          document.getElementById("page")?.remove();
          pageContainer.appendChild(
            new imporedPage.AnswerPage({ id: surveyId }).renderPage()
          );
        });
        break;
      case url === `/surveys/${surveyId}/results` && /^\d+$/.test(surveyId):
        import("../pages/results/results.js").then((imporedPage) => {
          document.getElementById("page")?.remove();
          pageContainer.appendChild(
            new imporedPage.ResultsPage({
              id: surveyId,
            }).renderPage()
          );
        });

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
