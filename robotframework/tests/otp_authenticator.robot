/**
 * IMPORTANT: This test uses Mailosaur Authenticator, which may not
 * be enabled on your account yet (see https://mailosaur.com/app/devices)
 */

*** Settings ***
Documentation     A test suite with a single test for password reset with Mailosaur.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Otp Authenticator
    Skip    "Reason"
    ${passcode}    Generate Authenticator Code
    Log To Console    \n\nAuthenticator otp code - ${passcode}\n