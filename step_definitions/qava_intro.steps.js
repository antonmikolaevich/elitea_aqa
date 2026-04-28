const { Given, When, Then } = require('@cucumber/cucumber');
const IntroPage = require('../page_object/IntroPage');

/**
 * Step definitions for IntroPage scenarios.
 * These steps reference the IntroPage POM selectors and methods. No selectors are hardcoded here.
 */

Given('I open the QavaJS intro page using qavajs.open {string}', async function(url) {
  await this.qavajs.open(url);
});

Given('I locate the link with text "What\'s new in v2" (use qavajs.locateByText or appropriate selector)', async function() {
  // reference POM selector
  this.whatsNew = IntroPage.whatsNewLink;
});

Then('the "What\'s new in v2" link must be visible and clickable (use qavajs.shouldBeVisible and qavajs.shouldBeClickable)', async function() {
  await this.qavajs.shouldBeVisible(this.whatsNew);
  await this.qavajs.shouldBeClickable(this.whatsNew);
});

When('I click the "What\'s new in v2" link using qavajs.click', async function() {
  await this.qavajs.click(this.whatsNew);
});

Then('the browser should navigate to the target page (verify qavajs.waitForNavigation)', async function() {
  await this.qavajs.waitForNavigation();
});

Then('the page title should equal "What\'s new in v2" (use qavajs.getTitle and qavajs.shouldEqual)', async function() {
  const title = await this.qavajs.getTitle();
  await this.qavajs.shouldEqual(title, "What's new in v2");
});

Given('I locate the navigation item named "Steps" (use qavajs.locateByText or selector for nav)', async function() {
  this.stepsNav = IntroPage.stepsNavItem;
});

Then('the "Steps" dropdown must be present and functional (use qavajs.shouldBeVisible)', async function() {
  await this.qavajs.shouldBeVisible(this.stepsNav);
});

When('I click the "Steps" dropdown using qavajs.click', async function() {
  await this.qavajs.click(this.stepsNav);
});

Then('the dropdown must display a list of packages (use qavajs.getElementsText)', async function() {
  this.packages = await IntroPage.getStepsPackages();
  if (!this.packages || this.packages.length === 0) {
    await this.qavajs.assertFail("ERROR: Steps dropdown did not display any packages");
  }
});

Then('the list of packages must match the expected list:', async function(dataTable) {
  const expected = dataTable.raw().flat().map(s => s.trim());
  const missing = expected.filter(e => !this.packages.includes(e));
  if (missing.length > 0) {
    await this.qavajs.assertFail(`ERROR: Steps dropdown missing packages. Missing: ${missing.join(', ')}`);
  }
});

Given('I attempt to locate the "What\'s new in v2" link (use qavajs.locateByText)', async function() {
  this.whatsNew = IntroPage.whatsNewLink;
});

When('the link is not found or not clickable', async function() {
  const visible = await this.qavajs.isVisible(this.whatsNew);
  const clickable = await this.qavajs.isClickable(this.whatsNew);
  if (!visible || !clickable) {
    await this.qavajs.assertFail("ERROR: 'What's new in v2' link is missing or not clickable");
  }
});

Given('I attempt to locate and open the "Steps" dropdown', async function() {
  this.stepsNav = IntroPage.stepsNavItem;
});

When('the dropdown is not present or the displayed package list is missing entries', async function() {
  const visible = await this.qavajs.isVisible(this.stepsNav);
  if (!visible) {
    await this.qavajs.assertFail('ERROR: Steps dropdown missing or not present');
  }
  this.packages = await IntroPage.getStepsPackages();
  const expected = [
    '@qavajs/steps',
    '@qavajs/steps-webdriver',
    '@qavajs/steps-playwright',
    '@qavajs/steps-puppeteer',
    '@qavajs/steps-api'
  ];
  const missing = expected.filter(e => !this.packages.includes(e));
  if (missing.length > 0) {
    await this.qavajs.assertFail(`ERROR: Steps dropdown missing packages. Missing: ${missing.join(', ')}`);
  }
});

Given('the intro page is open', async function() {
  // no-op, background step handles opening
});

When('I open the "Steps" dropdown', async function() {
  await IntroPage.openStepsDropdown();
});

Then('the displayed packages should exactly match the expected package list', async function(dataTable) {
  const expected = dataTable.raw().flat()[0].split(',').map(s => s.trim());
  const actual = await IntroPage.getStepsPackages();
  const extra = actual.filter(a => !expected.includes(a));
  const missing = expected.filter(e => !actual.includes(e));
  if (extra.length > 0 || missing.length > 0) {
    await this.qavajs.assertFail(`ERROR: Packages do not match. Missing: ${missing.join(', ')}. Extra: ${extra.join(', ')}`);
  }
});

When('I click the "Steps" dropdown to open it', async function() {
  await this.qavajs.click(IntroPage.stepsNavItem);
});

Then('the dropdown content becomes visible', async function() {
  const pkgs = await IntroPage.getStepsPackages();
  if (!pkgs || pkgs.length === 0) {
    await this.qavajs.assertFail('ERROR: Steps dropdown content not visible after opening');
  }
});

When('I click the "Steps" dropdown again', async function() {
  await this.qavajs.click(IntroPage.stepsNavItem);
});

Then('the dropdown content is hidden', async function() {
  const pkgs = await IntroPage.getStepsPackages();
  if (pkgs && pkgs.length > 0) {
    await this.qavajs.assertFail('ERROR: Steps dropdown did not close as expected');
  }
});
