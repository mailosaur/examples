<p>
<a href="https://mailosaur.com">
<img class="" height="24" width="165" alt="Mailosaur logo" src="https://mailosaur.com/images/logo-color-dark.svg">
</a>
</p>

# Mailosaur PHP examples

Visit [Mailosaur's website](https://mailosaur.com) to learn more about Mailosaur, create your own free trial and get started with email and SMS test automation.

## Documentation

Documentation can be found on [Mailosaur's site](https://mailosaur.com/docs).

We also have specific documentation for [PHP](https://mailosaur.com/docs/languages/php/).

## Setup

The example tests read configuration from environment variables. Before running them, export the variables your chosen test requires:

```sh
export MAILOSAUR_API_KEY='your-api-key-here'
export MAILOSAUR_SERVER_ID='your-server-id'
# Only required for the SMS test
export MAILOSAUR_PHONE_NUMBER='your-mailosaur-phone-number'
```

You can [find your API key in the Mailosaur Dashboard](https://mailosaur.com/app/keys). Your [inbox (server) ID](https://mailosaur.com/app/servers) is the first part of the inbox's domain (e.g. `abc123` in `abc123.mailosaur.net`). The phone number is only needed for the SMS example — see [Setup a phone number](https://mailosaur.com/app/sms).

Alternatively, you can place the same variables in a `.env` file at the project root. The bootstrap file uses [`vlucas/phpdotenv`](https://github.com/vlucas/phpdotenv) to load them if present:

```env
MAILOSAUR_API_KEY=your-api-key-here
MAILOSAUR_SERVER_ID=your-server-id
MAILOSAUR_PHONE_NUMBER=your-mailosaur-phone-number
```

Install dependencies before running the tests:

```sh
composer install
```

## Running tests

You can run all the example tests included in this project using `composer`:

```sh
composer run test
```

> [!NOTE]
> All tests are skipped by default as configuration is required for them to run. Open each test file and remove the `$this->markTestSkipped('Reason');` line for the scenario you want to execute.

# What's included

This project includes examples for many common test scenarios.

## Reset a password using email — `PasswordResetTests.php`

Shows you how to perform an automated test for a password reset workflow:

```sh
vendor/bin/phpunit --filter PasswordResetTests
```

**NOTE:** Before you run this test, you must configure it. To do this, either:

- Update the test case so that it performs whatever automated steps are required to trigger an email to be sent (e.g. request a password reset).

- Or, manually send in an email to your Mailosaur email address with a password reset link, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

2. Asserts that the email received is the expected one.

3. Logs the password reset link. Once you have this working, you would change this to an assertion or navigate to it.

## Multi-Factor Authentication (MFA) via SMS — `OtpSmsTests.php`

> [!NOTE]
> **Setup Required —** [enable SMS testing](https://mailosaur.com/app/sms) and set up a phone number within your Mailosaur account. Then set `MAILOSAUR_PHONE_NUMBER` (see [Setup](#setup)).

Shows you how to test two-step verification workflows that use text messages:

```sh
vendor/bin/phpunit --filter OtpSmsTests
```

**NOTE:** Before you run this test, you must send an SMS message to your Mailosaur phone number. To do this, either:

- Update the test case so that it performs whatever automated steps are required to trigger an SMS message to be sent (e.g. attempt to log into your product).

- Or, manually send in an SMS message from your own phone, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for an SMS message to arrive at the given phone number.

2. Grabs the one-time password (OTP).

3. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Multi-Factor Authentication (MFA) via Email — `OtpEmailTests.php`

Shows you how to perform an automated test for a workflow that sends a one-time password (OTP) via email:

```sh
vendor/bin/phpunit --filter OtpEmailTests
```

**NOTE:** Before you run this test, you must configure it. To do this, either:

- Update the test case so that it performs whatever automated steps are required to trigger an email to be sent (e.g. attempt to log into your product).

- Or, manually send in an email to your Mailosaur email address with a one-time password, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

2. Asserts that the email received is the expected one.

3. Grabs the one-time password (OTP).

4. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Multi-Factor Authentication (MFA) via App — `OtpAuthenticatorTests.php`

> [!NOTE]
> **Setup Required —** [enable Mailosaur Authenticator](https://mailosaur.com/app/authenticator) within your Mailosaur account.

Shows you how to test a workflow that uses app-based two-step verification (e.g. Google Authenticator, Auth0, etc.):

```sh
vendor/bin/phpunit --filter OtpAuthenticatorTests
```

1. Sets the shared secret for the test. This secret is the base32-encoded value used to generate one-time passwords (OTPs). This is typically shown to a user who cannot scan a QR code when setting up MFA/2FA.

2. Uses the Mailosaur API to fetch the current one-time password (OTP) for this shared secret.

3. Logs the OTP value.
