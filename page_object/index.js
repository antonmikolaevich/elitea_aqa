const { locator } = require("@qavajs/steps-playwright/po.js");
const QavaHomePage = require("./QavaHomePage");
const IntroPage = require("./IntroPage");

module.exports = class App {
  QavaHomePage = locator.as(QavaHomePage);
  IntroPage = locator.as(IntroPage);

}
