require('dotenv').config();

const MailosaurClient = require('mailosaur');
const { test, expect } = require('@playwright/test');

// Instantiate Mailosaur client with api key
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);
const serverId = process.env.MAILOSAUR_SERVER_ID;

test.describe('Password reset', () => {
  test('Perform password reset', async ({ page }) => {
    // Random test email address (this uses a catch-all pattern)
    const randomString = (Math.random() + 1).toString(36).substring(7);
    const emailAddress = `${randomString}@${serverId}.mailosaur.net`;

    // 1 - Request password reset
    await page.goto(`https://example.mailosaur.com/password-reset`);
    await page.fill('#email', emailAddress);
    await page.click('button[type="submit"]');

    // 2 - Create the search criteria for the email
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    const searchCriteria = { sentTo: emailAddress };

    // 3 - Get the email from Mailosaur using the search criteria
    const email = await mailosaur.messages.get(serverId, searchCriteria);

    expect(email.subject).toEqual('Set your new password for ACME Product');

    // 4 - Extract the link from the email
    // https://mailosaur.com/docs/test-cases/links
    const passwordResetLink = email.html.links[0].href;

    // 5 - Navigate to the link and reset your password
    await page.goto(passwordResetLink);
    await page.fill('#password', randomString);
    await page.fill('#confirmPassword', randomString);
    await page.click('button[type="submit"]');
    await expect(page.locator('h1')).toHaveText(
      'Your new password has been set!'
    );
  });
});
