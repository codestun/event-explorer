Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default.

    Given the user is viewing a list of events,
    When the events are displayed initially,
    Then each event element should be collapsed by default, showing limited details.
  Scenario: User can expand an event to see details.

    Given the user is viewing a list of events with collapsed event elements,
    When the user clicks on an event to view its details,
    Then the event details should expand, and the user can see more information about that event.
  Scenario: User can collapse an event to hide details.

    Given the user is viewing a list of events with expanded event details,
    When the user clicks on an event again,
    Then the event details should collapse, hiding the additional information.
