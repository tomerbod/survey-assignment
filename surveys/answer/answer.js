//to add - pagination for answers
const id = window.location.pathname.split("/")[2];

const questions = store.get(`surveysQuestions.${id}`);
const questionArray = [];

questions?.forEach((questionData, index) => {
  let question;
  if (questionData.type === "open") {
    question = new OpenQuestion({ title: questionData.text, index: index });
  }

  if (questionData.type === "multi") {
    question = new MultipleChoiceQuestion({
      title: questionData.text,
      possibleAnswers: questionData.possibleAnswers,
      index: index,
    });
  }

  if (questionData.type === "closed") {
    question = new ClosedChoiceQuestion({
      title: questionData.text,
      possibleAnswers: questionData.possibleAnswers,
      index: index,
    });
  }
  document
    .getElementById("answer-container")
    .appendChild(question.renderForAnswers());

  questionArray.push(question);
});

if (document.getElementById("answer-survey-form")) {
  document
    .getElementById("answer-survey-form")
    .addEventListener("submit", (event) => {
      // prevent the default form submission behavior
      event.preventDefault();

      const answers = [];
      questionArray.forEach((question) => {
        if (question.type === "open") answers.push(question.currentAnswer);
        if (question.type == "closed")
          answers.push(question.possibleAnswers[question.currentAnswer]);
        if (question.type == "multi") {
          let array = [];
          question.currentAnswer.forEach((answer) =>
            array.push(question.possibleAnswers[answer])
          );
          answers.push(array);
        }
      });

      let storageAnswers = store.get(`surveysAnswers.${id}`) || [];
      storageAnswers.push(answers);
      store.set(`surveysAnswers.${id}`, storageAnswers);

      router.changeRoute("/surveys", "/surveys");
    });
}
