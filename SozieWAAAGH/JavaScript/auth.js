import { app } from "./firebase.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ✅ Importar auth asociado a la app correcta
export const auth = getAuth(app);

// ✅ Proveedor de Google (opcional, pero más limpio)
export const provider = new GoogleAuthProvider();

// ======================================================
// ✅ Generar nombre Orko aleatorio
// ======================================================
function generarNombreOrko() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return "Orko_" + n;
}

// ======================================================
// ✅ Asegurar que el usuario tenga nombre
// ======================================================
async function asegurarNombre(usuario) {
  if (!usuario) return;

  if (!usuario.displayName || usuario.displayName.trim() === "") {
    await updateProfile(usuario, {
      displayName: generarNombreOrko()
    });
  }
}

// ======================================================
// ✅ Login con Google
// ======================================================
export async function loginWithGoogle() {
  const userCred = await signInWithPopup(auth, provider);
  await asegurarNombre(userCred.user);
  return userCred;
}

// ======================================================
// ✅ Login con email
// ======================================================
export async function loginWithEmail(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  await asegurarNombre(userCred.user);
  return userCred;
}

// ======================================================
// ✅ Registro
// ======================================================
export async function registerUser(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await asegurarNombre(userCred.user);
  return userCred;
}

// ======================================================
// ✅ Logout
// ======================================================
export async function logout() {
  return await signOut(auth);
}

// ======================================================
// ✅ Listener de usuario logueado
// ======================================================
export function onUserChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) await asegurarNombre(user);
    callback(user);
  });
}

// ======================================================
// ✅ Reset Password
// ======================================================
export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}
