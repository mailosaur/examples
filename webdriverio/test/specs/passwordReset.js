import dotenv from 'dotenv';
dotenv.config();

import MailosaurClient from 'mailosaur';
import { expect, browser, $ } from '@wdio/globals';

// Instantiate Mailosaur client with api key
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

describe('Password reset', () => {
  it('performs a password reset', async () => {
    const serverId = process.env.MAILOSAUR_SERVER_ID;

    // Random test email address (this uses a catch-all pattern)
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const emailAddress = `${randomString}@${serverId}.mailosaur.net`;

    // 1 - Request password reset
    await browser.url(`https://example.mailosaur.com/password-reset`);
    await $('#email').setValue(emailAddress);
    await $('button[type="submit"]').click();

    // 2 - Create the search criteria for the email
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    const searchCriteria = { sentTo: emailAddress };

    // 3 - Get the email from Mailosaur using the search criteria
    const email = await mailosaur.messages.get(serverId, searchCriteria);

    await expect(email.subject).toEqual(
      'Set your new password for ACME Product'
    );

    // 4 - Extract the link from the email
    // https://mailosaur.com/docs/test-cases/links
    const passwordResetLink = email.html.links[0].href;

    // 5 - Navigate to the link and reset your password
    await browser.url(passwordResetLink);
    await $('#password').setValue(randomString);
    await $('#confirmPassword').setValue(randomString);
    await $('button[type="submit"]').click();
    await expect($('h1')).toHaveText('Your new password has been set!');
  });
});
