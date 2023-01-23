export class RegisterPage {
  
    constructor() {
      this.accountTypeIndividual = '#register_account_type_individual_form_input > .check-radio-label';
      this.countryDropdownMenu = '#country';
      this.firstNameField = '#first_name';
      this.lastNameField = '#last_name';
      this.emailField = '#email';
      this.mobileDialingCodeDropdownMenu = '#__pin_mobile_number_international_dialing_code';
      this.mobilePhoneField = '#__pin_mobile_number_mobile_phone';
      this.termsOfUseAgreeField = '#register_terms_of_use_agree_form_input';
      this.newslatterAgreeField = '#register_newsletter_and_privacy_policy_agree_form_input';
      this.openMyFreeAccountButton = '#button_subscribe';
      this.alertForAlreadyExistEmail = '#register_email_error';
      this.alertWihtErrorMessageForAlreadyExistEmail = '#register_db_action_error';
      this.alertForAlreadyExistEmailText = "Already exists!";
      this.alertWihtErrorMessageForAlreadyExistEmailText = "Operation is not successful! Please try again."
    }
    
    const 

    openRegisterPage() {  
      cy.visit("/")
      cy.url().should('eq', "https://transfermate.io/en/register.asp?/")    
    }

    selectIndividualAccountType() {
      cy.get(this.accountTypeIndividual).click({force:true})
    }

    checkIfCountryDropdownMenuIsPreSelected(value) {
     cy.get(this.countryDropdownMenu).contains(value)
    }

    fillFirstName(value) {
      cy.get(this.firstNameField).click({force:true}).clear().type(value)
    }

    fillLastName(value) {
      cy.get(this.lastNameField).click({force:true}).clear().type(value)
    }

    fillEmail(value) {
      cy.get(this.emailField).click({force:true}).clear().type(value)
    }

    checkIfMobileDialingCodeDropdownMenuIsPreSelected(value) {
      cy.get(this.mobileDialingCodeDropdownMenu).contains(value)
    }
    
    fillPhone(value) {
      cy.get(this.mobilePhoneField).click({force:true}).clear().type(value)
    }

    checkTermsOfUseAgree(){
      cy.get(this.termsOfUseAgreeField).click();
    }

    checkNewslatterAgree(){
      cy.get(this.newslatterAgreeField).click();
    }

    clickOpenMyFreeAccountButton(){
      cy.get(this.openMyFreeAccountButton).click();
    }

    checkAlertForAlreadyExistEmail() {
      cy.get(this.alertForAlreadyExistEmail).contains(this.alertForAlreadyExistEmailText).should('be.visible')
    }

    checkAlertWihtErrorMessageForAlreadyExistEmail() {
      cy.get(this.alertWihtErrorMessageForAlreadyExistEmail).contains(this.alertWihtErrorMessageForAlreadyExistEmailText).should('be.visible')
    }

}
        
export const registerPage = new RegisterPage();