class SurveyComponent {
  constructor(params) {
    this.id = params.id;
    this.questions = [];
    this.name = params?.name;
    this.author = params?.author;
    this.creationDate = params.creationDate || new Date();
    this.buttons = [
      { name: "Delete", class: "delete-button", callback: this.deleteSurvey },
      {
        name: "Results",
        class: "results-button",
        callback: this.displaySurveyResults,
      },
      { name: "Answer", class: "answer-button", callback: this.answerSurvey },
    ];
  }

  checkValidation() {
    if (this.questions.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const surveyContainer = document.createElement("tr");

    const surveyName = document.createElement("td");
    surveyName.innerHTML = this.name;
    surveyContainer.appendChild(surveyName);

    const surveyAuthor = document.createElement("td");
    surveyAuthor.innerHTML = this.author;
    surveyContainer.appendChild(surveyAuthor);

    const surveyCreationDate = document.createElement("td");
    surveyCreationDate.innerHTML = new Date(
      this.creationDate
    ).toLocaleDateString();
    surveyContainer.appendChild(surveyCreationDate);

    const surveyButtons = document.createElement("td");
    this.buttons.forEach((button) => {
      const surveyButton = document.createElement("button");
      surveyButton.classList.add(button.class);
      surveyButton.setAttribute("data-innerId", this.id);
      surveyButton.innerHTML = button.name;
      surveyButton.addEventListener("click", () => button.callback());
      surveyButtons.appendChild(surveyButton);
    });

    surveyContainer.appendChild(surveyButtons);
    return surveyContainer;
  }

  save() {
    store.set(`surveys.${this.id}`, {
      name: this.name,
      author: this.author,
      creationDate: this.creationDate,
      id: this.id,
    });
    //can add binary search
    sortBy.forEach((sort) => {
      let surveys = store.get(`surveys.${sort}`) || [];
      const surveyData = {};
      (surveyData["id"] = this.id), (surveyData[sort] = this[sort]);
      surveys.push(surveyData);

      surveys.sort((a, b) => {
        if (a[sort] < b[sort]) {
          return -1;
        }
        if (a[sort] > b[sort]) {
          return 1;
        }
        return 0;
      });

      store.set(`surveys.${sort}`, surveys);
    });

    store.set(`surveysQuestions.${this.id}`, this.questions);

    store.set("surveysCreated", this.id);
  }
  addQuestion(question) {
    const array = this.questions;
    array.push(question);
    this.questions = array;
  }

  deleteSurvey = () => {
    sortBy.forEach((sort) => {
      //can use binary search
      let surveys = store.get(`surveys.${sort}`);
      surveys = surveys.filter((survey) => this.id != survey.id);
      store.set(`surveys.${sort}`, surveys);
    });
    store.remove(`surveys.${this.id}`);
    store.remove(`surveysQuestions.${this.id}`);
    store.remove(`surveysAnswers.${this.id}`);
  };

  displaySurveyResults = () => {
    router.changeRoute(`/surveys/${this.id}/results`, "Results");
  };

  answerSurvey = () => {
    router.changeRoute(`/surveys/${this.id}`, "Answer Survey");
  };
}
