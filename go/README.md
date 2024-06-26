<p>
<a href="https://mailosaur.com">
<img class="" height="24" width="165" alt="Mailosaur logo" src="https://mailosaur.com/images/logo-color-dark.svg">
</a>
</p>

# Getting Started

Visit [Mailosaur's website](https://mailosaur.com) to learn more about Mailosaur, create your own free trial and get started with email and SMS test automation.

## Documentation

Documentation can be found on [Mailosaur's documentation](https://mailosaur.com/docs).

We also have specific documentation for [Go](https://mailosaur.com/docs/languages/go).

## Running Tests

You can run all the example tests included in this project using `go`:

```
go test -v
```

> [!NOTE]  
> All tests are skipped by default as configuration is required for them to run.

# What's Included

This project includes examples for many common test scenarios:

## Reset a password using email - `password_reset_test.go`

Shows you how to perform an automated test for a password reset workflow:

```
go test -run TestPasswordReset -v
```

**NOTE:** Before you run this test, you must configure it. To do this, either:

- Update the test case so that it performs whatever automated steps are required to trigger an email to be sent (e.g. request a password reset).

- Or, manually send in an email to your Mailosaur email address with a password reset link, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

2. Asserts that the email received is the expected one.

3. Logs the password reset link. Once you have this working, you would change this to an assertion or navigate to it.

## Multi-Factor Authentication (MFA) via SMS - `otp_sms_test.go`

> [!NOTE]  
> **Setup Required -** [enable SMS testing](https://mailosaur.com/app/sms), and setup a phone number, within your Mailosaur account.

Shows you how to test two-step verification workflows that use text messages:

```
go test -run TestOtpSms -v
```

**NOTE:** Before you run this test, you must send an SMS message to your Mailosaur phone number. To do this, either:

- Update the test case so that it performs whatever automated steps are required to trigger an SMS message to be sent (e.g. attempt to log into your product).

- Or, manually send in an SMS message from your own phone, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for an SMS message to arrive at the given phone number. (🚨 **NOTE:** Your must first set the `MAILOSAUR_PHONE_NUMBER` variable inside the `.env` file to your dedicated Mailosaur phone number.)

2. Grabs the one-time password (OTP).

3. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Multi-Factor Authentication (MFA) via Email - `otp_email_test.go`

Shows you how to perform an automated test for a workflow that sends a one-time password (OTP) via email:

```
go test -run TestOtpEmail -v
```

**NOTE:** Before you run this test, you must configure it. To do this, either:

- Update the test case so that it performs whatever automated steps are required to trigger an email to be sent (e.g. attempt to log into your product).

- Or, manually send in an email to your Mailosaur email address with a one-time password, just to test the process.

When you run the test, it:

1. Uses the Mailosaur API to wait for a new email to arrive at the given email address.

2. Asserts that the email received is the expected one.

3. Grabs the one-time password (OTP).

4. Logs the OTP value. Once you have this working, you would change this to an assertion.

## Multi-Factor Authentication (MFA) via App - `otp_authenticator_test.go`

> [!NOTE]  
> **Setup Required -** [enable Mailosaur Authenticator](https://mailosaur.com/app/authenticator) within your Mailosaur account.

Shows you how to test a workflow that uses app-based two-step verification (e.g. Google Authenticator, Auth0, etc.):

```
go test -run TestOtpAuthenticator -v
```

1. Sets the shared secret for the test. This secret is the base32-encoded value used to generate one-time passwords (OTPs). This is typically shown to a user who cannot scan a QR code when setting up MFA/2FA.

2. Uses the Mailosaur API to fetch the current one-time password (OTP) for this shared secret.

3. Logs the OTP value.
