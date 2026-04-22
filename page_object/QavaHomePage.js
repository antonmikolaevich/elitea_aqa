const { locator } = require('@qavajs/steps-playwright/po.js');

module.exports = class QavaHomePage {
    selector = 'body';
    Header = locator('header h1');
    WritingTestsLink = locator('a.menu__link[href*="writing-tests"]');
}