/// <reference types="@shelex/cypress-allure-plugin" />
const cucumber = require('cypress-cucumber-preprocessor').default
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = (on, config) => {
on('file:preprocessor', cucumber())
}
module.exports = (on) => {
    on('file:preprocessor', webpackPreprocessor())
  }
  module.exports = (on, config) => {
    allureWriter(on, config);
    return config;
};  
