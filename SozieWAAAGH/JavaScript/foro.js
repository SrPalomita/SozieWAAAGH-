// ===============================================
// IMPORTS
// ===============================================
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth } from "./auth.js";


// ===============================================
// ✅ CREAR FORO
// ===============================================
export async function crearForo() {
  const titulo = document.getElementById("foroTitulo").value.trim();
  const descripcion = document.getElementById("foroDescripcion").value.trim();

  if (!auth.currentUser) {
    alert("Debes iniciar sesión para crear un foro.");
    return;
  }

  if (titulo === "" || descripcion === "") {
    alert("Por favor completa todos los campos.");
    return;
  }

  await addDoc(collection(db, "foros"), {
    titulo,
    descripcion,
    autor: auth.currentUser.displayName,
    fecha: serverTimestamp(),
    likes: 0,
    likedBy: [], // Para evitar likes repetidos
  });

  alert("✅ Foro creado correctamente.");

  document.getElementById("foroTitulo").value = "";
  document.getElementById("foroDescripcion").value = "";

  cargarForos();
}



// ===============================================
// ✅ CARGAR LISTA DE FOROS (comunidad.html)
// ===============================================
export async function cargarForos() {
  const contenedor = document.getElementById("listaForos");
  contenedor.innerHTML = "<p class='text-center opacity-80'>Cargando foros...</p>";

  const q = query(collection(db, "foros"), orderBy("fecha", "desc"));
  const snapshot = await getDocs(q);

  contenedor.innerHTML = "";

  snapshot.forEach((docu) => {
    const foro = docu.data();
    const id = docu.id;

    contenedor.innerHTML += `
      <div class="bg-green-900 p-5 rounded-xl shadow-xl hover:scale-[1.02] transition cursor-pointer"
           onclick="window.location.href='foro.html?id=${id}'">

        <h3 class="text-2xl font-bold text-yellow-300">${foro.titulo}</h3>
        <p class="text-gray-300 mt-2">${foro.descripcion.substring(0, 120)}...</p>

        <div class="flex justify-between mt-4">
          <span class="opacity-80">Por: <strong>${foro.autor}</strong></span>
          <span class="bg-red-600 px-3 py-1 rounded-lg font-bold text-sm">
            💥 ${foro.likes} WAAAGH!
          </span>
        </div>
      </div>
    `;
  });

  if (snapshot.empty)
    contenedor.innerHTML = "<p class='text-center'>No hay foros aún.</p>";
}



// ===============================================
// ✅ CARGAR FORO INDIVIDUAL (foro.html)
// ===============================================
export async function cargarForoIndividual(foroId) {
  const docRef = doc(db, "foros", foroId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("Foro no encontrado");
    window.location.href = "comunidad.html";
    return;
  }

  const foro = docSnap.data();

  document.getElementById("foroTitulo").textContent = foro.titulo;
  document.getElementById("foroDescripcion").textContent = foro.descripcion;
  document.getElementById("likeCount").textContent = foro.likes;

  cargarComentarios(foroId);
}



// ===============================================
// ✅ ENVIAR COMENTARIO
// ===============================================
export async function enviarComentario(foroId) {
  const textarea = document.getElementById("commentText");
  const texto = textarea.value.trim();

  if (texto === "") return alert("Escribe un comentario.");

  if (!auth.currentUser) {
    alert("Debes iniciar sesión para comentar.");
    return;
  }

  await addDoc(collection(db, "foros", foroId, "comentarios"), {
    texto,
    autor: auth.currentUser.displayName,
    fecha: serverTimestamp(),
  });

  textarea.value = "";
  cargarComentarios(foroId);
}



// ===============================================
// ✅ CARGAR COMENTARIOS
// ===============================================
export async function cargarComentarios(foroId) {
  const lista = document.getElementById("listaComentarios");
  lista.innerHTML = "<p class='opacity-70'>Cargando comentarios...</p>";

  const q = query(
    collection(db, "foros", foroId, "comentarios"),
    orderBy("fecha", "desc")
  );

  const snapshot = await getDocs(q);
  lista.innerHTML = "";

  snapshot.forEach((docu) => {
    const c = docu.data();

    lista.innerHTML += `
      <div class="bg-green-900 p-4 rounded-lg shadow-md">
        <p class="text-gray-300">${c.texto}</p>
        <p class="text-sm text-yellow-300 mt-2">— ${c.autor}</p>
      </div>
    `;
  });

  if (snapshot.empty)
    lista.innerHTML = "<p class='opacity-70'>No hay comentarios aún.</p>";
}



// ===============================================
// ✅ DAR LIKE (1 por usuario)
// ===============================================
export async function darLike(foroId) {
  if (!auth.currentUser) {
    alert("Debes iniciar sesión para dar WAAAGH!");
    return;
  }

  const uid = auth.currentUser.uid;
  const docRef = doc(db, "foros", foroId);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return;

  const foro = snap.data();
  const likedBy = foro.likedBy || [];

  // ✅ Si ya dio like → no permitir
  if (likedBy.includes(uid)) {
    alert("Ya diste tu WAAAGH! a este foro.");
    return;
  }

  likedBy.push(uid);

  await updateDoc(docRef, {
    likes: foro.likes + 1,
    likedBy: likedBy,
  });

  document.getElementById("likeCount").textContent = foro.likes + 1;
}
