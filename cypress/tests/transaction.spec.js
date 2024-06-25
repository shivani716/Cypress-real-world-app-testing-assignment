describe('User Payment Flow', () => {
    const baseUrl = 'http://localhost:3000'; 
  
    describe('Payment Initiation', () => {
      it('Create a initiate payment ,send a request and should return to transaction', () => {
        cy.visit(`${baseUrl}/login`);
        // Custom commands for login , initiate transaction and request payment used 
        cy.login('Heath93', 's3cret');
        cy.initiateTransaction('shivani');
        cy.requestPayment('100', 'Rent');
        cy.get('a[data-test="new-transaction-return-to-transactions"]').should('be.visible').click({ force: true });
      });

      it('Create a initiate payment ,send a payment and should return to transaction', () => {
        //  Custom commands for login , initiate transaction and make payment used 
        cy.visit(`${baseUrl}/login`);
        cy.login('Heath93', 's3cret');
        cy.initiateTransaction('shivani');
        cy.makePayment('100', 'Rent');
        cy.get('a[data-test="new-transaction-return-to-transactions"]').should('be.visible').click({ force: true });
      });
  
      it('Create a new transaction request', () => {
        cy.visit(`${baseUrl}/login`);
       //  Custom commands for login , initiate transaction and request payment used 
        cy.login('Heath93', 's3cret');
        cy.initiateTransaction('shivani');
        cy.requestPayment('100', 'Rent');
        cy.get('a[data-test="new-transaction-create-another-transaction"]').should('be.visible').click({ force: true });
        cy.logout();
      });

      //   Test case to verify amount is correctly deducted from payer’s balance and history updated correctly 
      //   Use custom commands for login , initiate transaction , make payment 
      //   Return to trasaction after making payment 
      //   Check the balance from Payer's account using custom command , match it with the amount paid using assertions 
      //   Check whether history updated correctly from Payer's side using custom command created for verification of history updation purpose 
      //   Log out 
      
      //  Test case to verify amount is correctly added to recipient’s balance and history updated correctly 
      //  Use custom commands for login , initiate transaction , make payment 
      //  Return to trasaction after making payment 
      //   Check the balance from Recipient's account using custom command , match it with the amount paid using assertions 
      //   Check whether history updated correctly from recipient’s side using custom command created for verification of history updation purpose 
      //   Log out 
      

// Advanced testing using cy.intercept command 
      it('Mock an API response for a transaction and verify handling', () => {
        // Intercept the API request and mock the response
        cy.intercept('POST', '**/api/transactions', {
          statusCode: 201,
          body: {
            id: '12345',
            userId: '1',
            contactName: 'shivani',
            amount: 100,
            description: 'Rent',
            status: 'PENDING'
          }
        }).as('createTransaction');
        // custom commands for initiate transaction and request payment used to trigger transaction
        cy.initiateTransaction('shivani');
        cy.requestPayment('100', 'Rent');
        // Wait is added for the intercepted request
        cy.wait('@createTransaction').its('response.statusCode').should('eq', 201);
        // To verify that the mocked response is handled correctly
        cy.contains('Requested $100.00 for Rent').should('be.visible');
        cy.get('a[data-test="new-transaction-return-to-transactions"]').should('be.visible').click({ force: true });
      });
    });
  });

   

