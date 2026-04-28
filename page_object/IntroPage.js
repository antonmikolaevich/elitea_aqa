const { locator } = require('@qavajs/steps-playwright/po.js');

/**
 * IntroPage POM for QavaJS docs intro page
 * Contains selectors and basic interaction methods for the intro page.
 */
class IntroPage {
  // Selectors defined as class properties at the top
  whatsNewLink = locator("=What's new in v2");
  stepsNavItem = locator('nav=Steps');
  stepsPackagesList = locator('nav .dropdown a');

  /**
   * Clicks the "What's new in v2" link
   */
  async clickWhatsNewLink() {
    await this.whatsNewLink.click();
  }

  /**
   * Opens the Steps dropdown
   */
  async openStepsDropdown() {
    await this.stepsNavItem.click();
  }

  /**
   * Returns the visible package names inside Steps dropdown
   * @returns {Promise<string[]>} list of package names
   */
  async getStepsPackages() {
    const elements = await this.stepsPackagesList.elements();
    const texts = [];
    for (const el of elements) {
      texts.push(await el.getText());
    }
    return texts;
  }
}

module.exports = IntroPage;