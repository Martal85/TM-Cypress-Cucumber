Feature: Transfermate RegisterPage Cucumber Tests
    I want to be able to create an account with unique email

    Scenario: In the Register Page user can fill all fields and create an account
        When user fill all fields in register page and click Open my account 
        Then the account is created

    Scenario: User can see the activation link in his email    
        When user receives an email with activation link
        Then user get the activation link

    Scenario: User can open the activation link and enter password   
        When user opens the activation link and enter his password 
        Then a PIN code is sent to given phone number and popup to end the PIN is open 

    Scenario: User reveives a PIN    
        When user check for the PIN
        Then user gets the PIN

    Scenario: User enters the PIN and setup password in the activation link and activate the account  
        When user enters the PIN and setup password 
        Then the account is activated

    Scenario: In the Register Page user can fill all mandatory fields and create an account
        When user fill all mandatory fields in register page and click Open my account 
        Then user should create an account successfully   

    Scenario: In the Register Page user can't create an account when the email was already used
        When user fill all mandatory fields in register page and use already used email and click Open my account 
        Then user should not create an account      
