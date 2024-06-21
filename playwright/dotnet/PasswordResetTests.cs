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
public class PasswordResetTests : PageTest
{
    [Test]
    public async Task PerformPasswordReset()
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

        // 1 - Request password reset
        await Page.GotoAsync("http://example.mailosaur.com");
        await Page.Locator("#forgot-password").ClickAsync();
        await Page.Locator("input#email").FillAsync(emailAddress);
        await Page.Locator("button[type='submit']").ClickAsync();

        // 2 - Create the search criteria for the email
        // https://mailosaur.com/docs/api/messages#4-search-for-messages
        var searchCriteria = new SearchCriteria() { SentTo = emailAddress };

        // 3 - Get the email from Mailosaur using the search criteria
        var email = mailosaur.Messages.Get(serverId, searchCriteria);

        Assert.AreEqual("Set your new password for ACME Product", email.Subject);

        // 4 - Extract the link from the email
        // https://mailosaur.com/docs/test-cases/links
        var passwordResetLink = email.Html.Links[0].Href;

        // 5 - Navigate to the link and reset your password
        await Page.GotoAsync(passwordResetLink);
        await Page.Locator("input#password").FillAsync(randomString);
        await Page.Locator("input#confirmPassword").FillAsync(randomString);
        await Page.Locator("button[type='submit']").ClickAsync();
        var h1 = await Page.Locator("h1").TextContentAsync();
        Assert.AreEqual("Your new password has been set!", h1);
    }
}
