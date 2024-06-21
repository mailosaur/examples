/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

using System;
using Mailosaur;
using Mailosaur.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace mailosaur_example;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
[Ignore("Reason")]
public class OtpSmsTests : PageTest
{
    [Test]
    public void RetrieveOneTimePasscode()
    {            
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.Testing.json")
            .Build();

        // Move this to an appropriate secrets manager!
        var apiKey = configuration["Secrets:MailosaurApiKey"];
        var serverId = configuration["Secrets:MailosaurServerId"];

        // Add your mailosaur servers number to this variable
        var phoneNumber = configuration["Secrets:MailosaurPhoneNumber"];

        // Instantiate Mailosaur client with api key
        var mailosaur = new MailosaurClient(apiKey);

        // 1 - Perform an action that sends an otp SMS message to your number
        // https://mailosaur.com/docs/sms-testing
        // ...
        // ...

        // 2 - Create the search criteria for the sms
        // https://mailosaur.com/docs/api/messages#4-search-for-messages
        var searchCriteria = new SearchCriteria() { SentTo = phoneNumber };
        var timeout = 20000; // 20 seconds (in milliseconds)

        // 3 - Get the sms from Mailosaur using the search criteria
        var sms = mailosaur.Messages.Get(serverId, searchCriteria, timeout);

        // 4 - Retrieve passcode from sms
        // https://mailosaur.com/docs/test-cases/codes
        var passcode = sms.Text.Codes[0];

        Console.WriteLine($"\nSms otp code - {passcode.Value}"); // "564214"
    }
}

