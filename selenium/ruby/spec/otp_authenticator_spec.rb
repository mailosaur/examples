# IMPORTANT: This test uses Mailosaur Authenticator, which may not
# be enabled on your account yet (see https://mailosaur.com/app/devices)

# frozen_string_literal: true

require 'mailosaur'

RSpec.describe 'Otp authenticator' do
  before do
    api_key = ENV['MAILOSAUR_API_KEY']

    # Instantiate Mailosaur client with api key
    @mailosaur = Mailosaur::MailosaurClient.new(api_key)
  end

  it 'Generate a one time passcode', skip: true do
    # This is a base32-encoded shared secret.
    # Typically this is the value shown to a user if they cannot scan an on-screen QR code.
    # Learn more at https://mailosaur.com/docs/mfa
    shared_secret = 'ONSWG4TFOQYTEMY='
    current_otp = @mailosaur.devices.otp(shared_secret)

    puts ("\nAuthenticator otp code - #{current_otp.code}") # "564214"
  end
end