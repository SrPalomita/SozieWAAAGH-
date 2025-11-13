import { onUserChanged, logout } from "./auth.js";

/* Esperar a que cargue el DOM COMPLETO */
document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar-user-area");

    // Si la navbar no existe en la página, cancelar
    if (!navbar) return;

    // Detectar cambios de usuario
    onUserChanged((user) => {

        // Usuario NO logueado
        if (!user) {
            navbar.innerHTML = `
                <a href="login.html"
                   class="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg
                          hover:bg-yellow-300 transition shadow-lg">
                    Ingresar
                </a>`;
            return;
        }

        // Usuario logueado ✅
        navbar.innerHTML = `
            <div class="relative group">
                <button class="font-bold text-yellow-300 text-lg hover:text-white flex items-center gap-2">
                    👋 ${user.displayName || "Orko"}
                    <svg class="w-4 h-4 transform group-hover:rotate-180 transition" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
        
                <div class="absolute right-0 mt-2 w-40 bg-green-900 p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200">
                    <p class="text-sm mb-2 opacity-80">${user.displayName}</p>
                    <button id="logoutBtn"
                        class="w-full text-left font-bold text-red-400 hover:text-red-200">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        `;


        /* Activar botón logout */
        setTimeout(() => {
            const btn = document.getElementById("logoutBtn");
            if (btn) btn.onclick = async () => {
                await logout();
                window.location.reload();
            };
        }, 50);

    });
});
