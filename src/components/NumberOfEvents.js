// src/components/NumberOfEvents.js

import React from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleChange = (event) => {
    const value = event.target.value.trim(); // Trim the value to handle spaces
    let errorText = "";

    if (value === '') {
      errorText = "Please enter a number";
    } else if (isNaN(value)) {
      errorText = "Only numbers are allowed";
    } else if (value > 32) {
      errorText = "Number should be 32 or less";
    } else if (value < 0) {
      errorText = "Number should be positive";
    }

    // Update the state only if there is no error
    if (errorText === "") {
      setCurrentNOE(parseInt(value, 10)); // Parse the value as an integer
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
