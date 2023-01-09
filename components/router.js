//on first opening
class Router {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  injectSurveyRoute(routeDirectory) {
    fetch(`${routeDirectory}.html`)
      .then((response) => response.text())
      .then((html) => {
        // insert the HTML code into the page
        const app = document.getElementById("app");
        app.innerHTML = html;

        fetch(`${routeDirectory}.js`)
          .then((response) => response.text())
          .then((js) => {
            // execute the JavaScript code
            eval(js);
          });
      });
  }

  handleSurveysRoute(route = "/surveys") {
    const routeParts = route.split("/");
    const surveyId = routeParts[2];

    let routeDirectory;
    switch (route) {
      case "/surveys":
        routeDirectory = "surveys/index";
        break;
      case "/surveys/create":
        routeDirectory = "/surveys/create/create";
        break;
      case `/surveys/${surveyId}`:
        routeDirectory = "/surveys/answer/answer";
        break;
      case `/surveys/${surveyId}/results`:
        routeDirectory = "/surveys/results/results";
        break;
    }
    this.injectSurveyRoute(routeDirectory);
  }

  changeRoute(route, routeName) {
    history.pushState({ route: route }, routeName, route);
    this.handleSurveysRoute(route);
  }
}
