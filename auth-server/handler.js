'use strict';
// Enforce stricter parsing and error handling for the JavaScript code

const { google } = require("googleapis");
// Import the Google APIs library

const calendar = google.calendar("v3");
// Access the Calendar API version 3 from Google's API library

const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
// Define the permission to read public events from a Google Calendar

const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
// Extract secret credentials from the environment for Google API communication

const redirect_uris = ["https://codestun.github.io/event-explorer/"];
// Define the redirect URL after Google OAuth2 authentication

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);
// Create a new OAuth2 client for authentication

module.exports.getAuthURL = async () => {
  // Generate and return the Google OAuth2 authentication URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // Start of the function to get the access token using an authorization code.

  // Extract and decode the authorization code from the provided event's path parameters.
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  // Create a new Promise to handle the asynchronous operation of fetching the access token.
  return new Promise((resolve, reject) => {
    /**
     * Use the OAuth2 client to exchange the authorization code for an access token.
     * This operation is asynchronous, so we provide a callback function to handle the response.
     * The callback function receives two parameters: an error and a response.
     * If there's an error, we reject the promise. If it's successful, we resolve the promise with the response.
     */
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // If the promise is resolved (i.e., successful), this block is executed

      // Construct a success HTTP response with a status code of 200
      // The obtained access token (or other related data) is included in the response body as JSON
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // If the promise is rejected (i.e., there was an error), this block is executed

      // Construct an error HTTP response with a status code of 500
      // The error message is included in the response body as JSON
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {

  // Decode the access token from the event's path parameters
  const access_token = decodeURIComponent(
    `${event.pathParameters.access_token}`
  );

  // Set the decoded token for the OAuth client
  oAuth2Client.setCredentials({ access_token });

  // Use a Promise to handle the asynchronous listing of calendar events
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,            // Use the specified Calendar ID
        auth: oAuth2Client,                 // Use the authenticated client
        timeMin: new Date().toISOString(),  // Set the minimum time to the current time
        singleEvents: true,                 // Fetch single events, not recurring ones
        orderBy: "startTime",               // Order the events by their start time
      },
      (error, response) => {
        if (error) {
          reject(error);  // If there's an error, stop and return it
        } else {
          resolve(response);  // If successful, continue with the response
        }
      }
    );
  })
    .then((results) => {
      // Return the list of events with a successful status code (200)
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow any website to access this
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items }), // Return the list of events in the response body
      };
    })
    .catch((error) => {
      // If something goes wrong, return an error status code (500), indicating a server error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
