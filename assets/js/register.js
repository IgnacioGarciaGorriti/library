document.addEventListener("DOMContentLoaded", () => {
    const btn_save = document.getElementById("register-save");
    btn_save.addEventListener("click", () => {
        try {
            const form = document.getElementById("register");
            const data = new FormData(form);
            checkFields(data);
        } catch(e) {
            toastr.error(e.message);
        }
    });
});

const checkFields = (fields) => {
    fields.forEach((field, key) => {
        if(field.length === 0) {
            throw new Error("El campo " + key + " no puede estar vacío");
        }
    });
}