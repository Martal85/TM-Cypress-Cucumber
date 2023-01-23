const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');


module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    specPattern: "**/*.feature",
    supportFile: false,
    baseUrl: 'https://transfermate.io/en/register.asp?',
	  experimentalStudio: true,
	  waitForAnimations: true,
 	  testIsolation: true,
	  defaultCommandTimeout : 10000,
	  pageLoadTimeout : 10000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
     preprocessor.addCucumberPreprocessorPlugin(on, config);
    
      on(
        "file:preprocessor",
        webpack({
          webpackOptions: {
            resolve: {
              extensions: [".ts", ".js"],
            },
            module: {
              rules: [
                {
                  test: /\.feature$/,
                  use: [
                    {
                      loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                      options: config,
                    },
                  ],
                },
              ],
            },
          },
        }),
        
      );
      allureWriter(on, config);
      return config;
  },
  env: {
      allureReuseAfterSpec: true
  },
}
});