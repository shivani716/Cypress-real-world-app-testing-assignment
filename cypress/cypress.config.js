const { defineConfig } = require('cypress')

module.exports = defineConfig({
       
    baseUrl: 'http://localhost:1234',
    reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,


  },
})