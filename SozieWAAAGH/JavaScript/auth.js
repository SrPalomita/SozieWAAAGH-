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

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

// ✅ Generador de nombre automático
function generarNombreOrko() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return "Orko_" + n;
}

// ✅ Asegurar nombre al usuario
async function asegurarNombre(usuario) {
  if (!usuario) return;

  if (!usuario.displayName || usuario.displayName === "") {
    await updateProfile(usuario, {
      displayName: generarNombreOrko()
    });
  }
}

// ✅ Login con Google
export async function loginWithGoogle() {
  const userCred = await signInWithPopup(auth, provider);
  await asegurarNombre(userCred.user);
  return userCred;
}

// ✅ Login con Email/Password
export async function loginWithEmail(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  await asegurarNombre(userCred.user);
  return userCred;
}

// ✅ Registro
export async function registerUser(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await asegurarNombre(userCred.user);
  return userCred;
}

// ✅ Cerrar sesión
export async function logout() {
  return await signOut(auth);
}

// ✅ Listener
export function onUserChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) await asegurarNombre(user);
    callback(user);
  });
}

// ✅ Recuperar contraseña
export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

