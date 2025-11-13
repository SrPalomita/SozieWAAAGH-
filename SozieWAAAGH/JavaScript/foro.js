import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth } from "./auth.js";


// ✅ Crear foro
export async function crearForo() {
  const titulo = document.getElementById("foroTitulo").value.trim();
  const descripcion = document.getElementById("foroDescripcion").value.trim();

  if (!auth.currentUser) return alert("Debes iniciar sesión para crear un foro.");
  if (!titulo || !descripcion) return alert("Completa todos los campos.");

  await addDoc(collection(db, "foros"), {
    titulo,
    descripcion,
    autor: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
    likes: [],
    fecha: serverTimestamp(),
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
  let nuevoArray = likes.includes(uid)
    ? likes.filter((id) => id !== uid)
    : [...likes, uid];

  await updateDoc(docRef, { likes: nuevoArray });
}


// ✅ Crear comentario
async function enviarComentario(foroId) {
  const input = document.getElementById(`comentario-${foroId}`);
  const texto = input.value.trim();

  if (!auth.currentUser) return alert("Debes iniciar sesión para comentar.");
  if (!texto) return;

  await addDoc(collection(db, "foros", foroId, "comentarios"), {
    texto,
    autor: auth.currentUser.displayName,
    fecha: serverTimestamp(),
  });

  input.value = "";
}


// ✅ Mostrar comentarios (en tiempo real)
function mostrarComentarios(foroId) {
  const contenedor = document.getElementById(`comentarios-${foroId}`);

  const q = query(collection(db, "foros", foroId, "comentarios"), orderBy("fecha", "asc"));
  onSnapshot(q, (snapshot) => {
    let html = "";
    snapshot.forEach((doc) => {
      const c = doc.data();
      const fecha = c.fecha?.toDate().toLocaleString() || "Fecha desconocida";
      html += `
        <div class="bg-green-800/70 rounded p-2 mb-2">
          <p class="text-sm"><strong>${c.autor}</strong> <span class="opacity-70 text-xs">(${fecha})</span></p>
          <p>${c.texto}</p>
        </div>`;
    });

    contenedor.innerHTML = html || "<p class='opacity-70 text-sm'>No hay comentarios aún.</p>";
  });
}


// ✅ Generar tarjeta de foro
function generarTarjeta(foro, id) {
  const likes = foro.likes || [];
  const usuarioLogueado = auth.currentUser;

  return `
    <div class="bg-green-900 p-5 rounded-lg shadow-lg mb-6">

      <h3 class="text-2xl font-bold text-yellow-300">${foro.titulo}</h3>
      <p class="text-gray-300 mt-1">${foro.descripcion}</p>

      <p class="text-sm text-green-300 mt-2">
        Creado por: <strong>${foro.autor}</strong>
      </p>

      <div class="flex items-center gap-4 mt-3">
        <button onclick="toggleLike('${id}', ${JSON.stringify(likes)})"
                class="bg-yellow-400 text-black px-3 py-1 rounded-lg shadow hover:bg-yellow-300 transition">
          👍 ${likes.length}
        </button>

        <button onclick="abrirComentarios('${id}')"
                class="bg-green-700 px-3 py-1 rounded-lg hover:bg-green-600 transition">
          💬 Ver comentarios
        </button>
      </div>

      <div id="zona-comentarios-${id}" class="mt-4 hidden">
        <div id="comentarios-${id}" class="space-y-2 mb-3 text-sm"></div>

        ${
          usuarioLogueado
            ? `
          <div class="flex gap-2">
            <input id="comentario-${id}" 
                   placeholder="Escribe un comentario..." 
                   class="flex-1 p-2 rounded text-black">
            <button onclick="enviarComentario('${id}')"
                    class="bg-yellow-400 text-black font-bold px-3 py-1 rounded hover:bg-yellow-300">
              Enviar
            </button>
          </div>`
            : `<p class="text-xs text-red-300 mt-2">Inicia sesión para comentar.</p>`
        }
      </div>
    </div>`;
}


// ✅ Mostrar u ocultar los comentarios
window.abrirComentarios = (foroId) => {
  const zona = document.getElementById(`zona-comentarios-${foroId}`);
  const visible = !zona.classList.contains("hidden");
  document.querySelectorAll("[id^='zona-comentarios-']").forEach(el => el.classList.add("hidden"));
  if (!visible) {
    zona.classList.remove("hidden");
    mostrarComentarios(foroId);
  }
};


// ✅ Cargar foros
export async function cargarForos() {
  const lista = document.getElementById("listaForos");
  lista.innerHTML = "<p class='text-white'>Cargando foros...</p>";

  const snap = await getDocs(collection(db, "foros"));
  let html = "";
  snap.forEach((docSnap) => {
    html += generarTarjeta(docSnap.data(), docSnap.id);
  });

  lista.innerHTML = html || "<p>No hay foros aún.</p>";
}


// ✅ Hacer accesibles las funciones
window.toggleLike = toggleLike;
window.enviarComentario = enviarComentario;
