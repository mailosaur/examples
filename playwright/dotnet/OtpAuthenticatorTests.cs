/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

using System;
using Mailosaur;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace mailosaur_example;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
[Ignore("Reason")]
public class OtpAuthenticatorTests : PageTest
{
    [Test]
    public void GenerateOneTimePasscode()
    {
        DotNetEnv.Env.TraversePath().Load();

        // Instantiate Mailosaur client (reads MAILOSAUR_API_KEY from environment)
        var mailosaur = new MailosaurClient();

        /**
         * This is a base32-encoded shared secret.
         * Typically this is the value shown to a user if they cannot scan an on-screen QR code.
         * Learn more at https://mailosaur.com/docs/mfa
        */
        var sharedSecret = "ONSWG4TFOQYTEMY=";
        var passcode = mailosaur.Devices.Otp(sharedSecret);

        Console.WriteLine($"\nAuthenticator otp code - {passcode.Code}"); // "564214"
    }
}

