import {Db} from './Services/Db.js';

document.addEventListener("DOMContentLoaded", () => {
    const db = new Db('table_users');
    const btn = document.getElementById('login_btn');
    btn.addEventListener("click", () => {
        try {
            const form = document.getElementById('login');
            const data = new FormData(form);
            checkLogin(db, data);
            location.href = "../index.html";
        } catch(e) {
            toastr.error(e.message);
        }
    });
});

const checkLogin = (db, data) => {
    const user = db.getBy('email', data.get('email'));
    if(user.length === 0) {
        throw new Error("El email no existe");
    }
    const passwordHashed = sha256(data.get('password'));
    if(passwordHashed !== user[0].password) {
        throw new Error("Error en la contraseña");
    } 
    localStorage.setItem('library_user', user[0].id);
}