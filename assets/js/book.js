import {Db} from './Services/Db';
import {User} from './Entity/User.js';

document.addEventListener("DOMContentLoaded", () => {
    if(!User.validateUserLogged()){
        location.href = 'login.html';
        return;
    }
    const urlSearch = new URLSearchParams(window.location.search);
    if(!urlSearch.has("id")) {
        window.location.href = "../index.html";
        return;
    }
    const id = urlSearch.get('id');
    const db = new Db('book_table');
    const book = db.get(id);
    if(!book) {
        window.location.href = "404.html";
        return;
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