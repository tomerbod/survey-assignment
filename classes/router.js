//on first opening
export class Router {
  handleSurveysRoute(route = `${urlEnum.Survey}`) {
    const url = route.split("#")[1];
    const surveyId = url.split("/")[2];

    const pageContainer = document.getElementById("pageContainer");
    switch (true) {
      case url === "/surveys":
        import(`..${directories.HomePage}`).then((imporedPage) => {
          document.getElementById("page")?.remove();
          pageContainer.appendChild(new imporedPage.SurveyPage().renderPage());
        });
        break;
      case url === "/surveys/create":
        import(`..${directories.CreatePage}`).then((imporedPage) => {
          document.getElementById("page")?.remove();
          pageContainer.appendChild(new imporedPage.CreatePage().renderPage());
        });
        break;
      case url === `/surveys/${surveyId}` && isSurveyIdValid(surveyId):
        import(`..${directories.AnswerPage}`).then((imporedPage) => {
          document.getElementById("page")?.remove();
          pageContainer.appendChild(
            new imporedPage.AnswerPage({ id: surveyId }).renderPage()
          );
        });
        break;
      case url === `/surveys/${surveyId}/results` && isSurveyIdValid(surveyId):
        import(`..${directories.ResultPage}`).then((imporedPage) => {
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
