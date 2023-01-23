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
}
let datanew = {
  email: data.randomFirstName + data.randomLastName + '@qa.team',
  emailName: data.randomFirstName + data.randomLastName,
}

beforeEach (  () => {
  registerPage.openRegisterPage()
});

Scenario: "In the Register Page user can fill all fields and create an account and activate it"
  When("user fill all fields in register page and click Open my account", () => {
    registerPage.selectIndividualAccountType()
    registerPage.checkIfCountryDropdownMenuIsPreSelected(data.country)
    registerPage.fillFirstName(data.randomFirstName)
    registerPage.fillLastName(data.randomLastName)
    registerPage.fillEmail(datanew.email)
    registerPage.checkIfMobileDialingCodeDropdownMenuIsPreSelected(data.phoneCode)
    registerPage.fillPhone(data.randomPhoneNumber)
    registerPage.checkTermsOfUseAgree()
    cy.wait(12000)
    registerPage.clickOpenMyFreeAccountButton()
  });

  Then("user should create an account", () => {
    verificationPage.verifyThatIsCreated()
  });  

Scenario: "In the Register Page user can fill all mandatory fields and create an account and activate it"
  When("user fill all mandatory fields in register page and click Open my account", () => {
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


