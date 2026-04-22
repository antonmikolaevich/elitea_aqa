const Memory = require("./memory");
const App = require("./page_object");
module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: ["node_modules/@qavajs/steps-memory/index.js","node_modules/@qavajs/steps-playwright/index.js","step_definitions/*.js"],
    requireModule: [],
    format: [],
    memory: new Memory(),
    pageObject: new App(),
    browser: {
      capabilities: {
        browserName: "chromium"
      }
    },
  }
}
