// src/__tests__/NumberOfEvents.test.js

import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import { render } from '@testing-library/react';

describe('<NumberOfEvents /> Component', () => {
  let NumberOfEventsComponent;

  // Set up the component before each test
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  // Ensure the component is rendered
  test('component is rendered', () => {
    const component = NumberOfEventsComponent.container.firstChild;
    expect(component).toBeInTheDocument();
  });

  // Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
  test('default number of events is 32 when user hasn’t specified a number', () => {
    const input = NumberOfEventsComponent.getByTestId('number-of-events-input');
    // Make sure the default value is set to 32
    expect(input).toHaveValue(32);
  });

  // Ensure the presence of the number input for user input
  test('contains a number input field', () => {
    const input = NumberOfEventsComponent.getByTestId('number-of-events-input');
    expect(input).toBeInTheDocument();
  });

  // Scenario 2: User can change the number of events displayed.
  test('number of events changes when user updates the input', async () => {
    const input = NumberOfEventsComponent.getByTestId('number-of-events-input');
    // Simulate user typing to change the value
    await userEvent.type(input, '{backspace}{backspace}10');
    expect(input).toHaveValue(10);
  });
});
