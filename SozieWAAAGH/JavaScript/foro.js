import { db } from "./firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot } 
    from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

export async function crearForo() {
    const titulo = document.getElementById("foroTitulo").value;
    const descripcion = document.getElementById("foroDescripcion").value;

    if (!titulo || !descripcion) {
        alert("Completa los campos");
        return;
    }

    await addDoc(collection(db, "foros"), {
        titulo,
        descripcion,
        fecha: Date.now()
    });

    document.getElementById("foroTitulo").value = "";
    document.getElementById("foroDescripcion").value = "";
}


export function cargarForos() {
    const contenedor = document.getElementById("listaForos");

    const q = query(collection(db, "foros"), orderBy("fecha", "desc"));

    onSnapshot(q, snapshot => {
        contenedor.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            contenedor.innerHTML += `
                <div class="bg-green-900 p-5 rounded-lg shadow mb-4">
                    <h3 class="text-xl font-bold">${data.titulo}</h3>
                    <p>${data.descripcion}</p>
                </div>
            `;
        });
    });
}
