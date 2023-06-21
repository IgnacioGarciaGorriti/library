import {Db} from './Services/Db';

document.addEventListener("DOMContentLoaded", () => {
    const urlSearch = new URLSearchParams(window.location.search);
    if(!urlSearch.has("id")) {
        window.location.href = "../index.html";
        return;
    }
    const id = urlSearch.get('id');
    const db = new Db('book_table');
    const book = db.get(id);
    if(!book) {
        // TODO: handle error
    }
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const category = document.getElementById('category');
    const isbn = document.getElementById('isbn');
    const date = document.getElementById('date');
    title.value = book.title;
    author.value = book.author;
    category.value = book.category;
    isbn.value = book.isbn;
    date.value = book.date;
});