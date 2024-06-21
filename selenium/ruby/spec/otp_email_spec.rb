# frozen_string_literal: true

require 'mailosaur'
require 'selenium-webdriver'

RSpec.describe 'Otp email' do
  before do
    api_key = ENV['MAILOSAUR_API_KEY']
    @server_id = ENV['MAILOSAUR_SERVER_ID']

    options = Selenium::WebDriver::Options.chrome(args: ['--headless=new'])
    @browser = Selenium::WebDriver.for :chrome, options: options

    # Instantiate Mailosaur client with api key
    @mailosaur = Mailosaur::MailosaurClient.new(api_key)
  end

  it 'Retrieves a one time passcode' do
    # Random test email address (this uses a catch-all pattern)
    random_string = ('a'..'z').to_a.shuffle[0,8].join
    email_address = "#{random_string}@#{@server_id}.mailosaur.net";

    # 1 - Request password reset
    @browser.get('https://example.mailosaur.com/otp')
    @browser.find_element(css: 'input#email').send_keys(email_address)
    @browser.find_element(css: 'button[type="submit"]').click

    # 2 - Create the search criteria for the email
    criteria = Mailosaur::Models::SearchCriteria.new()
    criteria.sent_to = email_address

    # 3 - Get the email from Mailosaur using the search criteria
    # https://mailosaur.com/docs/languages/ruby#2-messagesgetserver-criteria-options
    email = @mailosaur.messages.get(@server_id, criteria)

    # 4 - Extract the passcode from the email
    # https://mailosaur.com/docs/test-cases/codes
    passcode = email.html.codes[0]

    puts ("\nEmail otp code - #{passcode.value}")

    @browser.quit()
  end
end