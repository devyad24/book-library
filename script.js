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
let myForm = document.querySelector("#myForm");
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
    myForm.reset();
})


function displayBooks(){
    let bookDiv = document.createElement("div");
    bookDiv.setAttribute(`data-book`,`${i}`);
    bookDiv.classList.add("book");
    let displayTitle = document.createElement("p");
    let displayAuthor = document.createElement("p");
    let displayPages = document.createElement("p");
    let displayStatus = document.createElement("p");
    let statusSelect = document.createElement("select");
    statusSelect.setAttribute("id","readStatus");
    statusSelect.setAttribute("name","status");
    let optionRead = document.createElement("option");
    let optionWantTo = document.createElement("option");
    let optionShelf = document.createElement("option");
    let removeBook = document.createElement("button");
    removeBook.setAttribute("data-remove",`${i}`);
    removeBook.textContent = "Remove";
    removeBook.classList.add("remove");
    removeBook.addEventListener('click',(e)=>{
        let removeAttributeNum = e.target.getAttribute("data-remove");
        let deletedBook = document.querySelector(`div[data-book = "${removeAttributeNum}"]`);
        deletedBook.remove();
        myLibrary.splice(parseInt(removeAttributeNum),1);
        i--;

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
    displayTitle.textContent = myLibrary[i].title;
    displayAuthor.textContent = myLibrary[i].author;
    displayPages.textContent = myLibrary[i].pages;
    if(myLibrary[i].status==='addToShelf'){
        optionShelf.setAttribute("selected","selected");
    }
    else if(myLibrary[i].status==='wantToRead'){
        optionWantTo.setAttribute("selected","selected");
    }
    else{
        optionRead.setAttribute("selected","selected");
    }
    bookDiv.append(displayTitle);
    bookDiv.append(displayAuthor);
    bookDiv.append(displayPages);
    bookDiv.append(displayStatus);
    allBooksDiv.append(bookDiv);
}
