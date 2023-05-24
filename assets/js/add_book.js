import {Book} from './Entity/Book.js';

document.addEventListener('DOMContentLoaded', () => {
    const books = [];
    const btn = document.getElementById('add_book');
    btn.addEventListener('click', () => {
        /*
        const list_container = document.getElementById('list');
        const title = document.getElementById('title');
        const author = document.getElementById('author');
        const category = document.getElementById('category');
        const isbn = document.getElementById('isbn');
        const date = document.getElementById('date');
        const book = new Book(title.value, author.value, category.value, isbn.value, date.value);
        books.push(book);
        list_container.innerHTML = '';
        print(books);*/
        const body = document.body;
        body.appendChild(createModal());
    });
});

function print(books) {
    const list_container = document.getElementById('list');
    for(let book of books) {
        const container = document.createElement('div');
        const title = document.createElement('span');
        const author = document.createElement('span');
        const category = document.createElement('span');
        const isbn = document.createElement('span');
        const date = document.createElement('span');
        title.textContent = book.title;
        author.textContent = book.author;
        category.textContent = book.category;
        isbn.textContent = book.isbn;
        date.textContent = book.date;
        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(category);
        container.appendChild(isbn);
        container.appendChild(date);
        container.classList.add('book');
        list_container.appendChild(container);
    }
}

const createModal = () => {
    const modal = document.createElement('div');
    const title = document.createElement('input');
    const author = document.createElement('input');
    const category = document.createElement('input');
    const isbn = document.createElement('input');
    const date = document.createElement('input');

    title.id = 'title';
    title.type = 'text';
    title.name = 'title';
    title.placeholder = 'Añade un título';
    author.id = 'author';
    author.type = 'text';
    author.name = 'author';
    author.placeholder = 'Añade un autor';
    category.id = 'category';
    category.type = 'text';
    category.name = 'category';
    category.placeholder = 'Añade una categoría';
    isbn.id = 'isbn';
    isbn.type = 'text';
    isbn.name = 'isbn';
    isbn.placeholder = 'Añade un isbn';
    date.id = 'date';
    date.type = 'date';
    date.name = 'date';
    date.placeholder = 'Añade una fecha';

    modal.appendChild(title);
    modal.appendChild(author);
    modal.appendChild(category);
    modal.appendChild(isbn);
    modal.appendChild(date);
    modal.classList.add('modal');

    return modal;
}