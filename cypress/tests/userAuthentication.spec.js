describe('User Authentication Test', () => {
  const baseUrl = 'http://localhost:3000'; 

  // Test Case 1: Sign Up
  describe('Sign Up', () => {
    it('Allow a user to sign up successfully', () => {
      cy.visit(`${baseUrl}/signup`);
      // custom command for sign up is utilized 
      cy.fillSignUpForm('Shivani', 'Vaidya', 'shivani', 'password123', 'password123'); 
    });
    it('Show an error message for invalid username', () => {
      cy.visit(`${baseUrl}/signup`);
      cy.fillSignUpForm('Shivani', 'Vaidya', '12', 'password123', 'password123');
    });
    it('Show an error message for invalid password', () => {
      cy.visit(`${baseUrl}/signup`);
      cy.fillSignUpForm('Shivani', 'Vaidya', 'shivani', '12', '');
    });
    it('Show an error message when passwords do not match', () => {
      cy.visit(`${baseUrl}/signup`);
      cy.fillSignUpForm('Shivani', 'Vaidya', 'shivani', 'password123', 'differentpassword');
    });
    it('Show an error message for weak password', () => {
      cy.visit(`${baseUrl}/signup`);
      cy.fillSignUpForm('Shivani', 'Vaidya', 'shivani', 'shiv', 'shiv');
    });
  });
  // Test Case 2: Log In
  describe('Log In', () => {
    it('Allow a user to log in successfully', () => {
      cy.visit(`${baseUrl}/login`);
      //Custom command for login used 
      cy.login('shivani', 'password123');
    });
    it('Show an error message for valid username but invalid password', () => {
      cy.visit(`${baseUrl}/login`);
      cy.login('shivani', 'wrongpassword');
    });
    it('Show an error message for invalid username but valid password', () => {
      cy.visit(`${baseUrl}/login`);
      cy.login('wrongusername', 'password123');
    });
    it('Show an error message for invalid username and password', () => {
      cy.visit(`${baseUrl}/login`);
      cy.login('wrongusername', 'wrongpassword');
    });
  });
  // Test Case 3: Log Out
describe('Logout Functionality', () => {
  it('Log the user out and redirect to the login page', () => {
    
    cy.visit(`${baseUrl}/login`);
    cy.login('shivani', 'password123');
    
    cy.get('button.MuiButton-containedPrimary').click();

    // To Verify that the user is redirected to the login page
    cy.url().should('include', '/signin');
    // To check if the login form is visible
    cy.get('form').should('be.visible');
  });
});

});
   