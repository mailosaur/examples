import os
import secrets
import base64
import unittest

from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from mailosaur import MailosaurClient
from mailosaur.models import SearchCriteria

load_dotenv()

class OtpEmailTests(unittest.TestCase):  

  def test_retrieve_one_time_passcode(self):

    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    browser = webdriver.Chrome(options=options)

    api_key = os.getenv('MAILOSAUR_API_KEY')
    server_id = os.getenv('MAILOSAUR_SERVER_ID')

    # Instantiate Mailosaur client with api key
    mailosaur = MailosaurClient(api_key)

    # Random test email address (this uses a catch-all pattern)
    random_string = base64.b32encode(secrets.token_bytes(8)).decode('utf-8')[6:]
    email_address = f'{random_string}@{server_id}.mailosaur.net'

    # 1 - Request a one time passcode
    browser.get('http://example.mailosaur.com/otp')
    browser.find_element(By.CSS_SELECTOR, 'input#email').send_keys(email_address)
    browser.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()

    # 2 - Create the search criteria for the email
    # https://mailosaur.com/docs/api/messages#4-search-for-messages
    criteria = SearchCriteria()
    criteria.sent_to = email_address

    # 3 - Get the email from Mailosaur using the search criteria
    email = mailosaur.messages.get(server_id, criteria)

    self.assertEqual('Here is your access code for ACME Product', email.subject)

    # 4 - Extract the passcode from the email
    # https://mailosaur.com/docs/test-cases/codes
    passcode = email.html.codes[0]

    print(f'\nEmail otp code - {passcode.value}')

