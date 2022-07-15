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
let readBooks = 0;
let wishlistBooks = 0;
let shelfBooks = 0;

function exitForm(e){
    popup.classList.toggle("opened");
    popupOverlay.classList.toggle("opened");
    popup.style.zindex = "-200";
    popupOverlay.style.zindex = "-250";
    let books = document.querySelectorAll(`div[data-book]`);
    books.forEach( b => b.remove());
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
bookTitle.required = true;
let bookAuthor = document.querySelector("#author");
bookAuthor.required = true;
let bookPages = document.querySelector("#pages");
bookPages.required = true;
let bookStatus = document.querySelector("#read");
let myForm = document.querySelector("#myForm");

const allBooksDiv = document.querySelector(".books");

submitFormbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let newBook = new Book(bookTitle.value,bookAuthor.value,bookPages.value,bookStatus.value);
    if(bookTitle.value!==""){
    myLibrary.push(newBook);
    } 
    exitForm();
    myForm.reset();

    if(newBook.status==="read"){
        readBooks++;
        statusRead.textContent = readBooks;
    }
    else if(newBook.status==="wantToRead"){
        wishlistBooks++;
        statusWishlist.textContent = wishlistBooks; 
    }
    else{
        shelfBooks++;
        statusShelf.textContent = shelfBooks; 
    }
})

function displayBooks(){
myLibrary.forEach(book =>{
    let bookDiv = document.createElement("div");
    bookDiv.setAttribute(`data-book`,`${myLibrary.indexOf(this)}`);
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
    removeBook.textContent = "Remove";
    removeBook.classList.add("remove");
    removeBook.addEventListener('click',(e)=>{
        let removeAttributeNum = e.target; 
        let deletedBook = removeAttributeNum.parentNode.parentNode; 
        myLibrary.splice(myLibrary.indexOf(book),1);
        if(removeAttributeNum.parentNode.firstChild.value==="read"){
            readBooks--;
            statusRead.textContent = readBooks;
        }
        else if(removeAttributeNum.parentNode.firstChild.value==="wantToRead"){
            wishlistBooks--;
            statusWishlist.textContent = wishlistBooks;
        }
        else if(removeAttributeNum.parentNode.firstChild.value==="addToShelf"){
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
    displayTitle.textContent = book.title;
    displayAuthor.textContent = book.author;
    displayPages.textContent = book.pages;
    if(book.status==='read'){
        optionRead.setAttribute("selected","selected");
    }
    else if(book.status==='wantToRead'){
        optionWantTo.setAttribute("selected","selected");
    }
    else{
        optionShelf.setAttribute("selected","selected");
    }
    bookDiv.append(displayTitle);
    bookDiv.append(displayAuthor);
    bookDiv.append(displayPages);
    bookDiv.append(displayStatus);
    allBooksDiv.append(bookDiv);
})
}

let statusRead = document.querySelector("#stat_read");
let statusWishlist = document.querySelector("#stat_wishlist");
let statusShelf = document.querySelector("#stat_shelf");