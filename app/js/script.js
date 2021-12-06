const container = document.querySelector("#container");
const addBookButton = document.querySelector("#add-book");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const submitButton = document.querySelector("#submit");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const notReadInput = document.querySelector("#not-read");
const input = document.querySelectorAll("input");

let library = [];

function toggleFormVisibility() {
  if (modal.style.display === "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

addBookButton.addEventListener("click", () => {
  modal.style.display = "block";
});

class Book {
  constructor() {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
      return this.title, this.author, this.pages, this.read;
    };
  }
}

function displayBooks() {
  library.forEach((element) => {
    let book = document.createElement("div");
    book.classList.add("book");

    let title = document.createElement("h3");
    let titleText = document.createTextNode(element.title);
    title.appendChild(titleText);

    let author = document.createElement("p");
    let authorText = document.createTextNode(element.author);
    author.appendChild(authorText);

    let pages = document.createElement("p");
    let pagesText = document.createTextNode(`${element.pages} Pages`);
    pages.appendChild(pagesText);

    let readStatus = document.createElement("button");
    let readStatusText = document.createTextNode("Read");
    readStatus.classList.add("read-status__button");
    readStatus.appendChild(readStatusText);

    let removeBook = document.createElement("button");
    let removeBookText = document.createTextNode("Remove");
    removeBook.classList.add("remove-book__button");
    removeBook.appendChild(removeBookText);

    let buttons = document.createElement("div");
    buttons.classList.add("buttons-container");
    buttons.appendChild(readStatus);
    buttons.appendChild(removeBook);

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(buttons);
    container.appendChild(book);

    if (element.read === true) {
      readStatus.style.backgroundColor = "#1d532c";
      readStatus.textContent = "Read";
    }
    if (element.read === false) {
      readStatus.style.backgroundColor = "#222425";
      readStatus.textContent = "Not read";
    }

    readStatus.addEventListener("click", () => {
      if (element.read === true) {
        element.read = false;
        readStatus.textContent = "Not read";
        readStatus.style.backgroundColor = "#222425";
      } else if (element.read === false) {
        element.read = true;
        readStatus.textContent = "Read";
        readStatus.style.backgroundColor = "#1d532c";
      }
    });

    removeBook.addEventListener("click", (e) => {
      library.map((element) => {
        if (
          element.title ===
          e.target.parentElement.parentElement.firstChild.textContent
        ) {
          let index = library.indexOf(element);
          library.splice(index, 1);
          container.removeChild(book);
        }
      });
    });
  });
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!titleInput.value) {
    return;
  } else if (!authorInput.value) {
    return;
  } else if (!pagesInput.value) {
    return;
  } else {
    const NewBook = Object.create(Book);
    NewBook.title = titleInput.value;
    NewBook.author = authorInput.value;
    NewBook.pages = pagesInput.value;
    if (readInput.checked) {
      NewBook.read = true;
    } else if (!readInput.checked) {
      NewBook.read = false;
    }

    library.push(NewBook);
  }
  clearInput();
  toggleFormVisibility();
  clearContainer();
  displayBooks();
  submitButton.style.backgroundColor = "#782729";
});

function clearContainer() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    submitButton.click();
  }
});

function clearInput() {
  titleInput.textContent = "";
  titleInput.value = "";
  authorInput.textContent = "";
  authorInput.value = "";
  pagesInput.textContent = "";
  pagesInput.value = "";
  readInput.textContent = "";
  readInput.value = "";
  readInput.checked = false;
}

document.addEventListener("input", () => {
  if (titleInput.value && authorInput.value && pagesInput.value) {
    submitButton.style.backgroundColor = "#1d532c";
  }
  if (!titleInput.value || !authorInput.value || !pagesInput.value) {
    submitButton.style.backgroundColor = "#782729";
  }
});

submitButton.addEventListener("mouseenter", () => {
  submitButton.style.filter = "brightness(130%)";
});

submitButton.addEventListener("mouseleave", () => {
  submitButton.style.filter = "brightness(100%)";
});

document.addEventListener("mouseup", (e) => {
  if (modal.style.display === "block") {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }
});
