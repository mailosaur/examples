using System;
using Mailosaur;
using Mailosaur.Models;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace mailosaur_example;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class OtpEmailTests : PageTest
{
    [Test]
    public async Task RetrieveOneTimePasscodeFromEmail()
    {            
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.Testing.json")
            .Build();

        // Move this to an appropriate secrets manager!
        var apiKey = configuration["Secrets:MailosaurApiKey"];
        var serverId = configuration["Secrets:MailosaurServerId"];

        // Instantiate Mailosaur client with api key
        var mailosaur = new MailosaurClient(apiKey);

        // Random test email address (this uses a catch-all pattern)
        var randomString = Guid.NewGuid().ToString();
        var emailAddress = $"{randomString}@{serverId}.mailosaur.net";

        // 1 - Request a one time passcode
        await Page.GotoAsync("http://example.mailosaur.com");
        await Page.Locator("#totp").ClickAsync();
        await Page.Locator("input#email").FillAsync(emailAddress);
        await Page.Locator("button[type='submit']").ClickAsync();

        // 2 - Create the search criteria for the email
        // https://mailosaur.com/docs/api/messages#4-search-for-messages
        var searchCriteria = new SearchCriteria() { SentTo = emailAddress };

        // 3 - Get the email from Mailosaur using the search criteria
        var email = mailosaur.Messages.Get(serverId, searchCriteria);

        Assert.AreEqual("Here is your access code for ACME Product", email.Subject);

        // 4 - Extract the passcode from the email
        // https://mailosaur.com/docs/test-cases/codes
        var passcode = email.Html.Codes[0];

        Console.WriteLine($"\nEmail otp code - {passcode.Value}"); // "564214"
    }
}
