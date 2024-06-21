/// <reference types="cypress" />

describe('One time passcode - Email', () => {
  it('retrieves one time passcode', () => {
    const serverId = Cypress.env('MAILOSAUR_SERVER_ID');

    // Random test email address (this uses a catch-all pattern)
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const emailAddress = `${randomString}@${serverId}.mailosaur.net`;

    // 1 - Request a one time passcode
    cy.visit(`https://example.mailosaur.com/otp`);
    cy.get('#email').type(emailAddress);
    cy.get('button[type="submit"]').click();

    // 2 - Create the search criteria for the email
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    const searchCriteria = {
      sentTo: emailAddress,
    };

    // 3 - Get the email from Mailosaur using the search criteria
    cy.mailosaurGetMessage(serverId, searchCriteria).then((email) => {
      expect(email.subject).to.equal(
        'Here is your access code for ACME Product'
      );

      // 4 - Retrieve passcode from email
      // https://mailosaur.com/docs/test-cases/codes
      const passcode = email.html.codes[0];

      cy.log(`\nEmail otp code - ${passcode.value}`); // "564214"
    });
  });
});
