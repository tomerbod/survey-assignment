export class paginationClass {
  constructor(params) {
    this.array = params?.array;
    this.handlePaginationLinkClick = params?.handlePaginationLinkClick;
    this.page = params?.page;
    this.handleElementsFunction = params?.handleElementsFunction;
    this.NumberOfElementsInPage = 4;
  }

  renderPagination() {
    const numPages = Math.ceil(this.array.length / this.NumberOfElementsInPage);
    // retrieve the elements to display on the current page
    const startIndex = (this.page - 1) * this.NumberOfElementsInPage;
    const endIndex = startIndex + this.NumberOfElementsInPage;
    const elementsToDisplay = this.array.slice(startIndex, endIndex);

    this.removeLastPage();

    const elementsContainer = document.createElement("div");
    elementsContainer.setAttribute("id", "elements-container");

    this.handleElementsFunction(elementsToDisplay, elementsContainer);

    elementsContainer.appendChild(this.createPaginationPages(numPages));

    return elementsContainer;
  }

  removeLastPage() {
    if (document.getElementById("elements-container")) {
      document.getElementById("elements-container").remove();
    }
  }

  createPaginationPages(numPages) {
    const paginationContainer = document.createElement("div");
    paginationContainer.setAttribute("id", "pagination");
    let paginationPage;
    for (let i = 1; i <= numPages; i++) {
      if (i == this.page) {
        paginationPage = document.createElement("span");
        paginationPage.classList.add("active");
      } else {
        paginationPage = document.createElement("a");
        paginationPage.setAttribute("href", "#");
      }
      paginationPage.classList.add("pagination-item");
      paginationPage.setAttribute("data-page", i);
      paginationPage.innerText = `page ${i}`;
      paginationPage.addEventListener("click", this.handlePaginationLinkClick);
      paginationContainer.appendChild(paginationPage);
    }
    return paginationContainer;
  }
}
