import {Db} from './Services/Db.js';
import {User} from './Entity/User.js';

document.addEventListener("DOMContentLoaded", () => {
    const btn_save = document.getElementById("register-save");
    const db = new Db('table_users');
    btn_save.addEventListener("click", () => {
        try {
            const form = document.getElementById("register");
            const data = new FormData(form);
            checkFields(db, data);  
            const id = db.getLastId();
            const user = new User(id, ...data.values());
            db.add(user);
            location.href = 'login.html';
        } catch(e) {
            toastr.error(e.message);
        }
    });
});

const checkFields = (db, fields) => {
    fields.forEach((field, key) => {
        if(field.length === 0) {
            throw new Error("El campo " + key + " no puede estar vacío");
        } else if(key === "nickname" && db.getBy("nickname", field).length !== 0 ) {
            throw new Error("El nickname ya existe");
        } else if(key == "email" && !checkEmail(field)) {
            throw new Error("No es un email válido");
        } else if(key === "email" && db.getBy("email", field).length !== 0 ) {
            throw new Error("El email ya existe");
        } else if(key === "password" && field !== fields.get("password2")){
            throw new Error("Las contraseñas no coinciden");
        } else if(key === "age" && !checkDate(field)){
            throw new Error("La fecha no puede ser posterior al día de hoy");
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