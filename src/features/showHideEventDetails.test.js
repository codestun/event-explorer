import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Load the feature file for the test, this file contains the Gherkin syntax
const feature = loadFeature('./src/features/showHideEventDetails.feature');

// Define how the tests should run based on the loaded feature
defineFeature(feature, test => {

  // Declare variables that will be used across different steps of the test
  let AppComponent;
  let EventElement;
  let EventDetailsButton;

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the user is viewing a list of events,', async () => {
      // Render the main App component
      AppComponent = render(<App />);
      await waitFor(() => {
        // Ensure the event list is present and retrieve the first event
        const eventList = within(AppComponent.container).getByTestId('event-list');
        const eventItems = within(eventList).queryAllByRole('listitem');
        expect(eventItems.length).toBeGreaterThan(0);  // Ensure there's at least one event rendered
        EventElement = eventItems[0];  // Use the first event for testing
      });
    });

    when('the events are displayed initially,', () => {
      // Get the button for showing event details
      EventDetailsButton = within(EventElement).getByRole('button', { name: /show details/i });
    });

    then('each event element should be collapsed by default, showing limited details.', () => {
      // Check that the event details are not visible in the DOM
      const eventDetails = EventElement.querySelector('.event-details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details.', ({ given, when, then }) => {
    given('the user is viewing a list of events with collapsed event elements,', async () => {
      // Render the main App component and get the button for showing event details
      AppComponent = render(<App />);
      await waitFor(() => {
        const eventItems = within(AppComponent.container).queryAllByRole('listitem');
        EventElement = eventItems[0];
        EventDetailsButton = within(EventElement).getByRole('button', { name: /show details/i });
      });
    });

    when('the user clicks on an event to view its details,', () => {
      // Simulate a user clicking on the button to show event details
      userEvent.click(EventDetailsButton);
    });

    then('the event details should expand, and the user can see more information about that event.', async () => {
      await waitFor(() => {
        // Check that the event details are now visible in the DOM
        const eventDetails = EventElement.querySelector('.event-details');
        expect(eventDetails).toBeInTheDocument();
      });
    });
  });

  test('User can collapse an event to hide details.', ({ given, when, then }) => {
    given('the user is viewing a list of events with expanded event details,', async () => {
      // Render the main App component and ensure at least one event is present
      AppComponent = render(<App />);
      await waitFor(() => {
        const eventList = within(AppComponent.container).getByTestId('event-list');
        const eventItems = within(eventList).queryAllByRole('listitem');
        expect(eventItems.length).toBeGreaterThan(0);
        EventElement = eventItems[0];
      });
      EventDetailsButton = within(EventElement).getByRole('button', { name: /show details/i });
    });

    when('the user clicks on an event again,', () => {
      // Simulate a user clicking on the button to hide event details
      userEvent.click(EventDetailsButton);
    });

    then('the event details should collapse, hiding the additional information.', () => {
      // Check that the event details are not visible in the DOM
      const eventDetails = EventElement.querySelector('.event-details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});
