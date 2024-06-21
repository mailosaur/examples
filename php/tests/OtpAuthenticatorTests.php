<?php

/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

namespace MailosaurExample;

use Mailosaur\MailosaurClient;
use Mailosaur\Models\MessageSummary;
use Mailosaur\Models\SearchCriteria;

class OtpAuthenticatorTests extends \PHPUnit\Framework\TestCase
{
  /** @var \Mailosaur\MailosaurClient */
  protected static $client;
  
  public static function setUpBeforeClass(): void
  {
    $apiKey = $_ENV['MAILOSAUR_API_KEY'];
    
    // Instantiate Mailosaur client with api key
    self::$client = new MailosaurClient($apiKey);
  }
  
  /** @test */
  public function generateOneTimePasscode(): void
  {
    $this->markTestSkipped('Reason');

    /**
     * This is a base32-encoded shared secret.
     * Typically this is the value shown to a user if they cannot scan an on-screen QR code.
     * Learn more at https://mailosaur.com/docs/mfa
     */
    $sharedSecret = 'ONSWG4TFOQYTEMY=';
    $currentOtp = self::$client->devices->otp($sharedSecret);

    print(PHP_EOL . PHP_EOL . 'Authenticator otp code - ' . $currentOtp->code); // "564214"
  }
}