// src/__tests__/Event.test.js

import { render } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

// Testing <Event /> component.
describe('<Event /> component', () => {
  // Use mock data for testing.
  const allEvents = mockData;

  // Ensure the component renders event details like title and time.
  test('renders event details correctly', () => {
    const event = allEvents[0];
    const { queryByText } = render(<Event event={event} />);

    // Check if the event title and start time are displayed.
    expect(queryByText(event.summary)).toBeInTheDocument();
    expect(queryByText(new Date(event.created).toString())).toBeInTheDocument();
  });

  // Ensure the event's location is displayed.
  test('renders event location', () => {
    const { queryByText } = render(<Event event={allEvents[0]} />);
    expect(queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  // Ensure the "Show Details" button is present.
  test('renders event details button with the title (Show Details)', () => {
    const { queryByText } = render(<Event event={allEvents[0]} />);
    expect(queryByText("Show Details")).toBeInTheDocument();
  });
});
