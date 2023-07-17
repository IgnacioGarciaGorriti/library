export class Db {
    constructor(table_name) {
        this.table_name = table_name;
        this.table = JSON.parse(localStorage.getItem(table_name) ?? "[]");
    }

    getAll() {
        return this.table;
    }

    get(id) {
        return this.table.find(element => element.id == id);
    }

    delete(id) {
        this.table.forEach((element, key) => {
            if(element.id === id) {
                this.table.splice(key, 1);
                localStorage.setItem(this.table_name, JSON.stringify(this.table));
            }
        });
    }

    add(entity) {
        this.table.push(entity);
        localStorage.setItem(this.table_name, JSON.stringify(this.table));
    }

    getBy(property, value) {
        return this.table.filter(element => element[property].toLowerCase().includes(value.toLowerCase().trim()));
    }

    update(id, data) {
        const element = this.table.find(element => element.id === id);
        for(let [key, value] of Object.entries(data)){
            element[key] = value;
        }
        localStorage.setItem(this.table_name, JSON.stringify(this.table));
    }

    getLastId() {
        let lastId = 1;
        for(let element of this.table) {
            if(element.id >= lastId) {
                lastId = element.id + 1
            }
        }

        return lastId;
    }
}