/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

import dotenv from 'dotenv';
dotenv.config();

import MailosaurClient from 'mailosaur';

// Instantiate Mailosaur client with api key
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

describe('One time passcode - SMS', () => {
  it.skip('retrieves a one time passcode', async () => {
    const serverId = process.env.MAILOSAUR_SERVER_ID;

    // Add your mailosaur servers number to this variable
    const phoneNumber = process.env.MAILOSAUR_PHONE_NUMBER;

    // 1 - Perform an action that sends an otp SMS message to your number
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
    const sms = await mailosaur.messages.get(serverId, searchCriteria, options);

    // 4 - Retrieve passcode from sms
    // https://mailosaur.com/docs/test-cases/codes
    const passcode = sms.text.codes[0];

    console.log(`\nSms otp code - ${passcode.value}`); // "564214"
  });
});
