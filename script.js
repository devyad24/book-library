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

submitFormbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let newBook = new Book(bookTitle.value,bookAuthor.value,bookPages.value,bookStatus.value);
    if(newBook.title!=""){
    myLibrary.push(newBook);
    } 
    exitForm();
})


