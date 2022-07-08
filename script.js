function Book(title,author,pages,status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = ()=>{
        return `${title} by ${author}, ${pages} pages, ${status}`;
    }
}

let myLibrary = [];

const addBookBtn = document.querySelector("#book_btn");
const popup = document.querySelector("#popup");
const popupOverlay = document.querySelector("#popup-overlay");
const exitFormbtn = document.querySelector("#exitbtn");


function exitForm(e){
    popup.classList.toggle("opened");
    popupOverlay.classList.toggle("opened");
    popup.style.zindex = "-200";
    popupOverlay.style.zindex = "-250";
    displayBooks();
}

exitFormbtn.addEventListener("click",exitForm);

addBookBtn.addEventListener("click",()=>{
    popup.classList.toggle("opened");
    popupOverlay.classList.toggle("opened");
    popup.style.zIndex = "200";
    popupOverlay.style.zIndex = "150";
});


let submitFormbtn = document.querySelector("#addFormbtn");
let bookTitle = document.querySelector("input[name='title']");
let bookAuthor = document.querySelector("#author");
let bookPages = document.querySelector("#pages");
let bookStatus = document.querySelector("#read");
let i = 0;

const allBooksDiv = document.querySelector(".books");

submitFormbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let newBook = new Book(bookTitle.value,bookAuthor.value,bookPages.value,bookStatus.value);
    if(newBook.title!=""){
    myLibrary.push(newBook);
    } 
    exitForm();
    i++;
})


function displayBooks(){
    let bookDiv = document.createElement("div");
    bookDiv.setAttribute(`data-book${i}`,`book${i}`);
    bookDiv.classList.add("book");
    let displayTitle = document.createElement("p");
    let displayAuthor = document.createElement("p");
    let displayPages = document.createElement("p");
    let displayStatus = document.createElement("p");
    let statusCheckBox = document.createElement("input");
    statusCheckBox.setAttribute("type","checkbox");
    displayStatus.append(statusCheckBox);
    displayTitle.textContent = myLibrary[i].title;
    displayAuthor.textContent = myLibrary[i].author;
    displayPages.textContent = myLibrary[i].pages;
    bookDiv.append(displayTitle);
    bookDiv.append(displayAuthor);
    bookDiv.append(displayPages);
    bookDiv.append(displayStatus);
    allBooksDiv.append(bookDiv);
}
