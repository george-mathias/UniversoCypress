it('webapp deve estar online', () => {
  
    cy.visit("/")
    
    cy.contains("h1", "Faça seu login")
    
    cy.title()
      .should('eq', 'Samurai Barbershop by QAninja')
  });