<?php

namespace MailosaurExample;

use Mailosaur\MailosaurClient;
use Mailosaur\Models\MessageSummary;
use Mailosaur\Models\SearchCriteria;

class PasswordResetTests extends \PHPUnit\Framework\TestCase
{
  /** @var \Mailosaur\MailosaurClient */
  protected static $client;
  
  /** @var string */
  protected static $server;
  
  public static function setUpBeforeClass(): void
  {
    $apiKey = $_ENV['MAILOSAUR_API_KEY'];
    self::$server = $_ENV['MAILOSAUR_SERVER_ID'];

    // Instantiate Mailosaur client with api key
    self::$client = new MailosaurClient($apiKey);
  }

  /** @test */
  public function extractPasswordResetLink(): void
  {
    $this->markTestSkipped('Reason');
       
    // Test email address (this uses a catch-all pattern)
    $emailAddress = 'test-email@' . self::$server . '.mailosaur.net';

    // 1 - Perform an action that sends a password reset email with a link to your email address
    // https://mailosaur.com/docs/email-testing
    // ...
    // ...

    // 2 - Create the search criteria for the email
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    $criteria = new SearchCriteria();
    $criteria->sentTo = $emailAddress;
      
    // 3 - Get the email from Mailosaur using the search criteria
    $email = self::$client->messages->get(self::$server, $criteria);
      
    // 4 - Extract the link from the email
    // https://mailosaur.com/docs/test-cases/links
    $passwordResetLink = $email->html->links[0];
      
    // 5 - Assert link matches sent link
    $expectedPasswordResetLink = 'https://example.mailosaur.com/password-reset';
    $this->assertStringContainsString($expectedPasswordResetLink, $passwordResetLink->href);

    echo(PHP_EOL . PHP_EOL . 'Password reset link - ' . $passwordResetLink->href);
  }
}