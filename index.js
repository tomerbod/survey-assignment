import router from "./classes/router.js";

// responsible for back and foward on browser
window.onpopstate = (event) => {
  if (event.state?.route) router.handleSurveysRoute(event.state.route);
};

window.onhashchange = (event) => {
  router.handleSurveysRoute(event.newURL);
};

//on first opening
window.addEventListener("load", () => {
  router.changeRoute(`${urlEnum.Survey}`, "Surveys");
});

//mocked data
const mocked = localStorage.getItem("mocked");
if (!(mocked === "true")) {
  mockData();
}
