// HU04_login.cy.js
describe('HU-04: Login y registro', () => {

  it('Debe mostrar los campos de login', () => {
    cy.visit('/login.html');
    cy.get('#loginEmail').should('be.visible');
    cy.get('#loginPassword').should('be.visible');
  });

  it('Debe alternar entre login y registro', () => {
    cy.contains('Registrarse').click();
    cy.get('#registerForm').should('not.have.class', 'hidden');
    cy.contains('Iniciar Sesión').click();
    cy.get('#loginForm').should('not.have.class', 'hidden');
  });

  it('Debe iniciar sesión y redirigir', () => {
    cy.get('#loginEmail').type('test@example.com');
    cy.get('#loginPassword').type('123456');
    cy.get('#btnLoginEmail').click();
  });
});
