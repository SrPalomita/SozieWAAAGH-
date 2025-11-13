// HU05_idioma.cy.js
describe('HU-05: Disponibilidad en español', () => {

  const paginas = [
    '/index.html',
    '/sociedad.html',
    '/comunidad.html',
    '/contacto.html'
  ];

  paginas.forEach((pagina) => {
    it(`Todo el contenido en español en ${pagina}`, () => {
      cy.visit(pagina);
      cy.contains(/Inicio|Comunidad|Contacto|Sociedad/i).should('exist');
      cy.get('body').should('not.contain.text', 'Login');
      cy.get('body').should('not.contain.text', 'Submit');
    });
  });
});
