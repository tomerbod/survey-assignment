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
      paginationHTML += `<span class="pagination-item active">page ${i} </span>`;
    } else {
      paginationHTML += `<a href="#" class="pagination-item" data-page="${i}">page ${i} </a>`;
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
