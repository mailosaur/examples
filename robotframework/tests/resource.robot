*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary
Library           script_keywords.py

*** Variables ***
${browser}        headlesschrome
${delay}          0
${base_url}       https://example.mailosaur.com/

*** Keywords ***

### Web ###
Example Page Should Be Open
    Title Should Be    Mailosaur Example Site

Submit Email
    [Arguments]    ${email}
    Input Text    css:input#email    ${email}
    Click Button    css:button[type='submit']

Request Password Reset
    [Arguments]    ${email_address}
    Open Browser    ${base_url}    ${browser}
    Set Selenium Speed    ${delay}
    Example Page Should Be Open
    Go To    ${base_url}password-reset
    Submit Email    ${email_address}

Follow Link And Reset Password
    [Arguments]    ${password_reset_link}    ${new_password}
    Go To    ${password_reset_link}
    Input Text    css:input#password    ${new_password}
    Input Text    css:input#confirmPassword    ${new_password}
    Click Button    css:button[type='submit']
    Element Text Should Be    css:h1    Your new password has been set!

Request Otp Email
    [Arguments]    ${email_address}
    Open Browser    ${base_url}    ${browser}
    Set Selenium Speed    ${delay}
    Example Page Should Be Open
    Go To    ${base_url}otp
    Submit Email    ${email_address}

### Scripts ###
Get Phone Number
    ${result}=    Get Phone Number Script
    RETURN    ${result}

Create Random Email
    ${result}=    Create Random Email Script
    RETURN    ${result}

Create Sent To Search Criteria
    [Arguments]    ${sent_to}
    ${result}=    Create Sent To Search Criteria Script    ${sent_to}
    RETURN    ${result}

Get Message From Mailosaur
    [Arguments]    ${search_criteria}
    ${result}=    Get Message From Mailosaur Script    ${search_criteria}
    RETURN    ${result}

Check Email Subject
    [Arguments]    ${subject}    ${expected_subject}
    Should Be Equal As Strings    ${subject}    ${expected_subject}

Extract Email Link
    [Arguments]    ${email}
    ${result}=    Extract Email Link Script    ${email}
    RETURN    ${result}

Extract Email Code
    [Arguments]    ${email}
    ${result}=    Extract Email Code Script    ${email}
    RETURN    ${result}

Extract Sms Code
    [Arguments]    ${sms}
    ${result}=    Extract Sms Code Script    ${sms}
    RETURN    ${result}

Generate Authenticator Code
    ${result}=    Generate Authenticator Code Script
    RETURN    ${result}