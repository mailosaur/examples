/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

using System;
using Mailosaur;
using Microsoft.Extensions.Configuration;
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
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.Testing.json")
            .Build();

        // Move this to an appropriate secrets manager!
        var apiKey = configuration["Secrets:MailosaurApiKey"];

        // Instantiate Mailosaur client with api key
        var mailosaur = new MailosaurClient(apiKey);

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

