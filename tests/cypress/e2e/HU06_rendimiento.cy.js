// HU06_rendimiento.cy.js
describe('HU-06: Rapidez y accesibilidad', () => {

  const paginas = [
    '/index.html',
    '/sociedad.html',
    '/comunidad.html',
    '/contacto.html'
  ];

  paginas.forEach((pagina) => {
    it(`Carga rápida y sin errores en ${pagina}`, () => {
      const inicio = Date.now();
      cy.visit(pagina, {
        onBeforeLoad(win) {
          cy.spy(win.console, 'error').as('consoleError');
        },
      }).then(() => {
        const fin = Date.now();
        const duracion = (fin - inicio) / 1000;
        expect(duracion).to.be.lessThan(3);
      });

      cy.get('@consoleError').should('not.have.been.called');
      cy.get('button, a').should('have.length.greaterThan', 2);
    });
  });
});
