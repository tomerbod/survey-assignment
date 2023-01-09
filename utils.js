const handlePagination = (
  array,
  handlePaginationLinkClick,
  listId,
  page,
  handleElementsFunction,
  NumberOfElementsInPage
) => {
  // determine the number of pages needed to display all of the elements
  const numPages = Math.ceil(array.length / NumberOfElementsInPage);

  // retrieve the elements to display on the current page
  const startIndex = (page - 1) * NumberOfElementsInPage;
  const endIndex = startIndex + NumberOfElementsInPage;
  const elementsToDisplay = array.slice(startIndex, endIndex);

  if (document.getElementById("elements-container")) {
    document.getElementById("elements-container").remove();
  }

  const elementsContainer = document.createElement("div");
  elementsContainer.setAttribute("id", "elements-container");

  handleElementsFunction(elementsToDisplay, elementsContainer);

  // add the HTML string to the div element

  document.getElementById(listId).append(elementsContainer);

  let paginationHTML = "";
  for (let i = 1; i <= numPages; i++) {
    if (i == page) {
      paginationHTML += `<span class="pagination-item active">${i}</span>`;
    } else {
      paginationHTML += `<a href="#" class="pagination-item" data-page="${i}">${i}</a>`;
    }
  }

  // add the HTML string to the div element
  document.getElementById("pagination").innerHTML = paginationHTML;

  // add event listeners to the pagination links
  const paginationLinks = document.querySelectorAll(".pagination-item");
  paginationLinks.forEach((element) => {
    element.addEventListener("click", handlePaginationLinkClick);
  });
};

const sortBy = ["name", "creationDate", "author"];

class StoreManager {
  static getInstance() {
    if (!this.instance) {
      this.instance = new StoreManager();
    }
    return this.instance;
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

const store = new StoreManager();

class SurveyComponent {
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
    localStorage.setItem(
      `surveys.${this.id}`,
      JSON.stringify({
        name: this.name,
        author: this.author,
        creationDate: this.creationDate,
        id: this.id,
      })
    );
    //can add binary search
    sortBy.forEach((sort) => {
      let surveys = JSON.parse(localStorage.getItem(`surveys.${sort}`)) || [];
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

      localStorage.setItem(`surveys.${sort}`, JSON.stringify(surveys));
    });
    localStorage.setItem(
      `surveysQuestions.${this.id}`,
      JSON.stringify(this.questions)
    );
    store.set("surveysCreated", this.id);
  }
  addQuestion(question) {
    const array = this.questions;
    array.push(question);
    this.questions = array;
  }
}

class Question {
  constructor(params) {
    this.survey = params?.survey;
    this.title = params?.title;
    this.index = params?.index;
  }

  insert() {
    if (this.possibleAnswersCounter === 0) {
      return false;
    }
    const question = { ...this };
    delete question.survey;
    this.survey.addQuestion(question);
    return true;
  }

  render() {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    // create the question text field
    const questionTextField = document.createElement("input");
    questionTextField.type = "text";
    questionTextField.placeholder = "Question text";
    questionTextField.setAttribute("required", "");
    questionElement.appendChild(questionTextField);
    questionTextField.addEventListener("change", (event) => {
      this.text = event.target.value;
    });

    const questionInsertButton = document.createElement("button");
    questionInsertButton.classList.add("question-insert-button");
    questionInsertButton.type = "button";
    questionInsertButton.innerHTML = "Insert";
    questionInsertButton.addEventListener("click", (event) => {
      if (this.insert()) {
        questionElement.remove();
      }
    });
    questionElement.appendChild(questionInsertButton);

    return questionElement;
  }

  renderForAnswers() {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionTitle = document.createElement("h2");
    questionTitle.innerText = this.title;
    questionElement.appendChild(questionTitle);

    return questionElement;
  }
}

class OpenQuestion extends Question {
  constructor(params) {
    super(params);
    this.type = "open";
    this.possibleAnswersCounter = -1;
    //  this.answers = answers;
  }

