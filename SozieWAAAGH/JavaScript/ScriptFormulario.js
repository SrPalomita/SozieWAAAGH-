const myForm = document.getElementById("myForm");
myForm.addEventListener("submit", validarFormulario);

function validarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (nombre.value === "" || email.value === "" || password.value === "") {
        alert("Por favor, complete todos los campos");
        return false;
    }
 
    alert("Formulario enviado correctamente");
    return true;
}