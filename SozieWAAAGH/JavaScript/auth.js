import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

// ✅ Login con Google
export async function loginWithGoogle() {
  return await signInWithPopup(auth, provider);
}

// ✅ Login con Email/Password
export async function loginWithEmail(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// ✅ Registro
export async function registerUser(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// ✅ Cerrar sesión
export async function logout() {
  return await signOut(auth);
}

// ✅ Listener cuando cambia el usuario
export function onUserChanged(callback) {
  return onAuthStateChanged(auth, callback);
}

// ✅ Reset Password (opcional usar más adelante)
export async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}
