/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

require('dotenv').config();

const MailosaurClient = require('mailosaur');
const { skip, test } = require('@playwright/test');

// Instantiate Mailosaur client with api key
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);
const serverId = process.env.MAILOSAUR_SERVER_ID;

// Add your mailosaur servers number to this variable
const phoneNumber = process.env.MAILOSAUR_PHONE_NUMBER;

test.describe('One time passcode - SMS', () => {
  skip('Retrieve one time passcode', async () => {
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
