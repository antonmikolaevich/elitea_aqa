/* POM: QavaJS Intro Page
   Purpose: selectors and reusable methods for the QavaJS docs intro page
   QavaJS v2 POM style
*/

module.exports = {
  url: 'https://qavajs.github.io/docs/intro',

  selectors: {
    // link by exact visible text (QavaJS locateByText style)
    whatsNewLink: "=What's new in v2",

    // navigation item 'Steps' - XPath used for robust locate
    stepsNav: "//nav//a[normalize-space() = 'Steps']",

    // dropdown items under Steps - CSS selector
    stepsDropdownItems: 'nav .dropdown-menu a',

    // container for dropdown content to check visibility
    stepsDropdownContainer: 'nav .dropdown-menu'
  },

  // Open the intro page
  async open() {
    await qavajs.open(this.url);
  },

  // Accessors for selectors
  whatsNewLinkSelector() {
    return this.selectors.whatsNewLink;
  },

  stepsNavSelector() {
    return this.selectors.stepsNav;
  },

  stepsDropdownContainerSelector() {
    return this.selectors.stepsDropdownContainer;
  },

  stepsDropdownItemsSelector() {
    return this.selectors.stepsDropdownItems;
  }
};