// tests/cypress/cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://srpalomita.github.io/SozieWAAAGH-/SozieWAAAGH/HTML/", // Ajusta si usas otro servidor local
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
