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
        try {
            const form = document.getElementById('user-info');
            const data = new FormData(form);
            validateUserData(db, data, user);
            data.forEach((value, key) => {
                if(key !== 'password' && key !== 'password2') {
                    user[key]= value;
                } else if(key === 'password' && value.length !== 0) {
                    user.password = hashPassword(value);
                }
            });
            db.update(user.id, user);
        }catch (e) {
            toastr.error(e.message);
        }
    });
});

const validateUserData = (db, data, user) => {
    data.forEach((value, key) => {
    if(value.length === 0 && key !== 'password' && key !== 'password2') {
        throw new Error('El campo ' + key + ' no puede estar vacío');
    } else if(key === "nickname" && user.nickname !== value && db.getBy("nickname", value).length !== 0 ) {
        throw new Error("El nickname ya existe");
    } else if(key === "email" && !checkEmail(value)) {
        throw new Error("El email no es válido");
    } else if(key === 'email' && user.email !== value && db.getBy('email', value).length !== 0){
        throw new Error('El email ya existe');
    } else if(key === 'age' && !checkDate(value)) {
        throw new Error('La edad no puede ser mayor al día de hoy');
    } else if(key === 'password' && value !== data.get('password2')) {
        throw new Error('Las dos contraseñas tienen que ser iguales')
    }
});
}

const checkEmail = (email) => {
    return email.toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
}

const checkDate = (dateString) => {
    const now = Date.now();
    const date = Date.parse(dateString);
    if(now < date) {
        return false;
    }

    return true;
}

const hashPassword = (password) => {
    return sha256(password);
}