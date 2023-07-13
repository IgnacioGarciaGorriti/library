import {Db} from './Services/Db.js';
import {User} from './Entity/User.js';

document.addEventListener("DOMContentLoaded", () => {
    const db = new Db('table_users');
    const update = document.getElementById('update');
    const user = db.get(parseFloat(localStorage.getItem('library_user')));
    const name = document.getElementById('firstName');
    const surname = document.getElementById('lastName');
    const nickname = document.getElementById('nickname');
    const age = document.getElementById('age');
    const email = document.getElementById('email');
    name.value = user.firstName;
    surname.value = user.lastName;
    nickname.value = user.nickname;
    age.value = user.age;
    email.value = user.email;
    update.addEventListener("click", () => {
        const form = document.getElementById('user-info');
        const data = new FormData(form);
        //TODO Validaciones
        if(data.get('password').length === 0) {
            data.set('password', user.password);
        } else {
            // TODO HashPassword
        }
        const userUpdate = new User(user.id, ...data.values());
        db.update(user.id, userUpdate);
    });
});