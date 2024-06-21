<?php

/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

namespace MailosaurExample;

use Mailosaur\MailosaurClient;
use Mailosaur\Models\MessageSummary;
use Mailosaur\Models\SearchCriteria;

class OtpSmsTests extends \PHPUnit\Framework\TestCase
{
  
  /** @var \Mailosaur\MailosaurClient */
  protected static $client;
  
  /** @var string */
  protected static $server;

  /** @var string */
  protected static $phoneNumber;
  
  public static function setUpBeforeClass(): void
  {
    $apiKey = $_ENV['MAILOSAUR_API_KEY'];
    self::$server = $_ENV['MAILOSAUR_SERVER_ID'];

    // Add your mailosaur servers number to this variable
    self::$phoneNumber = $_ENV['MAILOSAUR_PHONE_NUMBER'];
    
    // Instantiate Mailosaur client with api key
    self::$client = new MailosaurClient($apiKey);
  }
  
  /** @test */
  public function extractOneTimePasscode(): void
  {
    $this->markTestSkipped('Reason');

    // 1 - Perform an action that sends an otp SMS message to your number
    // https://mailosaur.com/docs/sms-testing
    // ...
    // ...

    // 2 - Create the search criteria for the sms
    // https://mailosaur.com/docs/api/messages#4-search-for-messages
    $criteria = new SearchCriteria();
    $criteria->sentTo = self::$phoneNumber;
    $timeout = 20000; // 20 seconds (in milliseconds)
      
    // 3 - Get the sms from Mailosaur using the search criteria
    $sms = self::$client->messages->get(self::$server, $criteria, $timeout);
      
    // 4 - Retrieve passcode from sms
    // https://mailosaur.com/docs/test-cases/codes
    $passcode = $sms->text->codes[0];

    // 5 - Assert passcode matches sent passcode
    $expectedPasscode = '123456';
    $this->assertStringContainsString($expectedPasscode, $passcode->value);

    echo(PHP_EOL . PHP_EOL . 'Sms otp code - ' . $passcode->value);
  }
}