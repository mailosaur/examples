/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

using System;
using Xunit;
using Mailosaur;
using Mailosaur.Models;

namespace mailosaur_example;

public class OtpSmsTests()
{
    [Fact (Skip = "Reason")]
    public void RetrieveOneTimePasscodeFromSms()
    {            
        DotNetEnv.Env.TraversePath().Load();

        var serverId = Environment.GetEnvironmentVariable("MAILOSAUR_SERVER_ID");

        // Add your mailosaur servers number to this variable
        var phoneNumber = Environment.GetEnvironmentVariable("MAILOSAUR_PHONE_NUMBER");

        // Instantiate Mailosaur client (reads MAILOSAUR_API_KEY from environment)
        var mailosaur = new MailosaurClient();

        // 1 - Perform an action that sends an otp SMS message to your number
        // https://mailosaur.com/docs/sms-testing
        // ...
        // ...

        // 2 - Create the search criteria for the sms
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

