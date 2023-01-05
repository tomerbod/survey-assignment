window.addEventListener("load", function () {
  history.pushState({ route: "/surveys" }, "Surveys", "/surveys");
  handleSurveysRoute();
});

const handleSurveysRoute = (route = "/surveys") => {
  const routeParts = route.split("/");
  const surveyId = routeParts[2];

  let routeDirectory;
  switch (route) {
    case "/surveys":
      routeDirectory = "surveys/index";
      break;
    case "/surveys/create":
      routeDirectory = "/surveys/create";
      break;
    case `/surveys/${surveyId}`:
      routeDirectory = "/surveys/answer";
      break;
    case `/surveys/${surveyId}/results`:
      routeDirectory = "/surveys/results";
      break;
  }
  renderSurveyRoute(routeDirectory);
  return;
};

const renderSurveyRoute = (routeDirectory) => {
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
};

// responsible for back and foward on browser
window.onpopstate = function (event) {
  handleSurveysRoute(event.state.route);
};
