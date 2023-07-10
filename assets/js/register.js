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
        } else if(key === "email" && db.getBy("email", field).length !== 0 ) {
            throw new Error("El email ya existe");
        }
    });
}