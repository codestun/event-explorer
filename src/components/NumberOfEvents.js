// src/components/NumberOfEvents.js

import React from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <label>
        Number of Events:
        <input
          type="number"
          defaultValue="32"
          onChange={handleChange}
          data-testid="number-of-events-input"
        />
      </label>

    </div>
  );
}

export default NumberOfEvents;
