# Transfermate_Task

Prerequisites:
1. Latest NodeJS
2. Installed latest Cypress v12
3. Installed latest cypress-cucumber-preprocessor
4. Installed latest cypress/webpack-preprocessor
5. Installed Allure
6. Installer mocha-allure-reporter (without it the allure-resuts folder is deleted during the report creation process)

Setup the project
- Install npm
- Clone repo and in the same directory run **npm install** to install all dependencies for a project

Framework details:
1. App URL: https://transfermate.io/en/register.asp?
2. Framework and language: Cypress + Cucumber
3. Language and model: page object model + js
4. Reporter: Allure

Prerequest for the tests:
Because there is a math CAPTCHA in order to run successfully the tests the user first should:
1) disables the CAPTCHA in the testing environment before the test run or
2) whitelists the IP addess for the CAPTCHA before the test run or
3) manualy enter the CAPTCHA during the wait pause

Steps Run the project with terminal:
1. Open new terminal
2. 
- Run tests in headless mode execute **npm run cypress** 
- Run tests in cypress GUI execute **npm run cypress:open** or **npx cypress open**
3. Report gets generated and is open automaticaly


