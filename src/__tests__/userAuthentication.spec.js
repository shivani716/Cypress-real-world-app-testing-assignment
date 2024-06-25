describe('User Authentication Test', () => {
  const baseUrl = 'http://localhost:3000'; // Replace with your application's base URL

  const fillSignUpForm = (firstname, lastname, username, password, confirmPassword) => {
    cy.get('input[name="firstname"]').type(firstname);
    cy.get('input[name="lastname"]').type(lastname);
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(confirmPassword);
    cy.get('button[type="submit"]').click();
  };

 // beforeEach(() => {
   // cy.task('dbSeed'); // Seed the database before each test
 // });

  // Test Case 1: Sign Up
  describe('Sign Up', () => {
    it('should allow a user to sign up successfully', () => {
      cy.visit(`${baseUrl}/signup`);
      fillSignUpForm('Shivani', 'Vaidya', 'shivani', 'password123', 'password123');
      cy.contains('Logout').should('be.visible');
    });

    it('should show an error message for invalid first name', () => {
      cy.visit(`${baseUrl}/signup`);
      fillSignUpForm('', 'Vaidya', 'shivani', 'password123', 'password123');
      cy.contains('First name is required').should('be.visible');
    });

    it('should show an error message for invalid last name', () => {
      cy.visit(`${baseUrl}/signup`);
      fillSignUpForm('Shivani', '', 'shivani', 'password123', 'password123');
      cy.contains('Last name is required').should('be.visible');
    });

    it('should show an error message for invalid username', () => {
      cy.visit(`${baseUrl}/signup`);
      fillSignUpForm('Shivani', 'Vaidya', '', 'password123', 'password123');
      cy.contains('Username is required').should('be.visible');
    });

    it('should show an error message for invalid password', () => {
      cy.visit(`${baseUrl}/signup`);
      fillSignUpForm('Shivani', 'Vaidya', 'shivani', '', '');
      cy.contains('Password is required').should('be.visible');
    });

    it('should show an error message when passwords do not match', () => {
      cy.visit(`${baseUrl}/signup`);
      fillSignUpForm('Shivani', 'Vaidya', 'shivani', 'password123', 'differentpassword');
      cy.contains('Passwords do not match').should('be.visible');
    });

    it('should show an error message for weak password', () => {
      cy.visit(`${baseUrl}/signup`);
      fillSignUpForm('Shivani', 'Vaidya', 'shivani', 'weak', 'weak');
      cy.contains('Password must be at least 8 characters long').should('be.visible');
    });
  });

  // Test Case 2: Log In
  describe('Log In', () => {
    const login = (username, password) => {
      cy.visit(`${baseUrl}/login`);
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
    };

    it('should allow a user to log in successfully', () => {
      login('shivani', 'password123');
      cy.contains('Logout').should('be.visible');
    });

    it('should show an error message for valid username but invalid password', () => {
      login('shivani', 'wrongpassword');
      cy.contains('Invalid username or password').should('be.visible');
    });

    it('should show an error message for invalid username but valid password', () => {
      login('wrongusername', 'password123');
      cy.contains('Invalid username or password').should('be.visible');
    });

    it('should show an error message for invalid username and password', () => {
      login('wrongusername', 'wrongpassword');
      cy.contains('Invalid username or password').should('be.visible');
    });
  });

  // Test Case 3: Log Out
  describe('Log Out', () => {
    it('should allow a user to log out successfully', () => {
      // Assuming user is logged in
      cy.visit(`${baseUrl}/login`);
      cy.get('input[name="username"]').type('shivani');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Logout').click();
      cy.contains('Log in').should('be.visible');
    });
  });
});
