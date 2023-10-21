Feature: Specify Number of Events
  Scenario: When user hasn’t specified a number, 32 events are shown by default.

    Given the user is on the event list page without specifying the number of events to display,
    When the user opens the app,
    Then the app should display a default of 32 events on the screen.
  Scenario: User can change the number of events displayed.

    Given the user is on the event list page,
    When the user specifies a different number of events (e.g., 20 events) to display,
    Then the app should load and display the specified number of events on the screen.
