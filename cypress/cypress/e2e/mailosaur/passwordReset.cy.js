/// <reference types="cypress" />

describe('Password reset', () => {
  it('performs a password reset', () => {
    const serverId = Cypress.env('MAILOSAUR_SERVER_ID');

    // Random test email address (this uses a catch-all pattern)
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const emailAddress = `${randomString}@${serverId}.mailosaur.net`;

    // 1 - Request password reset
    cy.visit(`https://example.mailosaur.com/password-reset`);
    cy.get('#email').type(emailAddress);
    cy.get('button[type="submit"]').click();

    // 2 - Create the search criteria for the email
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    const searchCriteria = {
      sentTo: emailAddress,
    };

    // 3 - Get the email from Mailosaur using the search criteria
    cy.mailosaurGetMessage(serverId, searchCriteria).then((email) => {
      expect(email.subject).to.equal('Set your new password for ACME Product');

      // 4 - Extract the link from the email
      // https://mailosaur.com/docs/test-cases/links
      const passwordResetLink = email.html.links[0].href;

      // 5 - Navigate to the link and reset your password
      cy.visit(passwordResetLink);
      cy.get('#password').type(randomString);
      cy.get('#confirmPassword').type(randomString);
      cy.get('button[type="submit"]').click();
      cy.get('h1').contains('Your new password has been set!');
    });
  });
});
