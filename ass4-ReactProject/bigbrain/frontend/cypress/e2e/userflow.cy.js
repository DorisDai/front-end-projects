describe('user happy path', () => {
  it('should navigate to login screen successfully', () => {
    cy.visit('http://localhost:3000/')
    cy.url().should('include', 'localhost:3000')
  })

  it('should navigate to register screen successfully', () => {
    cy.get('[data-cy="registerLink"]')
      .click();
    cy.url().should('include', '/register')
  })

  it('should register succefully', ()=>{
    cy.get('input[name="userName"]')
      .focus()
      .type('aaa');
    cy.get('input[name="userEmail"]')
      .focus()
      .type('myemail@email.com');
    cy.get('input[name="userPassword"]')
      .focus()
      .type('aaa');

    cy.get('button[name="registerSubmitButton"]')
      .click();
    
    cy.url().should('include', 'http://localhost:3000/dashboard')
  })

  it('should create new game successfully', ()=>{
    cy.get('button[name="newGameButton"]')
      .click();
    cy.get('input[name="enterGameNameField"]')
      .focus()
      .type('new game');
    
  })

  it('should starts a game successfully', ()=>{
    cy.get('a[key="start"]')
      .click();
  })

  it('should stops a game successfully', ()=>{
    cy.get('a[key="Stop"]')
    .click();
  })

  it('should loads tge result page successfully', ()=>{
    cy.url().should('include', 'http://localhost:3000/result')
  })

  it('should logs out of the application successfully', ()=>{
    cy.get('button[name="logOutButton"]')
      .click();
      cy.url().should('include', 'http://localhost:3000')
  })
  
  it('should logs back of the application successfully', ()=>{
    cy.get('input[name="loginEmail"]')
      .focus()
      .type('myemail@email.com');
    cy.get('input[name="loginPassword"]')
      .focus()
      .type('aaa');
    cy.url().should('include', 'http://localhost:3000/dashboard')
    
  })
})