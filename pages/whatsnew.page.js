/* POM: What's New Page
   Purpose: selectors and reusable methods for the "What's new in v2" page
*/

module.exports = {
  // partial URL or path fragment for verification
  urlFragment: '/docs/whats-new-in-v2',

  selectors: {
    pageTitle: 'h1'
  },

  async waitForNavigation() {
    // simple wait to ensure new page loaded; can be improved with explicit URL check
    await qavajs.waitForNavigation();
  },

  async getPageTitle() {
    return await qavajs.getTitle();
  },

  pageTitleSelector() {
    return this.selectors.pageTitle;
  }
};