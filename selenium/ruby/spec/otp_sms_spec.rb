# IMPORTANT: This test uses Mailosaur SMS, which may not
# be enabled on your account yet (see https://mailosaur.com/app/sms)

# frozen_string_literal: true

require 'mailosaur'

RSpec.describe 'Otp sms' do
  before do
    api_key = ENV['MAILOSAUR_API_KEY']
    @server_id = ENV['MAILOSAUR_SERVER_ID']

    # Add your mailosaur servers number to this variable
    @phone_number = ENV['MAILOSAUR_PHONE_NUMBER']

    # Instantiate Mailosaur client with api key
    @mailosaur = Mailosaur::MailosaurClient.new(api_key)
  end

  it 'Retrieves a one time passcode', skip: true do
    # 1 - Perform an action that sends an otp SMS message to your number
    # https://mailosaur.com/docs/sms-testing
    # ...
    # ...

    # 2 - Create the search criteria for the sms
    criteria = Mailosaur::Models::SearchCriteria.new()
    criteria.sent_to = @phone_number

    # 3 - Get the sms from Mailosaur using the search criteria
    sms = @mailosaur.messages.get(@server_id, criteria, timeout: 20000) # 20 seconds (in milliseconds)

    # 4 - Retrieve passcode from sms
    # https://mailosaur.com/docs/test-cases/codes
    passcode = sms.text.codes[0]

    puts ("\nSms otp code - #{passcode.value}")
  end
end