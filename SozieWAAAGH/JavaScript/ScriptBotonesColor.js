

// Obtener referencias a los botones para cambiar el color del fondo
const btnOscuro = document.getElementById("cambiar-color-oscuro");
const btnClaro = document.getElementById("cambiar-color-claro");

// Añadir event listeners
btnOscuro.addEventListener("click", cambiarColorOscuro);
btnClaro.addEventListener("click", cambiarColorClaro);

// Funciones para cambiar el color
function cambiarColorOscuro() {
    document.body.classList.remove("modo-claro");
    document.body.classList.add("modo-oscuro");
}

function cambiarColorClaro() {
    document.body.classList.remove("modo-oscuro");
    document.body.classList.add("modo-claro");
}