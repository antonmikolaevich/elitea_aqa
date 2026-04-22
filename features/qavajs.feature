Feature: QavaJS Home Page

  Scenario: Home page header is visible
    Given I open 'https://qavajs.github.io' url
    * I expect 'Qava Home Page > Header' to be visible

  Scenario: Documentation link is visible
    Given I open 'https://qavajs.github.io' url
    * I expect 'Qava Home Page > Writing Tests Link' to be visible