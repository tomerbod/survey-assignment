import router from "./classes/router.js";
import { mockData } from "./mocked.js";
import { urlEnum } from "./constans.js";

// responsible for back and foward on browser
window.onpopstate = (event) => {
  if (event.state?.route) router.handleSurveysRoute(event.state.route);
};

window.onhashchange = (event) => {
  router.handleSurveysRoute(event.newURL);
};

window.addEventListener("load", (event) => {
  const url = window.location.href;
  if (url.includes("#")) {
    router.handleSurveysRoute(url);
  } else {
    //first load
    router.changeRoute(`${urlEnum.Survey}`, "/#/Surveys");
  }
});

//mocked data
const mocked = localStorage.getItem("mocked");
if (!(mocked === "true")) {
  mockData();
}
