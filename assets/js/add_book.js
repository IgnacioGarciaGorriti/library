import {Db} from './Services/Db.js';
import {Book} from './Entity/Book.js';

document.addEventListener('DOMContentLoaded', () => {
    const db = new Db('book_table');
    const btn = document.getElementById('add_book');
    const search_input = document.getElementById('search');
    search_input.addEventListener('keyup', () => {
        const data = search(db, search_input.value);
        console.log(data);
        print(db, data);
    });
    btn.addEventListener('click', () => {
        const body = document.body;
        body.appendChild(createModal(db));
    });
    print(db, db.getAll());
});

function print(db, books) {
    const list_container = document.getElementById('list');
    list_container.innerHTML = '';
    for(let book of books) {
        const container = document.createElement('div');
        const title = document.createElement('span');
        const remove = document.createElement('span');
        const edit = document.createElement('span');
        const view = document.createElement('span');
        edit.classList.add('btn-icon', 'btn-icon-edit');
        edit.addEventListener('click', () => {
            const body = document.body;
            body.appendChild(createModal(db, book));
        });
        remove.classList.add('btn-icon', 'btn-icon-remove');
        remove.addEventListener('click', () => {
            db.delete(book.id);
            container.remove();
        });
        view.classList.add('btn-icon', 'btn-icon-view');
        view.addEventListener('click', () => {
            console.log(book.id);
        });
        title.textContent = book.title;
        container.appendChild(title);
        container.appendChild(view);
        container.appendChild(edit);
        container.appendChild(remove);
        container.classList.add('book');
        list_container.appendChild(container);
    }
}

const createModal = (db, book = null) => {
    const modal_bg = document.createElement('div');
    const modal = document.createElement('form');
    const title = document.createElement('input');
    const author = document.createElement('input');
    const category = document.createElement('input');
    const isbn = document.createElement('input');
    const date = document.createElement('input');
    const btn = document.createElement('button');
    title.id = 'title';
    title.type = 'text';
    title.name = 'title';
    title.placeholder = 'Añade un título';
    book ? title.value = book.title : title.value = "";
    author.id = 'author';
    author.type = 'text';
    author.name = 'author';
    author.placeholder = 'Añade un autor';
    book ? author.value = book.author : author.value = "";
    category.id = 'category';
    category.type = 'text';
    category.name = 'category';
    category.placeholder = 'Añade una categoría';
    book ? category.value = book.category : category.value = "";
    isbn.id = 'isbn';
    isbn.type = 'text';
    isbn.name = 'isbn';
    isbn.placeholder = 'Añade un isbn';
    book ? isbn.value = book.isbn : isbn.value = "";
    date.id = 'date';
    date.type = 'date';
    date.name = 'date';
    date.placeholder = 'Añade una fecha';
    book ? date.value = book.date : date.value = "";

    btn.textContent = book ? 'Editar Libro' : 'Añadir libro';
    btn.type = 'button';

    btn.addEventListener('click', () => {
        const form = document.getElementById('add_book_form');
        const data = new FormData(form);
        book ? db.update(book.id, data) : add(db)
        print(db, db.getAll());
        modal_bg.remove();
    });

    modal_bg.addEventListener('click', (e) => {
        if(e.target === modal_bg) {
            modal_bg.remove();
        }
    });

    modal.appendChild(title);
    modal.appendChild(author);
    modal.appendChild(category);
    modal.appendChild(isbn);
    modal.appendChild(date);
    modal.appendChild(btn);
    modal.classList.add('modal');
    modal.id = 'add_book_form';
    modal_bg.appendChild(modal);
    modal_bg.classList.add('modal-bg');
    
    return modal_bg;
}

const add = (db) => {
    const form = document.getElementById('add_book_form');
    const data = new FormData(form);
    const id = db.getLastId();
    const bookData = [];
    for(let value of data.values()) {
        bookData.push(value);
    }
    
    const book = new Book(id, ...bookData);
    db.add(book);
}

const search = (db, value) => {
    return db.getBy('title', value);
}