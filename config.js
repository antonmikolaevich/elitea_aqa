const Memory = require("./memory");
const App = require("./page_object");
module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    // Load QavaJS step packages and project step definitions (include our steps/ folder)
    require: [
      "node_modules/@qavajs/steps-memory/index.js",
      "node_modules/@qavajs/steps-playwright/index.js",
      "step_definitions/*.js",
      "steps/*.js"
    ],
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
