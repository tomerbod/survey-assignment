const router = Router.getInstance();
const store = StoreManager.getInstance();
//on first opening
window.addEventListener("load", function () {
  router.changeRoute("/surveys", "Surveys");
});

// responsible for back and foward on browser
window.onpopstate = function (event) {
  router.handleSurveysRoute(event.state.route);
};

//mocked data
const mocked = localStorage.getItem("mocked");
if (!(mocked === "true")) {
  mockData();
}
