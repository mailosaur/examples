/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

/// <reference types="cypress" />

describe('One time passcode - Authenticator', () => {
  it.skip('generates a one time passcode', () => {
    /**
     * This is a base32-encoded shared secret.
     * Typically this is the value shown to a user if they cannot scan an on-screen QR code.
     * Learn more at https://mailosaur.com/docs/mfa
     */
    const sharedSecret = 'ONSWG4TFOQYTEMY=';

    cy.mailosaurGetDeviceOtp(sharedSecret).then((currentOtp) => {
      cy.log(`\nAuthenticator otp code - ${currentOtp.code}`); // "564214"
    });
  });
});
