// cypress/support/commands.js

// Custom commands created by shivani for testing cypress real world application//

// Custom command created for sign up functionality //
Cypress.Commands.add('fillSignUpForm', (firstname, lastname, username, password, confirmPassword) => {
  if (firstname) cy.get('#firstName').type(firstname);
  if (lastname) cy.get('#lastName').type(lastname);
  if (username) cy.get('input[name="username"]').type(username);
  if (password) cy.get('#password').type(password);
  if (confirmPassword) cy.get('input[name="confirmPassword"]').type(confirmPassword);

  // Force click the submit button
  cy.get('button[type="submit"]').click({ force: true });
});

// Custom command created for Login functionality //
Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name="username"]').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command created to initiate transcation functionality //
Cypress.Commands.add('initiateTransaction', (contactName) => {
  cy.get('a[data-test="nav-top-new-transaction"]').should('be.visible').click({ force: true });
  cy.get('input[data-test="user-list-search-input"]').should('be.visible').click({ force: true }).type(contactName).click({ force: true });
  cy.contains(contactName).should('be.visible').click({ force: true });
});

// Custom command created for reuqest payment functionality //
Cypress.Commands.add('requestPayment', (amount, description) => {
  cy.get('input[name="amount"]').should('be.visible').type(amount);
  cy.get('input[name="description"]').should('be.visible').type(description);
  cy.get('button[data-test="transaction-create-submit-request"]').should('be.visible').click({ force: true });
  
});

// Custom command created for make payment functionality //
Cypress.Commands.add('makePayment', (amount, description) => {
  cy.get('input[name="amount"]').should('be.visible').type(amount);
  cy.get('input[name="description"]').should('be.visible').type(description);
  cy.get('button[data-test="transaction-create-submit-payment"]').should('be.visible').click({ force: true });
  //cy.contains(`Paid ${amount} for ${description}`).should('be.visible');
  
});

// Custom command created for addition of new bank account functionality //
Cypress.Commands.add('createBankAccount', (bankName, routingNumber, accountNumber) => {
  cy.contains('Bank Accounts', { timeout: 10000 }).should('be.visible').click({ force: true });
  cy.get('a[data-test="bankaccount-new"]', { timeout: 10000 }).should('be.visible').click({ force: true });
  cy.get('#bankaccount-bankName-input', { timeout: 10000 }).should('be.visible').type(bankName);
  cy.get('input[name="routingNumber"]').type(routingNumber);
  cy.get('input[name="accountNumber"]').type(accountNumber);
  cy.get('button[data-test="bankaccount-submit"]').should('be.visible').click({ force: true });
});

// Custom command created for log out functionality //
Cypress.Commands.add('logout', () => {
  cy.get('div[data-test="sidenav-signout"]').should('be.visible').click({ force: true });
});

  

  
  
 