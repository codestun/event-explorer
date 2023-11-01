// src/api.js
import mockData from './mock-data';

// ----------- UTILITY FUNCTIONS -----------
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// Function to remove query parameters from the URL
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState("", "", newurl);
  } else {
    newurl = `${window.location.protocol}//${window.location.host}`;
    window.history.pushState("", "", newurl);
  }
};

// ----------- AUTHENTICATION FUNCTIONS -----------

// Function to check the validity of an access token
const checkToken = async (accessToken) => {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
    if (!response.ok) {
      console.error(`Failed fetching token info: ${response.status}`);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in checkToken:', error);
  }
};

// Function to get an access token for API calls
const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (!code) {
      const response = await fetch("https://6h4vhy0k0f.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url");
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

// Function to get a new token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(`https://6h4vhy0k0f.execute-api.us-west-1.amazonaws.com/dev/api/token/${encodeCode}`);
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

// ----------- MAIN API CALLS -----------

// Function to get events data
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    try {
      const url = `https://6h4vhy0k0f.execute-api.us-west-1.amazonaws.com/dev/api/get-events/${token}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed fetching events: ${response.status}`);
        return null;
      }
      const result = await response.json();
      return result.events;
    } catch (error) {
      console.error('Error in getEvents:', error);
      return null;
    }
  }
};
