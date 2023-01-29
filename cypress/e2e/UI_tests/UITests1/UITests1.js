import {Before, Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from '@faker-js/faker'
import { registerPage } from "../../../support/POM TM/registerPage";
import { verificationPage } from "../../../support/POM TM/verificationPage";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

let data = {
  randomFirstName: faker.name.firstName(),
  randomLastName: faker.name.lastName(),
  randomEmail: faker.internet.email('','','qa.team'),
  randomPhoneNumber: faker.phone.number('#########'),
  country: 'Bulgaria',
  phoneCode: 'Bulgaria +359',
  pinPhone: '7742567753',
  pinPhoneCode: 'gb 44',
}
let datanew = {
  email: data.randomFirstName + data.randomLastName + '@qa.team',
  emailName: data.randomFirstName + data.randomLastName,
}
/*/before ( () => {
  cy.writeFile('cypress/fixtures/data.json', {emailName: datanew.emailName,
  email: datanew.email}
)
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
});/*/
  

Scenario: "In the Register Page user can fill all fields and create an account"
  When("user fill all fields in register page and click Open my account", () => {
    cy.writeFile('cypress/fixtures/data.json', {emailName: datanew.emailName,
      email: datanew.email})
    registerPage.openRegisterPage()
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    cy.fixture('data.json').then(data => {
      registerPage.fillEmail(data.email)
    })
    registerPage.selectMobileDialingCode()
    registerPage.fillPhone(data.pinPhone)
    registerPage.checkTermsOfUseAgree()
    cy.wait(12000)
    registerPage.clickOpenMyFreeAccountButton()
  });

  Then("the account is created", () => {
    verificationPage.verifyThatIsCreated()
  });  

  Scenario: "User can see the activation link in his email"
  When("user receives an email with activation link", () => {
    cy.wait(5000)
    cy.fixture('data.json').then(data => {
      cy.visit('https://qa.team/?locale=en')
      cy.get('input#code.text-right').type(data.emailName)
      cy.get('input#submit_code.btn.btn-primary').click()
    })
  });

  Then("user get the activation link", () => {  
    cy.get('#messages > a:nth-child(1) > div.subject').click()
    cy.get('.message_full').invoke('text').then(text2 => { 
      let textValue2 = text2; 
      cy.log(textValue2 );
      const myArray = textValue2.split("(");
      let https = myArray[1];
      cy.log(https);
      const myArray2 = https.split(")");
      let neurl = myArray2[0];
      let newurl = neurl
      cy.log(newurl);
      cy.writeFile('cypress/fixtures/url.json', {url: newurl})  
    })
  });
  
  Scenario: "User can open the activation link and enter password"
  When("user opens the activation link and enter his password", () => {
    cy.fixture('url.json').then(data => { //enter the email from the fixture file
      cy.visit(data.url)
      })
      cy.get('#password').clear('T');
      cy.get('#password').type('Tester123!');
      cy.get('#confirm_password').clear('T');
      cy.get('#confirm_password').type('Tester123!');
      cy.get('#button_subscribe').click();
      cy.wait(7000)
  }); 

  Then("a PIN code is sent to given phone number and popup to end the PIN is open", () => {
   
  });
  
  Scenario: "User reveives a PIN"
  When("user check for the PIN", () => {
    {Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false})}
    cy.visit('https://anonymsms.com/number/447742567753/')
    cy.get('.table-panel__message > :nth-child(1)').first().should('exist')
  }); 
  Then("user gets the PIN", () => {
    cy.get('.table-panel__message > :nth-child(1)').first().invoke('text').then(pin => { 
      let newpin = pin; 
      cy.log(newpin);
      cy.writeFile('cypress/fixtures/pin.json', {pin: newpin})
     })
  }); 

  Scenario: "User enters the PIN and setup password in the activation link and activate the account "
  When("user enters the PIN and setup password", () => {
    cy.fixture('url.json').then(data => { //enter the email from the fixture file
      cy.visit(data.url)
      })
    cy.get('#password').type('Tester123!');
    cy.get('#confirm_password').type('Tester123!');
    cy.intercept('https://transfermate.io/en/activate_new_account.asp', (req) => { 
      req.redirect('/customers', 301);
    })
    cy.get('#button_subscribe').click();
    
    cy.fixture('pin.json').then(data => { //enter the email from the fixture file
      cy.get('#user_pin').type(data.pin)
      cy.intercept('https://transfermate.io/en/activate_new_account.asp', (req) => { 
      req.continue();
    })
      cy.get('#popup-verify-pin-btn').click()
    })
  }); 

  Then("the account is activated", () => {
    cy.get('.verification_process_message').contains('Welcome to your TransferMate account - to set your account to live you must complete verification.')
  });


Scenario: "In the Register Page user can fill all mandatory fields and create an account"
  When("user fill all mandatory fields in register page and click Open my account", () => {
    registerPage.openRegisterPage()
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(data.randomEmail)
    registerPage.checkIfMobileDialingCodeDropdownMenuIsPreSelected(data.phoneCode)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    cy.wait(12000)
    registerPage.clickOpenMyFreeAccountButton()
  });

  Then("user should create an account successfully", () => {
    verificationPage.verifyThatIsCreated()
  });  

Scenario: "In the Register Page user can fill all mandatory fields and create an account and activate it"
  When("user fill all mandatory fields in register page and use already used email and click Open my account", () => {
    registerPage.openRegisterPage()
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(data.randomEmail)
    registerPage.checkIfMobileDialingCodeDropdownMenuIsPreSelected(data.phoneCode)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    registerPage.checkNewslatterAgree()
    cy.wait(12000)
    registerPage.clickOpenMyFreeAccountButton()
  });

  Then("user should not create an account", () => {
    registerPage.checkAlertForAlreadyExistEmail()
  });  


