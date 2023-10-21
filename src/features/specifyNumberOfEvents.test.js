import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Load the feature file that describes the tests
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

// Define the tests based on the scenarios described in the feature file
defineFeature(feature, test => {

  // Variables to store references to main components and input elements
  let AppComponent;
  let NumberOfEventsInput;

  test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
    given('the user is on the event list page without specifying the number of events to display,', () => {
      // Render the main App component
      AppComponent = render(<App />);
    });

    when('the user opens the app,', () => {
      // The app is already open from the 'given' step, so no action is needed here.
    });

    then(/^the app should display a default of (\d+) events on the screen.$/, (arg0) => {
      // Check that the input field for the number of events displays the default value
      NumberOfEventsInput = within(AppComponent.container).getByTestId('number-of-events-input');
      expect(NumberOfEventsInput.value).toBe(arg0);
    });
  });

  test('User can change the number of events displayed.', ({ given, when, then }) => {
    given('the user is on the event list page,', () => {
      // Render the main App component and get a reference to the input field
      AppComponent = render(<App />);
      NumberOfEventsInput = within(AppComponent.container).getByTestId('number-of-events-input');
    });

    when(/^the user specifies a different number of events \(e.g., (\d+) events\) to display,$/, async (arg0) => {
      // Simulate user action to clear the input field and type a new value
      userEvent.clear(NumberOfEventsInput);
      userEvent.type(NumberOfEventsInput, arg0);

      // Wait to ensure any asynchronous updates have completed
      await waitFor(() => { });
    });

    then('the app should load and display the specified number of events on the screen.', async () => {
      // Wait for updates and then check that the input field reflects the new value
      await waitFor(() => {
        expect(NumberOfEventsInput.value).toBe('20');
      });
    });
  });
});
