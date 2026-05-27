<p>
<a href="https://mailosaur.com">
<img class="" height="24" width="165" alt="Mailosaur logo" src="https://mailosaur.com/images/logo-color-dark.svg">
</a>
</p>

# Getting Started

Visit [Mailosaur's website](https://mailosaur.com) to learn more about Mailosaur, create your own free trial and get started with email and SMS test automation.

## Documentation

Documentation can be found on [Mailosaur's site](https://mailosaur.com/docs).

We also have specific documentation for [WebdriverIO](https://mailosaur.com/docs/frameworks-and-tools/webdriverio), as well as for [Node.js](https://mailosaur.com/docs/languages/nodejs).

## Setup

Install dependencies:

```
npm install
```

Set the following environment variables before running the tests. You can either `export` them in your shell, or place them in a `.env` file in this directory (the test specs load `.env` automatically via `dotenv`):

- `MAILOSAUR_API_KEY` (required) — Your Mailosaur API key. [Find your API key in the Mailosaur Dashboard](https://mailosaur.com/app/keys).
- `MAILOSAUR_SERVER_ID` (required) — The ID of the Mailosaur inbox (server) to use for the email-based tests.
- `MAILOSAUR_PHONE_NUMBER` (optional) — Only required by `otpSms.js`. Set this to a phone number reserved on your Mailosaur account.

```sh
export MAILOSAUR_API_KEY='your-api-key-here'
export MAILOSAUR_SERVER_ID='your-server-id'
# Only needed for the SMS example:
export MAILOSAUR_PHONE_NUMBER='your-mailosaur-phone-number'
```

## Running Tests

You can run all the example tests included in this project using `npm`:

```
npm run test
```

> [!NOTE]
> Where a test depends on a feature that may not yet be enabled on your account, the test is skipped by default.

# What's Included

This project includes examples for many common test scenarios:

## Reset a password using email - `passwordReset.js`

Shows you how to perform an automated test for a password reset workflow:

```
npx wdio run ./wdio.conf.js --spec test/specs/passwordReset.js
```

1. Creates a unique, random email address for the test case.

2. Navigates to the [Mailosaur example site](https://example.mailosaur.com/password-reset), which has a mock password reset form.

3. Uses browser automation to submit a password reset request for the email address.

4. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

5. Asserts that the email received is the expected one.

6. Navigates to the link found in the email.

7. Completes the password reset process by setting a new password.

## Multi-Factor Authentication (MFA) via SMS - `otpSms.js`

> [!NOTE]  
> **Setup Required -** [enable SMS testing](https://mailosaur.com/app/sms), and setup a phone number, within your Mailosaur account.

Shows you how to test two-step verification workflows that use text messages:

```
npx wdio run ./wdio.conf.js --spec test/specs/otpSms.js
```

**NOTE:** Before you run this test, you must send an SMS message to your Mailosaur phone number. To do this, either:

- Update the test case so that it performs whatever automated steps are required to trigger an SMS message to be sent (e.g. attempt to log into your product).

- Or, manually send in an SMS message from your own phone, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for an SMS message to arrive at the given phone number. (Set the `MAILOSAUR_PHONE_NUMBER` environment variable to your dedicated Mailosaur phone number first — see [Setup](#setup).)

2. Grabs the one-time password (OTP).

3. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Multi-Factor Authentication (MFA) via Email - `otpEmail.js`

Shows you how to perform an automated test for a workflow that sends a one-time password (OTP) via email:

```
npx wdio run ./wdio.conf.js --spec test/specs/otpEmail.js
```

1. Creates a unique, random email address for the test case.

2. Navigates to the [Mailosaur example site](https://example.mailosaur.com/otp), which has a form that sends an email containing a one-time password (OTP).

3. Uses browser automation to submit this form.

4. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

5. Asserts that the email received is the expected one.

6. Grabs the one-time password (OTP).

7. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Multi-Factor Authentication (MFA) via App - `otpAuthenticator.js`

> [!NOTE]  
> **Setup Required -** [enable Mailosaur Authenticator](https://mailosaur.com/app/authenticator) within your Mailosaur account.

Shows you how to test a workflow that uses app-based two-step verification (e.g. Google Authenticator, Auth0, etc.):

```
npx wdio run ./wdio.conf.js --spec test/specs/otpAuthenticator.js
```

1. Sets the shared secret for the test. This secret is the base32-encoded value used to generate one-time passwords (OTPs). This is typically shown to a user who cannot scan a QR code when setting up MFA/2FA.

2. Uses the Mailosaur API to fetch the current one-time password (OTP) for this shared secret.

3. Logs the OTP value.
