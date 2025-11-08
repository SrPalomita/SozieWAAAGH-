import { onUserChanged, logout } from "./auth.js";

const navbar = document.getElementById("navbar-user-area");

// Si la página no tiene navbar, no hacer nada
if (navbar) {
    onUserChanged((user) => {
        if (!user) {
            navbar.innerHTML = `
                <a href="login.html" 
                   class="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg
                          hover:bg-yellow-300 transition shadow-lg">
                    Ingresar
                </a>`;
        } else {
            navbar.innerHTML = `
                <div class="flex items-center gap-3">

                    <span class="font-bold text-yellow-300 text-lg">
                       👋 ${user.displayName}
                    </span>

                    <button id="logoutBtn"
                            class="bg-red-500 hover:bg-red-400 px-3 py-1 rounded-lg font-bold shadow">
                        Salir
                    </button>
                </div>
            `;

            document.getElementById("logoutBtn").onclick = logout;
        }
    });
}
