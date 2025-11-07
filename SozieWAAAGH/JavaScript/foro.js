// ======================
// CREAR NUEVO FORO
// ======================
async function crearForo() {
    const titulo = document.getElementById("foroTitulo").value;
    const descripcion = document.getElementById("foroDescripcion").value;

    if (!titulo || !descripcion) {
        alert("Completa los campos para crear un foro");
        return;
    }

    await db.collection("foros").add({
        titulo: titulo,
        descripcion: descripcion,
        fecha: Date.now()
    });

    document.getElementById("foroTitulo").value = "";
    document.getElementById("foroDescripcion").value = "";
}


// ======================
// CARGAR LISTA DE FOROS
// ======================
function cargarForos() {
    const contenedor = document.getElementById("listaForos");

    db.collection("foros")
        .orderBy("fecha", "desc")
        .onSnapshot((snapshot) => {
            contenedor.innerHTML = ""; // limpiar antes de volver a dibujar

            snapshot.forEach((doc) => {
                const foro = doc.data();
                const id = doc.id;

                contenedor.innerHTML += `
                    <div class="bg-green-900 p-5 rounded-lg shadow mb-4 cursor-pointer hover:bg-green-800 transition"
                         onclick="abrirForo('${id}')">
                        <h3 class="text-xl font-bold text-yellow-300">${foro.titulo}</h3>
                        <p class="text-gray-200">${foro.descripcion}</p>
                    </div>
                `;
            });
        });
}


// ======================
// ABRIR FORO INDIVIDUAL
// ======================
function abrirForo(id) {
    window.location.href = "foro.html?id=" + id;
}
