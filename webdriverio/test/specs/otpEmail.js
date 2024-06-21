import dotenv from 'dotenv';
dotenv.config();

import MailosaurClient from 'mailosaur';
import { expect, browser, $ } from '@wdio/globals';

// Instantiate Mailosaur client with api key
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

describe('One time passcode - Email', () => {
  it('retrieves a one time passcode', async () => {
    const serverId = process.env.MAILOSAUR_SERVER_ID;

    // Random test email address (this uses a catch-all pattern)
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const emailAddress = `${randomString}@${serverId}.mailosaur.net`;

    // 1 - Request a one time passcode
    await browser.url(`https://example.mailosaur.com/otp`);
    await $('#email').setValue(emailAddress);
    await $('button[type="submit"]').click();

    // 2 - Create the search criteria for the email
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    const searchCriteria = { sentTo: emailAddress };

    // 3 - Get the email from Mailosaur using the search criteria
    const email = await mailosaur.messages.get(serverId, searchCriteria);

    await expect(email.subject).toEqual(
      'Here is your access code for ACME Product'
    );

    // 4 - Extract the passcode from the email
    // https://mailosaur.com/docs/test-cases/codes
    const passcode = email.html.codes[0];

    console.log(`\nEmail otp code - ${passcode.value}`); // "564214"
  });
});
