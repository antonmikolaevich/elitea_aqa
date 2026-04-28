const { locator } = require("@qavajs/steps-playwright/po.js");
const QavaHomePage = require("./QavaHomePage");

module.exports = class App {
  QavaHomePage = locator.as(QavaHomePage);

}

// NOTE: We use our custom POMs in pages/*.page.js and steps/intro.steps.js directly.
// If you prefer to expose them via page_object, create new wrappers here and map them
// with locator.as().
