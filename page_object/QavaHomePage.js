const { locator } = require('@qavajs/steps-playwright/po.js');

/**
 * QavaHomePage POM representing the QavaJS homepage
 * Contains selectors for the main header and documentation link
 */
module.exports = class QavaHomePage {
  // Selectors defined as class properties at the top
  selector = 'body';
  header = locator('header h1');
  writingTestsLink = locator('a.menu__link[href*="writing-tests"]');
};