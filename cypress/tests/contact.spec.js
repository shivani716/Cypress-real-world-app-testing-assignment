describe('Bank Account Management', () => {
    const baseUrl = 'http://localhost:3000'; 
  
    describe('Bank Account addition', () => {
      it('Navigate to Bank Accounts and add a new account', () => {
        // custom command for login used 
        cy.visit(`${baseUrl}/login`);
        cy.login('Heath93', 's3cret');
  
        // custom command to create a new bank account is used 
        cy.createBankAccount('ABCDE', '123456789', '987654321');
  
        // To check that newly craeted bank account present in the list of bank accounts
        cy.contains('ABCDE').should('exist');
  
        // custom command for log out used
        cy.logout();
  
        // To verify that the user is redirected to the login page 
        cy.url().should('include', '/signin');
  
        // Alternatively, check if the login form is visible
        cy.get('form').should('be.visible');
      });
    });
  });
  