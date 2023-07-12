import {Db} from './Services/Db.js';

document.addEventListener("DOMContentLoaded", () => {
    const db = new Db('table_users');
    const btn = document.getElementById('login_btn');
    btn.addEventListener("click", () => {
        const form = document.getElementById('login');
        const data = new FormData(form);
        checkLogin(db, data);
    });
});

const checkLogin = (db, data) => {
    
}