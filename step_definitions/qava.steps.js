// step_definitions/qavajs.steps.js
// No custom steps are needed for these scenarios, as QavaJS built-in steps cover navigation and visibility checks.
// If you want to add a custom step, for example, to print the header text:

const { Then } = require('@cucumber/cucumber');
const { QavajsHomePage } = require('../page_object/QavaHomePage');

Then('I print the home page header', async function() {
    const headerText = await this.browser.getText(QavajsHomePage.Header);
    console.log('Home page header:', headerText);
});