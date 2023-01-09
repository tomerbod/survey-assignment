export class SurveyComponent {
  constructor(params) {
    this.id = params.id;
    this.questions = [];
    this.name = params?.name;
    this.author = params?.author;
    this.creationDate = params.creationDate || new Date();
    this.buttons = [
      { name: "Delete", class: "delete-button" },
      { name: "Results", class: "results-button" },
      { name: "Answer", class: "answer-button" },
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
    const surveyContainer = document.createElement("div");
    surveyContainer.classList.add("survey");

    const surveyName = document.createElement("div");
    surveyName.classList.add("survey-name");
    surveyName.innerHTML = `${this.name}`;
    surveyContainer.appendChild(surveyName);

    const surveyInfo = document.createElement("div");
    surveyInfo.classList.add("survey-info");
    surveyInfo.innerHTML = `Created by ${this.author} on ${this.creationDate}`;
    surveyContainer.appendChild(surveyInfo);

    const surveyButtonContainer = document.createElement("div");
    surveyButtonContainer.classList.add("survey-buttons");
    surveyContainer.appendChild(surveyButtonContainer);

    this.buttons.forEach((button) => {
      const surveyButton = document.createElement("button");
      surveyButton.classList.add(button.class);
      surveyButton.setAttribute("data-innerId", this.id);
      surveyButton.innerHTML = button.name;
      surveyButtonContainer.appendChild(surveyButton);
    });

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
      let surveys = store.get(`surveys.${this.id}`) || [];
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
}
