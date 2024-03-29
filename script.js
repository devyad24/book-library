class Book {
    constructor(title,author,pages,status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    get getTitle() {
        return `${this.title}`;
    }

    get getAuthor() {
        return `${this.author}`;
    }

    get getPages(){
        return `${this.pages}`;
    }

    get getStatus(){
        return `${this.status}`;
    }
}

let myLibrary = [];

const addBookBtn = document.querySelector("#book_btn");
const popup = document.querySelector("#popup");
const popupOverlay = document.querySelector("#popup-overlay");
const exitFormbtn = document.querySelector("#exitbtn");
let readBooks = 0;
let wishlistBooks = 0;
let shelfBooks = 0;

function exitForm(e) {
    popup.classList.toggle("opened");
    popupOverlay.classList.toggle("opened");
    popup.style.zindex = "-200";
    popupOverlay.style.zindex = "-250";
    let books = document.querySelectorAll(`div[data-book]`);
    books.forEach(b => b.remove());
    displayBooks();
}

exitFormbtn.addEventListener("click", exitForm);

const form = document.querySelector("#myForm");
let submitFormbtn = document.querySelector("#addFormbtn");
let bookTitle = document.querySelector('#title');
let bookAuthor = document.querySelector("#author");
let bookPages = document.querySelector("#pages");
let bookStatus = document.querySelector("#read");
let myForm = document.querySelector("#myForm");

addBookBtn.addEventListener("click", () => {
    document.getElementById("title").focus();
    popup.classList.toggle("opened");
    popupOverlay.classList.toggle("opened");
    popup.style.zIndex = "200";
    popupOverlay.style.zIndex = "150";
});


const allBooksDiv = document.querySelector(".books");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    bookTitle.required = true;
    let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.value);
        myLibrary.push(newBook);
        if (newBook.getStatus === "read") {
            readBooks++;
            statusRead.textContent = readBooks;
        }
        else if (newBook.getStatus === "wantToRead") {
            wishlistBooks++;
            statusWishlist.textContent = wishlistBooks;
        }
        else {
            shelfBooks++;
            statusShelf.textContent = shelfBooks;
        }
    exitForm();
    myForm.reset();

})

let previousSelectVal = "";

function displayBooks() {
    myLibrary.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.setAttribute(`data-book`, `${myLibrary.indexOf(this)}`);
        bookDiv.classList.add("book");
        let displayTitle = document.createElement("p");
        let displayAuthor = document.createElement("p");
        let displayPages = document.createElement("p");
        let displayStatus = document.createElement("p");
        let statusSelect = document.createElement("select");
        statusSelect.setAttribute("data-selector", "yes");
        statusSelect.setAttribute("name", "status");
        let optionRead = document.createElement("option");
        let optionWantTo = document.createElement("option");
        let optionShelf = document.createElement("option");
        let removeBook = document.createElement("button");
        removeBook.textContent = "Remove";
        removeBook.classList.add("remove");
        removeBook.addEventListener('click', (e) => {
            let removeAttributeNum = e.target;
            let deletedBook = removeAttributeNum.parentNode.parentNode;
            myLibrary.splice(myLibrary.indexOf(book), 1);
            if (removeAttributeNum.parentNode.firstChild.value === "read") {
                readBooks--;
                statusRead.textContent = readBooks;
            }
            else if (removeAttributeNum.parentNode.firstChild.value === "wantToRead") {
                wishlistBooks--;
                statusWishlist.textContent = wishlistBooks;
            }
            else if (removeAttributeNum.parentNode.firstChild.value === "addToShelf") {
                shelfBooks--;
                statusShelf.textContent = shelfBooks;
            }
            deletedBook.remove();
        })
        optionRead.value = "read";
        optionRead.textContent = "Read";
        optionWantTo.value = "wantToRead";
        optionWantTo.textContent = "Want to read";
        optionShelf.value = "addToShelf";
        optionShelf.textContent = "Add to shelf";
        statusSelect.append(optionRead);
        statusSelect.append(optionWantTo);
        statusSelect.append(optionShelf);
        displayStatus.append(statusSelect);
        displayStatus.append(removeBook);
        displayTitle.textContent = book.getTitle;
        displayAuthor.textContent = book.getAuthor;
        displayPages.textContent = book.getPages;
        if (book.getStatus === 'read') {
            optionRead.setAttribute("selected", "selected");
        }
        else if (book.getStatus === 'wantToRead') {
            optionWantTo.setAttribute("selected", "selected");
        }
        else {
            optionShelf.setAttribute("selected", "selected");
        }
        bookDiv.append(displayTitle);
        bookDiv.append(displayAuthor);
        bookDiv.append(displayPages);
        bookDiv.append(displayStatus);
        allBooksDiv.append(bookDiv);
        statusSelect.addEventListener('focus', e => previousSelectVal = e.target.value);
        statusSelect.addEventListener('change', manageBookStats);
        function manageBookStats(e) {
            if (e.target.value === "read" && previousSelectVal === "wantToRead") {
                readBooks++;
                wishlistBooks--;
                statusRead.textContent = readBooks;
                statusWishlist.textContent = wishlistBooks;
            }
            else if (e.target.value === "wantToRead" && previousSelectVal === "read") {
                readBooks--;
                wishlistBooks++;
                statusRead.textContent = readBooks;
                statusWishlist.textContent = wishlistBooks;
            }
            else if (e.target.value === "addToShelf" && previousSelectVal === "read") {
                readBooks--;
                shelfBooks++;
                statusShelf.textContent = shelfBooks;
                statusRead.textContent = readBooks;
            }
            else if (e.target.value === "read" && previousSelectVal === "addToShelf") {
                readBooks++;
                shelfBooks--;
                statusRead.textContent = readBooks;
                statusShelf.textContent = shelfBooks;
            }
            else if (e.target.value === "wantToRead" && previousSelectVal === "addToShelf") {
                wishlistBooks++;
                shelfBooks--;
                statusWishlist.textContent = wishlistBooks;
                statusShelf.textContent = shelfBooks;
            }
            else if (e.target.value === "addToShelf" && previousSelectVal === "wantToRead") {
                shelfBooks++;
                wishlistBooks--;
                statusShelf.textContent = shelfBooks;
                statusWishlist.textContent = wishlistBooks;
            }
            previousSelectVal = e.target.value;
            book.status = previousSelectVal;
        }
    })
}

let statusRead = document.querySelector("#stat_read");
let statusWishlist = document.querySelector("#stat_wishlist");
let statusShelf = document.querySelector("#stat_shelf");