// src/components/NumberOfEvents.js

import { useState } from "react";

const NumberOfEvents = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32); // default value

  const handleChange = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        value={numberOfEvents}
        onChange={handleChange}
        data-testid="number-of-events-input"
      />
    </div>
  );
}

export default NumberOfEvents;
