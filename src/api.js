// src/api.js
import mockData from './mock-data';

// ----------- UTILITY FUNCTIONS -----------
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// ----------- AUTHENTICATION FUNCTIONS -----------
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

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

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch('https://6h4vhy0k0f.execute-api.us-west-1.amazonaws.com/dev/api/token/' + encodeCode);
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

// ----------- MAIN API CALLS -----------
export const getEvents = async () => {
  try {
    NProgress.start();
    if (window.location.href.startsWith("http://localhost")) {
      return mockData;
    }

    if (!navigator.onLine) {
      const events = localStorage.getItem("lastEvents");
      return events ? JSON.parse(events) : [];
    }

    const token = await getAccessToken();

    if (token) {
      removeQuery();
      const url = `https://6h4vhy0k0f.execute-api.us-west-1.amazonaws.com/dev/api/get-events/${token}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    }
    return [];
  } catch (error) {
    console.error("Could not get events:", error);
    return [];
  } finally {
    NProgress.done();
  }
};
