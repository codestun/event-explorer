// src/components/Event.js

const Event = ({ event }) => {
  return (
    <li>
      <h2>{event.summary}</h2> {/* Title */}
      <p>{new Date(event.created).toString()}</p> {/* Start Time */}
      <p>{event.location}</p> {/* Location */}
      <button className="show-details-button">Show Details</button>
    </li>
  );
}

export default Event;
