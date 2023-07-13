import {Db} from '../Services/Db.js';

export class User {
    constructor(id, firstName, lastName, nickname, age, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.age = age;
        this.email = email;
        this.password = password;
    }

    static validateUserLogged(){
        const db = new Db('table_users');
        const userId = localStorage.getItem('library_user');
        if(!userId || isNaN(parseInt(userId))){
            return false;
        }
        const user = db.get(userId);
        if(!user) {
            return false
        }

        return true;
    }      
}