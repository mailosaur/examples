using System;
using Xunit;
using Mailosaur;
using Mailosaur.Models;
using Microsoft.Extensions.Configuration;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace mailosaur_example;

public class OtpEmailTests()
{
    [Fact]
    public void RetrieveOneTimePasscode()
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

        // 1 - Request a one time passcode
        browser.Navigate().GoToUrl("http://example.mailosaur.com/otp");
        browser.FindElement(By.CssSelector("input#email")).SendKeys(emailAddress);
        browser.FindElement(By.CssSelector("button[type='submit']")).Click();

        // 2 - Create the search criteria for the email
        var searchCriteria = new SearchCriteria() { SentTo = emailAddress };

        // 3 - Get the email from Mailosaur using the search criteria
        var email = mailosaur.Messages.Get(serverId, searchCriteria);

        Assert.Equal("Here is your access code for ACME Product", email.Subject);

        // 4 - Extract the passcode from the email
        // https://mailosaur.com/docs/test-cases/codes
        var passcode = email.Html.Codes[0];

        Console.WriteLine($"\nEmail otp code - {passcode.Value}"); // "564214"

        browser.Quit();
    }
}
