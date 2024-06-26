<p>
<a href="https://mailosaur.com">
<img class="" height="24" width="165" alt="Mailosaur logo" src="https://mailosaur.com/images/logo-color-dark.svg">
</a>
</p>

# Getting Started

Visit [Mailosaur's website](https://mailosaur.com) to learn more about Mailosaur, create your own free trial and get started with email and SMS test automation.

## Documentation

Documentation can be found on [Mailosaur's documentation](https://mailosaur.com/docs).

## Running Tests

You can run all the example tests included in this project using `npm`:

```
npm run test
```

> [!NOTE]  
> Where a test depends on a feature that may not yet be enabled on your account, the test is skipped by default.

# What's Included

This project includes examples for many common test scenarios:

## Reset a password using email - `passwordReset.cy.js`

Shows you how to perform an automated test for a password reset workflow:

```
npx cypress run --spec "cypress/e2e/mailosaur/passwordReset.cy.js"
```

1. Creates a unique, random email address for the test case.

2. Navigates to the [Mailosaur example site](https://example.mailosaur.com/password-reset), which has a mock password reset form.

3. Uses browser automation to submit the a password reset request for the email address.

4. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

5. Asserts that the email received is the expected one.

6. Navigates to the link found in the email.

7. Completes the password reset process by setting a new password.

## Multi-Factor Authentication (MFA) via SMS - `otpSms.cy.js`

> [!NOTE]  
> **Setup Required -** [enable SMS testing](https://mailosaur.com/app/sms), and setup a phone number, within your Mailosaur account.

Shows you how to test two-step verification workflows that use text messages:

```
npx cypress run --spec "cypress/e2e/mailosaur/otpSms.cy.js"
```

**NOTE:** Before you run this test, you must send an SMS message to your Mailosaur phone number. To do this, either:

- Update the test case so that it performs whatever automated steps required to trigger an SMS message to be sent (e.g. attempt to log into your product).

- Or, manually send in an SMS message from your own phone, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for an SMS message to arrive at the given phone number. (🚨 **NOTE:** Your must first set the `PHONE_NUMBER` variable inside the `.env` file to your dedicated Mailosaur phone number.)

2. Grabs the latest one-time password (OTP).

3. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Test email-based Multi-Factor Authentication (MFA) - `otpEmail.cy.js`

Shows you how to perform an automated test for a workflow that sends a one-time password (OTP) via email:

```
npx cypress run --spec "cypress/e2e/mailosaur/otpEmail.cy.js"
```

1. Creates a unique, random email address for the test case.

2. Navigates to the [Mailosaur example site](https://example.mailosaur.com/otp), which has a form that sends an email containing a one-time password (OTP).

3. Uses browser automation to submit this form.

4. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

5. Asserts that the email received is the expected one.

6. Grabs the latest one-time password (OTP).

7. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Test app-based Multi-Factor Authentication (MFA) - `otpAuthenticator.cy.js`

> [!NOTE]  
> **Setup Required -** [enable Mailosaur Authenticator](https://mailosaur.com/app/authenticator) within your Mailosaur account.

Shows you how to test a workflow that uses app-based two-step verification (e.g. Google Authenticator, Auth0, etc.):

```
npx cypress run --spec "cypress/e2e/mailosaur/otpAuthenticator.cy.js"
```

1. Sets the shared secret for the test. This secret is the base32-encoded value used to generate one-time passwords (OTPs). This is typically shown to a user who cannot scan a QR code when setting up MFA/2FA.

2. Uses the Mailosaur API to fetch the current one-time password (OTP) for this shared secret.

3. Logs the OTP value.
