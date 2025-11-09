import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth } from "./auth.js";


// ✅ Crear foro
export async function crearForo() {
    const titulo = document.getElementById("foroTitulo").value.trim();
    const descripcion = document.getElementById("foroDescripcion").value.trim();

    if (!auth.currentUser) {
        alert("Debes iniciar sesión para crear un foro.");
        return;
    }

    if (!titulo || !descripcion) {
        alert("Completa todos los campos.");
        return;
    }

    await addDoc(collection(db, "foros"), {
        titulo,
        descripcion,
        autor: auth.currentUser.displayName,
        likes: [],
        fecha: serverTimestamp()
    });

    document.getElementById("foroTitulo").value = "";
    document.getElementById("foroDescripcion").value = "";

    cargarForos();
}

// ✅ Like único por usuario
async function toggleLike(foroId, likes) {
    const uid = auth.currentUser?.uid;
    if (!uid) return alert("Inicia sesión para dar like.");

    const docRef = doc(db, "foros", foroId);
    let nuevoArray;

    if (likes.includes(uid)) {
        nuevoArray = likes.filter(id => id !== uid);
    } else {
        nuevoArray = [...likes, uid];
    }

    await updateDoc(docRef, { likes: nuevoArray });
    cargarForos();
}


// ✅ Crear tarjeta HTML de foro
function generarTarjeta(foro, id) {
    const likes = foro.likes || [];

    return `
    <div class="bg-green-900 p-5 rounded-lg shadow-lg mb-5">

        <h3 class="text-2xl font-bold text-yellow-300">${foro.titulo}</h3>
        <p class="text-gray-300 mt-1">${foro.descripcion}</p>

        <p class="text-sm text-green-300 mt-2">
            Creado por: <strong>${foro.autor}</strong>
        </p>

        <button onclick="toggleLike('${id}', ${JSON.stringify(likes)})"
                class="mt-3 bg-yellow-400 text-black px-3 py-1 rounded-lg shadow hover:bg-yellow-300 transition">
            👍 ${likes.length}
        </button>

    </div>`;
}


// ✅ Cargar foros
export async function cargarForos() {
    const lista = document.getElementById("listaForos");
    lista.innerHTML = "<p class='text-white'>Cargando foros...</p>";

    const snap = await getDocs(collection(db, "foros"));

    let html = "";
    snap.forEach((doc) => html += generarTarjeta(doc.data(), doc.id));

    lista.innerHTML = html || "<p>No hay foros aún.</p>";
}

// ✅ Hacer disponible para el navegador
window.toggleLike = toggleLike;
