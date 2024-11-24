//// java script///
// script.js

// Sample books data
const books = [
    { title: "The girls in the house", category: "fiction", rating: 4.8, price: 200, image:"https://m.media-amazon.com/images/I/61n7k4KEcnL._SY342_.jpg" },
    { title: "Sudha murtyh thousand stiches", category: "non-fiction", rating: 4.7, price: 20, img:"https://m.media-amazon.com/images/I/812vIYc8luL._SY342_.jpg" },
    { title: "Samsara", category: "sci-fi", rating: 4.6, price: 400, image:"https://m.media-amazon.com/images/I/813P4lxRaLL._SY342_.jpg" },
    { title: "My inventions", category: "Bio-graphy", rating: 5.0, price: 600, imag:"https://m.media-amazon.com/images/I/71pGZBofMGL._SL1000_.jpg" },
    { title: "Wings of fire", category: "Auto biography", rating: 4.9, price: 408 , image:"https://m.media-amazon.com/images/I/71KKZlVjbwL._SY342_.jpg"},
    { title: "The white women", category: "mystery", rating: 4.5, price: 100,image:"https://m.media-amazon.com/images/I/418byl8zkqL.jpg" },
];

// DOM Elements
const bookList = document.getElementById("book-list");
const filterCategory = document.getElementById("filter-category");
const sortOptions = document.getElementById("sort-options");
const noteInput = document.getElementById("note-input");
const addNoteButton = document.getElementById("add-note");
const notesList = document.getElementById("notes-list");

// Display books
function displayBooks(filteredBooks) {
    bookList.innerHTML = "";
    filteredBooks.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        // Use book image if available, else fallback to a default image
        const bookImage = book.image || "https://via.placeholder.com/150";

        bookItem.innerHTML = `
            <img src="${bookImage}" alt="${book.title}" style="width:100px; height:auto; margin-bottom:10px;" />
            <h3>${book.title}</h3>
            <p>Category: ${book.category}</p>
            <p>Rating: ${book.rating}</p>
            <p>Price: $${book.price}</p>
        `;
        bookList.appendChild(bookItem);
    });
}

// Filter and sort books
function filterAndSortBooks() {
    let filteredBooks = [...books];

    const selectedCategory = filterCategory.value;
    const selectedSort = sortOptions.value;

    if (selectedCategory !== "all") {
        filteredBooks = filteredBooks.filter(book => book.category === selectedCategory);
    }

    if (selectedSort === "title") {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "rating") {
        filteredBooks.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "price") {
        filteredBooks.sort((a, b) => a.price - b.price);
    }

    displayBooks(filteredBooks);
}

// Add note to Local Storage
function addNote() {
    const note = noteInput.value.trim();
    if (note) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = "";
        displayNotes();
    }
}

// Display notes from Local Storage
function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = notes.map(note => `<li>${note}</li>`).join("");
}

// Event Listeners
filterCategory.addEventListener("change", filterAndSortBooks);
sortOptions.addEventListener("change", filterAndSortBooks);
addNoteButton.addEventListener("click", addNote);

// Initialize
filterAndSortBooks();
displayNotes();
