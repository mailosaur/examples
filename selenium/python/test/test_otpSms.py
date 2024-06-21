# IMPORTANT: This test uses Mailosaur SMS, which may not
# be enabled on your account yet (see https://mailosaur.com/app/sms)

import os
import unittest

from dotenv import load_dotenv
from mailosaur import MailosaurClient
from mailosaur.models import SearchCriteria

load_dotenv()

class OtpSmsTests(unittest.TestCase):  

  @unittest.skip("reason")
  def test_retrieve_one_time_passcode(self):

    api_key = os.getenv('MAILOSAUR_API_KEY')
    server_id = os.getenv('MAILOSAUR_SERVER_ID')
    
    # Add your mailosaur servers number to this variable
    phone_number = os.getenv('MAILOSAUR_PHONE_NUMBER')

    # Instantiate Mailosaur client with api key
    mailosaur = MailosaurClient(api_key)

    # 1 - Perform an action that sends an otp SMS message to your number
    # https://mailosaur.com/docs/sms-testing
    # ...
    # ...

    # 2 - Create the search criteria for the sms
    # https://mailosaur.com/docs/api/messages#4-search-for-messages
    criteria = SearchCriteria()
    criteria.sent_to = phone_number

    # 3 - Get the sms from Mailosaur using the search criteria
    sms = mailosaur.messages.get(server_id, criteria, timeout=20000) # 20 seconds (in milliseconds)

    # 4 - Retrieve passcode from sms
    # https://mailosaur.com/docs/test-cases/codes
    passcode = sms.text.codes[0]

    print(f'\nSms otp code - {passcode.value}')
