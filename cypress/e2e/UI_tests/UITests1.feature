Feature: Transfermate RegisterPage Cucumber Tests
    I want to be able to create an account with unique email

    Scenario: In the Register Page user can fill all fields and create an account and activate it
        When user fill all fields in register page and click Open my account 
        Then user should create an account
        
    Scenario: In the Register Page user can fill all mandatory fields and create an account and activate it
        When user fill all mandatory fields in register page and click Open my account 
        Then user should create an account successfully   

    Scenario: In the Register Page user can't create an account when the email was already used
        When user fill all mandatory fields in register page and use already used email and click Open my account 
        Then user should not create an account      
