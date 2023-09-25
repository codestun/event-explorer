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
