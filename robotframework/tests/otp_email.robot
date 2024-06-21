*** Settings ***
Documentation     A test suite with a single test for password reset with Mailosaur.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Otp Email
    ${email_address}    Create Random Email
    Request Otp Email    ${email_address}
    ${search_criteria}    Create Sent To Search Criteria    ${email_address}
    ${email}    Get Message From Mailosaur    ${search_criteria}
    Check Email Subject    ${email.subject}    Here is your access code for ACME Product
    ${passcode}    Extract Email Code    ${email}
    Log To Console    \n\nEmail otp code - ${passcode}\n
    [Teardown]    Close Browser