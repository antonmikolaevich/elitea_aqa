Feature: Verify "What's new in v2" link and "Steps" dropdown on QavaJS docs intro page
  As a test automation engineer
  I want to verify the navigation and content of the "What's new in v2" link and the "Steps" dropdown on the https://qavajs.github.io/docs/intro website
  So that users can reliably access updated information and package listings

  # Technical note: These scenarios are written in Gherkin and intended to be implemented with QavaJS v2 steps

  Background:
    Given I open the QavaJS intro page using qavajs.open "https://qavajs.github.io/docs/intro"

  Scenario: "What's new in v2" link is present and navigates to the correct page
    Given I locate the link with text "What's new in v2" (use qavajs.locateByText or appropriate selector)
    Then the "What's new in v2" link must be visible and clickable (use qavajs.shouldBeVisible and qavajs.shouldBeClickable)
    When I click the "What's new in v2" link using qavajs.click
    Then the browser should navigate to the target page (verify qavajs.waitForNavigation)
    And the page title should equal "What's new in v2" (use qavajs.getTitle and qavajs.shouldEqual)

  Scenario: Steps dropdown is present and displays the full package list
    Given I locate the navigation item named "Steps" (use qavajs.locateByText or selector for nav)
    Then the "Steps" dropdown must be present and functional (use qavajs.shouldBeVisible)
    When I click the "Steps" dropdown using qavajs.click
    Then the dropdown must display a list of packages (use qavajs.getElementsText)
    And the list of packages must match the expected list:
      | package_name                 |
      | @qavajs/steps                |
      | @qavajs/steps-webdriver      |
      | @qavajs/steps-playwright     |
      | @qavajs/steps-puppeteer     |
      | @qavajs/steps-api            |

  Scenario: Negative - "What's new in v2" link is missing or broken
    Given I attempt to locate the "What's new in v2" link (use qavajs.locateByText)
    When the link is not found or not clickable
    Then the test should fail with a clear error message: "ERROR: 'What's new in v2' link is missing or not clickable" (use qavajs.assertFail with descriptive message)

  Scenario: Negative - Steps dropdown missing or package list incomplete
    Given I attempt to locate and open the "Steps" dropdown
    When the dropdown is not present or the displayed package list is missing entries
    Then the test should fail with a clear error message indicating which packages are missing (use qavajs.assertFail with a message like "ERROR: Steps dropdown missing or packages incomplete. Missing: <list>")

  Scenario Outline: Steps dropdown exact-match verification for packages (positive and edge cases)
    Given the intro page is open
    When I open the "Steps" dropdown
    Then the displayed packages should exactly match the expected package list
      | expected_packages                                |
      | @qavajs/steps,@qavajs/steps-webdriver,@qavajs/steps-playwright,@qavajs/steps-puppeteer,@qavajs/steps-api |

    Examples:
      | expected_packages                                                                                                         |
      | @qavajs/steps,@qavajs/steps-webdriver,@qavajs/steps-playwright,@qavajs/steps-puppeteer,@qavajs/steps-api                  |

  Scenario: Accessibility/Usability - Steps dropdown toggles open and closed
    Given the intro page is open
    When I click the "Steps" dropdown to open it
    Then the dropdown content becomes visible
    When I click the "Steps" dropdown again
    Then the dropdown content is hidden

  # Implementation notes for QavaJS v2:
  # - Map steps: open -> qavajs.open(url)
  # - locateByText -> qavajs.$("=link text") or use CSS/XPath selectors
  # - shouldBeVisible -> qavajs.shouldBeVisible(selector)
  # - shouldBeClickable -> qavajs.shouldBeClickable(selector)
  # - click -> qavajs.click(selector)
  # - getTitle -> qavajs.getTitle()
  # - getElementsText -> qavajs.getElementsText(selector) to compare arrays
  # - assertFail -> qavajs.fail(message) or throw an assertion with descriptive text
  # - Use explicit waits (qavajs.waitForVisible/waitForNavigation) where appropriate to avoid flakiness
