import os
import base64
import secrets

from dotenv import load_dotenv
from robot.api.deco import keyword
from mailosaur import MailosaurClient
from mailosaur.models import SearchCriteria
from mailosaur.models import Message

load_dotenv()

class script_keywords:

    def __init__(self):
        api_key = os.getenv('MAILOSAUR_API_KEY')
        server_id = os.getenv('MAILOSAUR_SERVER_ID')
        phone_number = os.getenv('MAILOSAUR_PHONE_NUMBER')

        # Instantiate Mailosaur client with api key
        self.mailosaur = MailosaurClient(api_key)
        
        self.server_id = server_id
        self.phone_number = phone_number

    @keyword
    def get_phone_number_script(self):
        return self.phone_number

    @keyword
    def create_random_email_script(self):    
        # Random test email address (this uses a catch-all pattern)
        random_string = base64.b32encode(secrets.token_bytes(8)).decode('utf-8')[6:]

        email_address = f'{random_string}@{self.server_id}.mailosaur.net'

        return email_address

    @keyword
    def create_sent_to_search_criteria_script(self, sent_to: str):
        # Create the search criteria for the message
        # https://mailosaur.com/docs/api/messages#4-search-for-messages
        criteria = SearchCriteria()
        criteria.sent_to = sent_to

        return criteria

    @keyword
    def get_message_from_mailosaur_script(self, criteria: SearchCriteria):
        # Get the message from Mailosaur using the search criteria
        message = self.mailosaur.messages.get(self.server_id, criteria)

        return message

    @keyword
    def extract_email_link_script(self, email: Message):
        # Extract the first link from the email
        # https://mailosaur.com/docs/test-cases/links
        link = email.html.links[0].href

        return link
    
    @keyword
    def extract_email_code_script(self, email: Message):
        # Extract the first code from the email
        # https://mailosaur.com/docs/test-cases/codes
        code = email.html.codes[0].value

        return code
    
    @keyword
    def extract_sms_code_script(self, sms: Message):
        # Extract the first code from the sms
        # https://mailosaur.com/docs/test-cases/codes
        code = sms.text.codes[0].value

        return code
    
    @keyword
    def generate_authenticator_code_script(self):
        # This is a base32-encoded shared secret.
        # Typically this is the value shown to a user if they cannot scan an on-screen QR code.
        # Learn more at https://mailosaur.com/docs/mfa
        shared_secret = "ONSWG4TFOQYTEMY="

        current_otp = self.mailosaur.devices.otp(shared_secret).code

        return current_otp