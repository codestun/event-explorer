// src/__tests__/Event.test.js
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> Component Tests', () => {
  let EventComponent;
  let allEvents;

  // Fetch events using getEvents and select the first event before each test
  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('should render the event title', () => {
    const titleElement = EventComponent.queryByText(allEvents[0].summary);
    expect(titleElement).toBeInTheDocument();
  });

  test('should render the event time', () => {
    const timeElement = EventComponent.queryByText(allEvents[0].created);
    expect(timeElement).toBeInTheDocument();
  });

  test('should render the event location', () => {
    const locationElement = EventComponent.queryByText(allEvents[0].location);
    expect(locationElement).toBeInTheDocument();
  });

  test('should render the "Show Details" button', () => {
    const showDetailsButton = EventComponent.queryByText('Show Details');
    expect(showDetailsButton).toBeInTheDocument();
  });

  // Scenario 1: An event element is collapsed by default.
  test('by default event details should be hidden', () => {
    const eventDetailsContainer = EventComponent.container.firstChild;
    const detailsElement = eventDetailsContainer.querySelector('.event-details');
    expect(detailsElement).not.toBeInTheDocument();
  });

  // Scenario 2: User can expand an event to see details.
  test('should show event details after clicking "Show Details"', async () => {
    const showDetailsButton = EventComponent.queryByText('Show Details');
    await userEvent.click(showDetailsButton);

    const eventDetailsContainer = EventComponent.container.firstChild;
    const detailsElement = eventDetailsContainer.querySelector('.event-details');
    expect(detailsElement).toBeInTheDocument();
  });

  // Scenario 3: User can collapse an event to hide details.
  test('should hide event details after clicking "Hide Details"', async () => {
    const showDetailsButton = EventComponent.queryByText('Show Details');
    await userEvent.click(showDetailsButton);

    const hideDetailsButton = EventComponent.queryByText('Hide Details');
    await userEvent.click(hideDetailsButton);

    const eventDetailsContainer = EventComponent.container.firstChild;
    const detailsElement = eventDetailsContainer.querySelector('.event-details');
    expect(detailsElement).not.toBeInTheDocument();
  });
});
