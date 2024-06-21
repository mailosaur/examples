/**
 * IMPORTANT: This test uses Mailosaur SMS, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/sms)
 */

*** Settings ***
Documentation     A test suite with a single test for password reset with Mailosaur.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Otp Sms
    Skip    "Reason"
    # 1 - Perform an action that sends an otp SMS message to your number
    # https://mailosaur.com/docs/sms-testing
    # ...
    # ...
    ${phone_number}    Get Phone Number
    ${search_criteria}    Create Sent To Search Criteria    ${phone_number}
    ${sms}    Get Message From Mailosaur    ${search_criteria}
    ${passcode}    Extract Sms Code    ${sms}
    Log To Console    \n\nSms otp code - ${passcode}\n