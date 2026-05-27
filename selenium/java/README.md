<p>
<a href="https://mailosaur.com">
<img class="" height="24" width="165" alt="Mailosaur logo" src="https://mailosaur.com/images/logo-color-dark.svg">
</a>
</p>

# Getting Started

Visit [Mailosaur's website](https://mailosaur.com) to learn more about Mailosaur, create your own free trial and get started with email and SMS test automation.

## Documentation

Documentation can be found on [Mailosaur's site](https://mailosaur.com/docs).

We also have specific documentation for [Selenium](https://mailosaur.com/docs/frameworks-and-tools/selenium).

As well as documentation for [Java](https://mailosaur.com/docs/languages/java).

## Setup

Before running the tests, export the following environment variables:

```sh
export MAILOSAUR_API_KEY='your-api-key-here'
export MAILOSAUR_SERVER_ID='your-server-id'
```

If you plan to run the SMS test (`OtpSmsTest`), also export:

```sh
export MAILOSAUR_PHONE_NUMBER='your-mailosaur-phone-number'
```

Alternatively, create a `.env` file in the project root with the same keys — the tests load it via [dotenv-java](https://github.com/cdimascio/dotenv-java):

```
MAILOSAUR_API_KEY=your-api-key-here
MAILOSAUR_SERVER_ID=your-server-id
MAILOSAUR_PHONE_NUMBER=
```

You can [find your API key in the Mailosaur Dashboard](https://mailosaur.com/app/keys). Your [inbox (server) ID](https://mailosaur.com/app/servers) is the first part of the inbox's domain (e.g. `abc123` in `abc123.mailosaur.net`).

## Running Tests

You can run all the example tests included in this project using `mvn`:

```
mvn clean test
```

> [!NOTE]  
> Where a test depends on a feature that may not yet be enabled on your account, the test is skipped by default.

# What's Included

This project includes examples for many common test scenarios:

## Reset a password using email - `PasswordResetTest.java`

Shows you how to perform an automated test for a password reset workflow:

```
mvn test -Dtest=PasswordResetTest
```

1. Creates a unique, random email address for the test case.

2. Navigates to the [Mailosaur example site](https://example.mailosaur.com/password-reset), which has a mock password reset form.

3. Uses browser automation to submit a password reset request for the email address.

4. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

5. Asserts that the email received is the expected one.

6. Navigates to the link found in the email.

7. Completes the password reset process by setting a new password.

## Multi-Factor Authentication (MFA) via SMS - `OtpSmsTest.java`

> [!NOTE]  
> **Setup Required -** [enable SMS testing](https://mailosaur.com/app/sms), and setup a phone number, within your Mailosaur account.

Shows you how to test two-step verification workflows that use text messages:

```
mvn test -Dtest=OtpSmsTest
```

**NOTE:** Before you run this test, you must send an SMS message to your Mailosaur phone number. To do this, either:

- Update the test case so that it performs whatever automated steps are required to trigger an SMS message to be sent (e.g. attempt to log into your product).

- Or, manually send in an SMS message from your own phone, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for an SMS message to arrive at the given phone number. (🚨 **NOTE:** You must first export the `MAILOSAUR_PHONE_NUMBER` environment variable, set to your dedicated Mailosaur phone number.)

2. Grabs the one-time password (OTP).

3. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Multi-Factor Authentication (MFA) via Email - `OtpEmailTest.java`

Shows you how to perform an automated test for a workflow that sends a one-time password (OTP) via email:

```
mvn test -Dtest=OtpEmailTest
```

1. Creates a unique, random email address for the test case.

2. Navigates to the [Mailosaur example site](https://example.mailosaur.com/otp), which has a form that sends an email containing a one-time password (OTP).

3. Uses browser automation to submit this form.

4. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

5. Asserts that the email received is the expected one.

6. Grabs the one-time password (OTP).

7. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Multi-Factor Authentication (MFA) via App - `OtpAuthenticatorTest.java`

> [!NOTE]  
> **Setup Required -** [enable Mailosaur Authenticator](https://mailosaur.com/app/authenticator) within your Mailosaur account.

Shows you how to test a workflow that uses app-based two-step verification (e.g. Google Authenticator, Auth0, etc.):

```
mvn test -Dtest=OtpAuthenticatorTest
```

1. Sets the shared secret for the test. This secret is the base32-encoded value used to generate one-time passwords (OTPs). This is typically shown to a user who cannot scan a QR code when setting up MFA/2FA.

2. Uses the Mailosaur API to fetch the current one-time password (OTP) for this shared secret.

3. Logs the OTP value.
