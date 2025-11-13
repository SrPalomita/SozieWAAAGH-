// HU02_introduccion.cy.js
describe('HU-02: Apartado de introducción', () => {
  it('Debe mostrar texto introductorio y al menos una imagen', () => {
    cy.visit('/index.html');
    cy.contains(/orkos|introducción|waagh/i).should('exist');
    cy.get('img').should('have.length.greaterThan', 0);
  });
});
