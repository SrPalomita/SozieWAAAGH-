// HU01_navegacion.cy.js
describe('HU-01 Navegación entre categorías', () => {
  const urlBase = "https://srpalomita.github.io/SozieWAAAGH-/SozieWAAAGH/HTML/";

  const paginas = [
    { texto: "Sociedad", archivo: "sociedad.html" },
    { texto: "Comunidad", archivo: "comunidad.html" },
    { texto: "Contacto", archivo: "contacto.html" }
  ];

  it('Debe navegar a cada categoría y volver al inicio', () => {
    cy.visit(urlBase + "index.html");

    paginas.forEach((pagina) => {

      
      cy.contains('a', pagina.texto).click();

     
      cy.url().should("include", pagina.archivo);

      
      cy.go('back');
    });
  });
});

