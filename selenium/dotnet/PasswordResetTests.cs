using System;
using Xunit;
using Mailosaur;
using Mailosaur.Models;
using Microsoft.Extensions.Configuration;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace mailosaur_example;

public class PasswordResetTests()
{
    [Fact]
    public void PerformPasswordReset()
    {            
        var options = new ChromeOptions();
        options.AddArgument("--headless=new");
        IWebDriver browser = new ChromeDriver(options);

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
        browser.Navigate().GoToUrl("http://example.mailosaur.com/password-reset");
        browser.FindElement(By.CssSelector("input#email")).SendKeys(emailAddress);
        browser.FindElement(By.CssSelector("button[type='submit']")).Click();

        // 2 - Create the search criteria for the email
        // https://mailosaur.com/docs/api/messages#4-search-for-messages
        var searchCriteria = new SearchCriteria() { SentTo = emailAddress };

        // 3 - Get the email from Mailosaur using the search criteria
        var email = mailosaur.Messages.Get(serverId, searchCriteria);

        Assert.Equal("Set your new password for ACME Product", email.Subject);

        // 4 - Extract the link from the email
        // https://mailosaur.com/docs/test-cases/links
        var passwordResetLink = email.Html.Links[0].Href;

        // 5 - Navigate to the link and reset your password
        browser.Navigate().GoToUrl(passwordResetLink);
        browser.FindElement(By.CssSelector("input#password")).SendKeys(randomString);
        browser.FindElement(By.CssSelector("input#confirmPassword")).SendKeys(randomString);
        browser.FindElement(By.CssSelector("button[type='submit']")).Click();
        var h1 = browser.FindElement(By.CssSelector("h1"));
        Assert.Equal("Your new password has been set!", h1.Text);

        browser.Quit();
    }
}
