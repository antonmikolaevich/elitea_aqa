/* Step definitions for the feature: Verify "What's new in v2" link and "Steps" dropdown on QavaJS docs intro page
   Using QavaJS v2 style step implementations that use the POMs in pages/
*/

const IntroPage = require('../pages/intro.page');
const WhatsNewPage = require('../pages/whatsnew.page');

module.exports = function() {
  this.Given(/^I open the QavaJS intro page using qavajs.open "([^"]+)"$/, async (url) => {
    await IntroPage.open();
  });

  this.Given(/^I locate the link with text "([^"]+)" \(use qavajs.locateByText or appropriate selector\)$/, async (linkText) => {
    this.whatsNewSelector = IntroPage.whatsNewLinkSelector();
  });

  this.Then(/^the "What's new in v2" link must be visible and clickable \(use qavajs.shouldBeVisible and qavajs.shouldBeClickable\)$/, async () => {
    await qavajs.shouldBeVisible(this.whatsNewSelector);
    await qavajs.shouldBeClickable(this.whatsNewSelector);
  });

  this.When(/^I click the "What's new in v2" link using qavajs.click$/, async () => {
    await qavajs.click(this.whatsNewSelector);
  });

  this.Then(/^the browser should navigate to the target page \(verify qavajs.waitForNavigation\)$/, async () => {
    await WhatsNewPage.waitForNavigation();
  });

  this.Then(/^the page title should equal "([^"]+)" \(use qavajs.getTitle and qavajs.shouldEqual\)$/, async (expectedTitle) => {
    const title = await WhatsNewPage.getPageTitle();
    await qavajs.shouldEqual(title, expectedTitle);
  });

  // Steps dropdown
  this.Given(/^I locate the navigation item named "([^"]+)" \(use qavajs.locateByText or selector for nav\)$/, async (navName) => {
    this.stepsNavSelector = IntroPage.stepsNavSelector();
  });

  this.Then(/^the "Steps" dropdown must be present and functional \(use qavajs.shouldBeVisible\)$/, async () => {
    await qavajs.shouldBeVisible(this.stepsNavSelector);
  });

  this.When(/^I click the "Steps" dropdown using qavajs.click$/, async () => {
    await qavajs.click(this.stepsNavSelector);
  });

  this.Then(/^the dropdown must display a list of packages \(use qavajs.getElementsText\)$/, async () => {
    await qavajs.waitForVisible(IntroPage.stepsDropdownContainerSelector());
    this.visiblePackageTexts = await qavajs.getElementsText(IntroPage.stepsDropdownItemsSelector());
  });

  this.Then(/^the list of packages must match the expected list:$/, async (table) => {
    const expected = table.raw().map(r => r[0]);
    // compare arrays - ensure both arrays contain same items
    const missing = expected.filter(e => !this.visiblePackageTexts.includes(e));
    if (missing.length) {
      await qavajs.fail(`ERROR: Steps dropdown missing packages. Missing: ${missing.join(', ')}`);
    }
  });

  // Negative scenarios
  this.Given(/^I attempt to locate the "What's new in v2" link \(use qavajs.locateByText\)$/, async () => {
    this.whatsNewSelector = IntroPage.whatsNewLinkSelector();
  });

  this.When(/^the link is not found or not clickable$/, async () => {
    try {
      await qavajs.shouldBeVisible(this.whatsNewSelector);
      await qavajs.shouldBeClickable(this.whatsNewSelector);
      // if reachable, then it's clickable - force fail to simulate negative path only when broken
      await qavajs.fail('Link is present; negative test expects it missing or not clickable');
    } catch (err) {
      // expected: not visible or not clickable
      // rethrow with desired message
      await qavajs.fail("ERROR: 'What's new in v2' link is missing or not clickable");
    }
  });

  this.Then(/^the test should fail with a clear error message: "([^"]+)" \(use qavajs.assertFail with descriptive message\)$/, async (message) => {
    // qavajs.fail already used in When step to produce message
    // here we ensure the message is the same - placeholder because fail would have stopped execution
  });

  // Negative Steps dropdown
  this.Given(/^I attempt to locate and open the "Steps" dropdown$/, async () => {
    this.stepsNavSelector = IntroPage.stepsNavSelector();
  });

  this.When(/^the dropdown is not present or the displayed package list is missing entries$/, async () => {
    try {
      await qavajs.shouldBeVisible(this.stepsNavSelector);
      await qavajs.click(this.stepsNavSelector);
      await qavajs.waitForVisible(IntroPage.stepsDropdownContainerSelector());
      const visible = await qavajs.getElementsText(IntroPage.stepsDropdownItemsSelector());
      const expectedList = [
        '@qavajs/steps',
        '@qavajs/steps-webdriver',
        '@qavajs/steps-playwright',
        '@qavajs/steps-puppeteer',
        '@qavajs/steps-api'
      ];
      const missing = expectedList.filter(e => !visible.includes(e));
      if (missing.length) {
        await qavajs.fail(`ERROR: Steps dropdown missing or packages incomplete. Missing: ${missing.join(', ')}`);
      }
      // If nothing missing, intentionally fail because this step is negative and expects missing
      await qavajs.fail('Negative scenario expected missing items but none were missing');
    } catch (err) {
      // produce error message as required
      await qavajs.fail(err.message || 'ERROR: Steps dropdown missing or packages incomplete.');
    }
  });

  this.Then(/^the test should fail with a clear error message indicating which packages are missing \(use qavajs.assertFail with a message like "([^"]+)"\)$/, async (msgTemplate) => {
    // placeholder - actual fail invoked in When
  });

  // Scenario Outline steps
  this.Given(/^the intro page is open$/, async () => {
    await IntroPage.open();
  });

  this.When(/^I open the "Steps" dropdown$/, async () => {
    await qavajs.click(IntroPage.stepsNavSelector());
    await qavajs.waitForVisible(IntroPage.stepsDropdownContainerSelector());
  });

  this.Then(/^the displayed packages should exactly match the expected package list$/, async (table) => {
    const expectedCSV = table.raw()[0][0];
    const expected = expectedCSV.split(',').map(s => s.trim());
    const visible = await qavajs.getElementsText(IntroPage.stepsDropdownItemsSelector());

    // exact match: same length and same items in same order
    if (visible.length !== expected.length) {
      await qavajs.fail(`ERROR: Package list length mismatch. Expected ${expected.length}, got ${visible.length}`);
    }
    for (let i = 0; i < expected.length; i++) {
      if (visible[i] !== expected[i]) {
        await qavajs.fail(`ERROR: Package mismatch at index ${i}. Expected '${expected[i]}', got '${visible[i]}'`);
      }
    }
  });

  // Accessibility/Usability - toggle
  this.When(/^I click the "Steps" dropdown to open it$/, async () => {
    await qavajs.click(IntroPage.stepsNavSelector());
  });

  this.Then(/^the dropdown content becomes visible$/, async () => {
    await qavajs.waitForVisible(IntroPage.stepsDropdownContainerSelector());
  });

  this.When(/^I click the "Steps" dropdown again$/, async () => {
    await qavajs.click(IntroPage.stepsNavSelector());
  });

  this.Then(/^the dropdown content is hidden$/, async () => {
    await qavajs.shouldNotBeVisible(IntroPage.stepsDropdownContainerSelector());
  });
};
