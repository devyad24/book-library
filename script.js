// function Book(title,author,pages,status){
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.status = status
//     this.info = ()=>{
//         return `${title} by ${author}, ${pages} pages, ${status}`;
//     }
// }

// const theHobbit = new Book("The Hobbit","J.R.R Tolkien",295,"not read yet");
// console.log(theHobbit.info());

// function addBookToLibrary(){
    
// }
const addBookBtn = document.querySelector("#book_btn");
const popup = document.querySelector("#popup");
const popupOverlay = document.querySelector("#popup-overlay");
const exitFormbtn = document.querySelector("#exitbtn");

exitFormbtn.addEventListener("click",function(){
    popup.classList.toggle("closed");
    popupOverlay.classList.toggle("closed");
});

addBookBtn.addEventListener("click",function(){
    popup.classList.toggle("closed");
    popupOverlay.classList.toggle("closed");
    popup.style.zIndex = "200";
    popupOverlay.style.zIndex = "150";
});
