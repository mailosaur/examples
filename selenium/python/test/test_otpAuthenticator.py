# IMPORTANT: This test uses Mailosaur Authenticator, which may not
# be enabled on your account yet (see https://mailosaur.com/app/devices)

import os
import unittest

from dotenv import load_dotenv
from mailosaur import MailosaurClient

load_dotenv()

class OtpAuthenticator(unittest.TestCase):  

  @unittest.skip("reason")
  def test_generate_one_time_passcode(self):

    api_key = os.getenv('MAILOSAUR_API_KEY')

    # Instantiate Mailosaur client with api key
    mailosaur = MailosaurClient(api_key)

    # This is a base32-encoded shared secret.
    # Typically this is the value shown to a user if they cannot scan an on-screen QR code.
    # Learn more at https://mailosaur.com/docs/mfa
    shared_secret = "ONSWG4TFOQYTEMY="

    current_otp = mailosaur.devices.otp(shared_secret)

    print(f'\nAuthenticator otp code - {current_otp.code}') # "564214"
