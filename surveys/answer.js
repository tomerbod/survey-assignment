//to add - pagination for answers

const id = window.location.pathname.split("/")[2];
const questions = JSON.parse(localStorage.getItem(`surveysQuestions.${id}`));

let answerSurveyHTML = "";
questions?.forEach((question, index) => {
  answerSurveyHTML += `
      <div class="question">
        <h2>${question.text}</h2>
    `;
  switch (question.type) {
    case "open":
      answerSurveyHTML += `
            <textarea name="question-${index}" required></textarea>
          `;
      break;
    case "closed":
      question.possibleAnswers.forEach((answer, answerIndex) => {
        answerSurveyHTML += `
                <input type="radio" name="question-${index}" value="${answerIndex}" required> ${answer}<br>
              `;
      });
      break;
    case "multi":
      question.possibleAnswers.forEach((answer, answerIndex) => {
        answerSurveyHTML += `
                    <input type="checkbox" name="question-${index}" value="${answerIndex}"> ${answer}<br>
                  `;
      });
      break;
    default:
      break;
  }
  answerSurveyHTML += `</div>`;
});

if (document.getElementById("answer-container") != null) {
  document.getElementById("answer-container").innerHTML = answerSurveyHTML;
}
if (document.getElementById("answer-survey-form")) {
  document
    .getElementById("answer-survey-form")
    .addEventListener("submit", (event) => {
      // prevent the default form submission behavior
      event.preventDefault();
      const answers = [];

      // iterate through each question in the survey
      questions.forEach((question, index) => {
        // retrieve the answer for open questions

        if (question.type === "open") {
          answers.push(event.target[`question-${index}`].value);
        }

        // retrieve the answer for closed questions
        if (question.type === "closed") {
          answers.push(
            question.possibleAnswers[event.target[`question-${index}`].value]
          );
        }

        if (question.type === "multi") {
          const choosedAnswers = Array.from(event.target[`question-${index}`])
            .filter((answer) => answer.checked)
            .map((checkedAnswer) => checkedAnswer.value)
            .map((answerValue) => question.possibleAnswers[answerValue]);
          answers.push(choosedAnswers);
        }
      });

      let storageAnswers =
        JSON.parse(localStorage.getItem(`surveysAnswers.${id}`)) || [];
      storageAnswers.push(answers);
      // save the answers to local storage
      localStorage.setItem(
        `surveysAnswers.${id}`,
        JSON.stringify(storageAnswers)
      );

      // navigate back to the survey list page
      history.pushState({ route: "/surveys" }, "Surveys", "/surveys");
      handleSurveysRoute();
    });
}
