import { Router } from "./router.js";

export const router = new Router();

//on first opening
window.addEventListener("load", function () {
  router.changeRoute("/surveys", "Surveys");
});

// responsible for back and foward on browser
window.onpopstate = function (event) {
  router.handleSurveysRoute(event.state.route);
};
