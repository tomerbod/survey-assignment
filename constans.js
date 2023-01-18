const sortBy = ["creationDate", "name", "author"];

const prefixEnum = {
  Surveys: "surveys",
  Questions: "surveysQuestions",
  Answers: "surveysAnswers",
  Counter: "counter",
};

const questionTypeEnum = {
  Open: "open",
  Closed: "closed",
  Multi: "multi",
};

const urlEnum = {
  Survey: "/#/surveys",
  Create: "/create",
  Results: "/results",
};

const NumberOfQuestionsInPage = 4;

const directoriesEnum = {
  HomePage: "/pages/index.js",
  CreatePage: "/pages/create/create.js",
  AnswerPage: "/pages/answer/answer.js",
  ResultPage: "/pages/results/results.js",
};

export {
  sortBy,
  prefixEnum,
  questionTypeEnum,
  urlEnum,
  NumberOfQuestionsInPage,
  directoriesEnum,
};
