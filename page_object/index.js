const { locator } = require("@qavajs/steps-playwright/po.js");
const QavaHomePage = require("./QavaHomePage");
const IntroPage = require("./IntroPage");

/**
 * App container exposing page objects via locator.as
 */
class App {
  // Page object instances attached as properties
  QavaHomePage = locator.as(QavaHomePage);
  IntroPage = locator.as(IntroPage);
}

module.exports = new App();
