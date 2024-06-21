*** Settings ***
Documentation     A test suite with a single test for password reset with Mailosaur.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Password Reset
    ${email_address}    Create Random Email
    Request Password Reset    ${email_address}
    ${search_criteria}    Create Sent To Search Criteria    ${email_address}
    ${email}    Get Message From Mailosaur    ${search_criteria}
    Check Email Subject    ${email.subject}    Set your new password for ACME Product
    ${password_reset_link}    Extract Email Link    ${email}
    Follow Link And Reset Password    ${password_reset_link}    newpassword123
    [Teardown]    Close Browser