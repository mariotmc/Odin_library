const container = document.querySelector("#container");
const newBookButton = document.querySelector("#new-book");
const modal = document.querySelector(".modal");
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

newBookButton.addEventListener("click", () => {
  toggleFormVisibility();
});

function Book() {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return this.title, this.author, this.pages, this.read;
  };
}

function displayBooks() {
  library.forEach((element) => {
    let book = document.createElement("div");

    let title = document.createElement("h3");
    let titleText = document.createTextNode(element.title);
    title.appendChild(titleText);

    let author = document.createElement("p");
    let authorText = document.createTextNode(`Author: ${element.author}`);
    author.appendChild(authorText);

    let pages = document.createElement("p");
    let pagesText = document.createTextNode(`Pages: ${element.pages}`);
    pages.appendChild(pagesText);

    let read = document.createElement("p");
    let readText = document.createTextNode(`Read: ${element.read}`);
    read.appendChild(readText);

    let readStatus = document.createElement("button");
    let readStatusText = document.createTextNode("Read");
    readStatus.appendChild(readStatusText);

    let removeBook = document.createElement("button");
    let removeBookText = document.createTextNode("Remove");
    removeBook.appendChild(removeBookText);

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(readStatus);
    book.appendChild(removeBook);
    container.appendChild(book);

    readStatus.addEventListener("click", () => {
      if (read.textContent === "Read: Yes") {
        read.textContent = "Read: No";
      } else if (read.textContent === "Read: No") {
        read.textContent = "Read: Yes";
      }
    });

    removeBook.addEventListener("click", () => {
      container.removeChild(book);
    });
  });
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!titleInput.value) {
    alert("Please enter a title");
  } else if (!authorInput.value) {
    alert("Please enter an author");
  } else if (!pagesInput.value) {
    alert("Please enter the number of pages");
  } else if (!pagesInput.value) {
    alert("Please enter if you have read the book");
  } else {
    const NewBook = Object.create(Book);
    NewBook.title = titleInput.value;
    NewBook.author = authorInput.value;
    NewBook.pages = pagesInput.value;
    if (readInput.checked) {
      NewBook.read = "Yes";
    } else if (!readInput.checked) {
      NewBook.read = "No";
    }

    library.push(NewBook);
  }
  clearInput();
  toggleFormVisibility();
  clearContainer();
  displayBooks();
});

function clearContainer() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

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

body.addEventListener("click", () => {
  if ((modal.style.display = "block")) {
    modal.style.display = "none";
  }
});
