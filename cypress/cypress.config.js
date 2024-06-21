require('dotenv').config();

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    MAILOSAUR_API_KEY: process.env.MAILOSAUR_API_KEY,
    MAILOSAUR_SERVER_ID: process.env.MAILOSAUR_SERVER_ID,
    MAILOSAUR_PHONE_NUMBER: process.env.MAILOSAUR_PHONE_NUMBER,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
});
