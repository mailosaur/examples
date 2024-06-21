/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

/// <reference types="cypress" />

describe('One time passcode - SMS', () => {
  it.skip('retrieves one time passcode', () => {
    const serverId = Cypress.env('MAILOSAUR_SERVER_ID');

    // Add your mailosaur servers number to this variable
    const phoneNumber = Cypress.env('MAILOSAUR_PHONE_NUMBER');

    // 1 - Perform an action that sends an SMS message to your number
    // https://mailosaur.com/docs/sms-testing
    // ...
    // ...

    // 2 - Create the search criteria for the sms
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    const searchCriteria = {
      sentTo: phoneNumber,
    };

    const options = {
      timeout: 20000, // 20 seconds (in milliseconds)
    };

    // 3 - Get the sms from Mailosaur using the search criteria
    cy.mailosaurGetMessage(serverId, searchCriteria, options).then((sms) => {
      // 4 - Retrieve passcode from sms
      // https://mailosaur.com/docs/test-cases/codes
      const passcode = sms.text.codes[0];

      cy.log(`\nSms otp code - ${passcode.value}`); // "564214"
    });
  });
});
