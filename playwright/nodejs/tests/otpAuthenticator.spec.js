/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

require('dotenv').config();

const MailosaurClient = require('mailosaur');
const { skip, test } = require('@playwright/test');

// Instantiate Mailosaur client with api key
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

test.describe('One time passcode - Authenticator', () => {
  skip('Generate one time passcode', async () => {
    /**
     * This is a base32-encoded shared secret.
     * Typically this is the value shown to a user if they cannot scan an on-screen QR code.
     * Learn more at https://mailosaur.com/docs/mfa
     */
    const sharedSecret = 'ONSWG4TFOQYTEMY=';

    const currentOtp = await mailosaur.devices.otp(sharedSecret);

    console.log(`\nAuthenticator otp code - ${currentOtp.code}`); // "564214"
  });
});
