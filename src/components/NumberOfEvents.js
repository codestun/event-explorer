// src/components/NumberOfEvents.js

import React from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(event.target.value)
    // Initialize ErrorText as an empty string
    let errorText = "";

    // Check if value is not a number
    if (isNaN(value)) {
      errorText = "Only numbers are allowed";
    }
    // Check if value is greater than 32
    else if (value > 32) {
      errorText = "Number should be 32 or less";
    }
    // Check if value is negative
    else if (value < 0) {
      errorText = "Number should be positive";
    }

    // Update the state only if there is no error
    if (errorText === "") {
      setCurrentNOE(value);
    }

    // Set the error message
    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <label>
        Number of Events:
        <input
          type="text"
          defaultValue='32'
          onChange={handleChange}
          data-testid="number-of-events-input"
        />
      </label>
    </div>
  );
}

export default NumberOfEvents;
