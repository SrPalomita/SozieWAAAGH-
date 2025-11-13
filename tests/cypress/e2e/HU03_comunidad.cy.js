// HU03_comunidad.cy.js
describe('HU-03: Comunidad / Foro', () => {

  beforeEach(() => {
    cy.visit('/comunidad.html');
  });

  it('Debe mostrar el título del foro', () => {
    cy.contains('Foros de la Comunidad Orka').should('be.visible');
  });

  it('Debe permitir crear un foro al estar logueado', () => {
    // Simula login localStorage (si Firebase no está conectada)
    window.localStorage.setItem('mockUser', 'Orko_9999');

    cy.get('#foroTitulo').type('Prueba de foro Cypress');
    cy.get('#foroDescripcion').type('Este es un test automatizado');
    cy.contains('Crear foro').click();
  });
});