  render() {
    const questionElement = super.render();
    //    questionElement.innerHTML += `
    //      <div class="answers">
    //       ${this.answers
    //         .map((answer) => `<div class="answer">${answer}</div>`)
    //          .join("")}
    //     </div>
    //   `;
    return questionElement;
  }

  renderForAnswers() {
    const questionElement = super.renderForAnswers();
    const answerInput = document.createElement("textarea");
    answerInput.setAttribute("required", "");
    answerInput.setAttribute("name", `question-${this.index}`);
    answerInput.addEventListener("change", (event) => {
      this.currentAnswer = event.target.value;
    });
    questionElement.appendChild(answerInput);

    return questionElement;
  }
}

class ChoiceQuestion extends Question {
  constructor(params) {
    super(params);
    this.possibleAnswers = params?.possibleAnswers || [];
    this.possibleAnswersCounter = params?.possibleAnswersCounter || 0;
  }

  render() {
    const questionElement = super.render();

    const answersContainer = document.createElement("div");
    answersContainer.classList.add("answers-container");
    questionElement.appendChild(answersContainer);

    const addAnswersButton = document.createElement("button");
    addAnswersButton.classList.add("create-answers-button");
    addAnswersButton.innerText = "Add answer";
    addAnswersButton.type = "button";
    questionElement.appendChild(addAnswersButton);

    addAnswersButton.addEventListener("click", (event) => {
      // create an input element for the answer
      const answerInput = document.createElement("input");
      answerInput.type = "text";
      answerInput.placeholder = "Answer";

      answerInput.addEventListener("change", (event) => {
        this.possibleAnswers[this.possibleAnswersCounter - 1] =
          event.target.value;
      });

      // insert the input element into the question element
      answersContainer.appendChild(answerInput);
      this.possibleAnswersCounter = this.possibleAnswersCounter + 1;
    });

    return questionElement;
  }
}

class MultipleChoiceQuestion extends ChoiceQuestion {
  constructor(params) {
    super(params);
    this.type = "multi";
  }

  render() {
    const questionElement = super.render();
    return questionElement;
  }

  renderForAnswers() {
    const questionElement = super.renderForAnswers();
    this.possibleAnswers.forEach((answer, answerIndex) => {
      const answerContainer = document.createElement("div");
      const answerInput = document.createElement("input");
      answerInput.type = "checkbox";
      answerInput.value = answerIndex;
      answerInput.setAttribute("name", `question-${this.index}`);
      answerInput.addEventListener("change", (event) => {
        let array = this.currentAnswer || [];

        const value = event.target.value;
        if (array.includes(value)) {
          array = array.filter((currentValue) => currentValue != value);
        } else {
          array.push(value);
        }
        this.currentAnswer = array;
      });
      answerContainer.appendChild(answerInput);
      const answerText = document.createElement("text");
      answerText.innerHTML = answer;
      answerContainer.appendChild(answerText);
      questionElement.appendChild(answerContainer);
    });
    return questionElement;
  }
}

class ClosedChoiceQuestion extends ChoiceQuestion {
  constructor(params) {
    super(params);
    this.type = "closed";
  }

  render() {
    const questionElement = super.render();

    return questionElement;
  }

  renderForAnswers() {
    const questionElement = super.renderForAnswers();
    this.possibleAnswers.forEach((answer, answerIndex) => {
      const answerContainer = document.createElement("div");
      const answerInput = document.createElement("input");
      answerInput.type = "radio";
      answerInput.value = answerIndex;
      answerInput.setAttribute("name", `question-${this.index}`);
      answerInput.setAttribute("required", "");
      answerInput.addEventListener("change", (event) => {
        this.currentAnswer = event.target.value;
      });
      answerContainer.appendChild(answerInput);
      const answerText = document.createElement("text");
      answerText.innerHTML = answer;
      answerContainer.appendChild(answerText);
      questionElement.appendChild(answerContainer);
    });
    return questionElement;
  }
}
