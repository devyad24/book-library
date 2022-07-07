function Book(title,author,pages,status){
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = ()=>{
        return `${title} by ${author}, ${pages} pages, ${status}`;
    }
}

function addBookToLibrary(){
    
}

let myLibrary = [];

const addBookBtn = document.querySelector("#book_btn");
const popup = document.querySelector("#popup");
const popupOverlay = document.querySelector("#popup-overlay");
const exitFormbtn = document.querySelector("#exitbtn");

exitFormbtn.addEventListener("click",function(){
    popup.classList.toggle("opened");
    popupOverlay.classList.toggle("opened");
    popup.style.zIndex = "-200";
    popupOverlay.style.zIndex = "-250";
});

addBookBtn.addEventListener("click",function(){
    popup.classList.toggle("opened");
    popupOverlay.classList.toggle("opened");
    popup.style.zIndex = "200";
    popupOverlay.style.zIndex = "150";
});


let submitFormbtn = document.querySelector("#addFormbtn");
let bookTitle = document.querySelector("#title").value;
let form = document.querySelector("#myForm").elements[0];


submitFormbtn.addEventListener("click",()=>{
    console.log(bookTitle);
})