const { locator } = require("@qavajs/steps-playwright/po.js");
const QavaHomePage = require("./QavaHomePage");

module.exports = class App {
  QavaHomePage = locator.as(QavaHomePage);

}
