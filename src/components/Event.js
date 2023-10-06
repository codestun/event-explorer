// src/components/Event.js

import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <li className="event-item">
      <h3 className="event-title">{event.summary}</h3>
      <p className="event-created">{event.created}</p>
      <p className="event-location">{event.location}</p>
      <button
        className="event-details-btn"
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails ? (
        <div className="event-details">
          <h4>Event Details</h4>
          <p className="event-description">Description: {event.description}</p>
          <p className="event-status">Event status: {event.status}</p>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
