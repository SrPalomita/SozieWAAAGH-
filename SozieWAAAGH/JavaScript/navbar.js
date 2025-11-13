// navbar.js (reemplaza tu archivo actual)
import { onUserChanged, logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar-user-area");
  if (!navbar) return;

  // crea DOM base si no existe (por si alguna página no lo tiene)
  function makeGuestHtml() {
    navbar.innerHTML = `
      <a href="login.html"
         class="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition shadow-lg">
        Ingresar
      </a>`;
  }

  // HTML cuando está logueado (con contenedor para dropdown)
  function makeUserHtml(displayName) {
    navbar.innerHTML = `
      <div id="userMenuRoot" class="relative">
        <button id="userMenuBtn"
                class="font-bold text-yellow-300 text-lg hover:text-white flex items-center gap-2">
          👋 ${displayName || "Orko"}
          <svg class="w-4 h-4 transform transition" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div id="userMenuPanel"
             class="absolute right-0 mt-2 w-44 bg-green-900 p-3 rounded-lg shadow-xl hidden">
          <p class="text-sm mb-2 opacity-80">${displayName}</p>
          <button id="logoutBtn" class="w-full text-left font-bold text-red-400 hover:text-red-200">
            Cerrar sesión
          </button>
        </div>
      </div>
    `;
  }

  // Control de apertura/cierre con click y click fuera
  function attachMenuHandlers() {
    const root = document.getElementById("userMenuRoot");
    if (!root) return;

    const btn = document.getElementById("userMenuBtn");
    const panel = document.getElementById("userMenuPanel");
    const logoutBtn = document.getElementById("logoutBtn");

    let open = false;
    // abrir/cerrar con click en el botón
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      open = !open;
      panel.classList.toggle("hidden", !open);
    });

    // garantizar que al mover el mouse dentro no se cierre
    root.addEventListener("mouseenter", () => {
      // no tocar si está cerrada (se abre por click)
    });
    root.addEventListener("mouseleave", () => {
      // opcional: cierra al salir si quieres comportamiento tipo hover
      // open = false; panel.classList.add("hidden");
    });

    // Cerrar al hacer click fuera
    document.addEventListener("click", (ev) => {
      if (!root.contains(ev.target)) {
        open = false;
        panel.classList.add("hidden");
      }
    });

    // logout
    logoutBtn.onclick = async () => {
      try {
        await logout();
        // al cerrar sesión, recarga para que el navbar se actualice
        window.location.reload();
      } catch (e) {
        console.error("Logout error:", e);
      }
    };
  }

  // Observador de usuario (reactivo)
  onUserChanged((user) => {
    if (!user) {
      makeGuestHtml();
      return;
    }
    // si existe usuario, renderiza y atacha handlers
    makeUserHtml(user.displayName || "Orko");
    // usa setTimeout corto para garantizar que el DOM ya exista
    setTimeout(attachMenuHandlers, 10);
  });
});
