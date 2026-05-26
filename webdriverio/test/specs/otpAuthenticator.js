/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

import dotenv from 'dotenv';
dotenv.config();

import MailosaurClient from 'mailosaur';

// Instantiate Mailosaur client (reads MAILOSAUR_API_KEY from the environment)
const mailosaur = new MailosaurClient();

describe('One time passcode - Authenticator', () => {
  it.skip('generates a one time passcode', async () => {
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
