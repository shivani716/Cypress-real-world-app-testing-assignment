// support/index.js

// Import commands.js using ES2015 syntax:
import './commands';



// Alternatively you can use CommonJS syntax:
// require('./commands')


import 'cypress-mochawesome-reporter/register';

module.exports = (on, config) => {
    require('cypress-mochawesome-reporter/plugin')(on);
  };

  