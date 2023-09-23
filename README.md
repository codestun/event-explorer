# Event Explorer - Serverless Progressive Web Application

## Table of Contents
- [Event Explorer - Serverless Progressive Web Application](#event-explorer---serverless-progressive-web-application)
  - [Table of Contents](#table-of-contents)
  - [Objective](#objective)
  - [Context](#context)
  - [The 5 Ws](#the-5-ws)
  - [Serverless Function Integration](#serverless-function-integration)
  - [Project Requirements](#project-requirements)
    - [Key Features](#key-features)
    - [User Stories](#user-stories)
    - [Technical Requirements](#technical-requirements)
  - [Project Features \& Scenarios](#project-features--scenarios)
    - [Feature 1: Filter Events By City](#feature-1-filter-events-by-city)
    - [Feature 2: Show/Hide Event Details](#feature-2-showhide-event-details)
    - [Feature 3: Specify Number of Events](#feature-3-specify-number-of-events)
    - [Feature 4: Use the App When Offline](#feature-4-use-the-app-when-offline)
    - [Feature 5: Add an App Shortcut to the Home Screen](#feature-5-add-an-app-shortcut-to-the-home-screen)
    - [Feature 6: Display Charts Visualizing Event Details](#feature-6-display-charts-visualizing-event-details)

## Objective
The **Event Explorer** is a serverless, progressive web application (PWA) built using React, following a test-driven development (TDD) approach. This application utilizes the Google Calendar API to fetch and display upcoming events. The primary goal is to create a robust and feature-rich application that leverages serverless architecture and PWA capabilities.

## Context
Serverless and PWAs have become essential in modern web development. This project combines these concepts, offering benefits such as easy scalability, offline support, and cross-platform compatibility. TDD ensures high-quality code, while data visualization enhances the user experience. This project will set you apart as a web developer.

## The 5 Ws
1. **Who**: The Event Explorer is designed for users ranging from individuals to professionals and potential employers.
2. **What**: It's a progressive web app with offline capabilities and a serverless backend developed using TDD.
3. **When**: Users can access the app anytime to view upcoming events for a specific city, and the code is readily available on GitHub.
4. **Where**: The server is a serverless function hosted by a cloud provider (e.g., AWS), and the app is accessible online and offline, optimized for various devices.
5. **Why**: Serverless is the future of cloud infrastructure, PWAs offer superior user experience, TDD ensures code quality, and data visualization enhances your skills as a web developer.

## Serverless Function Integration
The Event Explorer app utilizes serverless functions to manage authentication, data retrieval, and user interactions seamlessly. Powered by AWS Lambda, the app provides efficient OAuth2 authentication with the Google Calendar API and secure event data fetching. These functions also process event data for categorization and visualization. They assist in offline data caching, user preference storage, and real-time alerting, ensuring an enhanced user experience. Adopting a serverless approach guarantees scalability, reduced costs, and consistent app performance.

## Project Requirements

### Key Features
- Filter Events by City.
- Show/Hide Event Details.
- Specify Number of Events.
- Use the App When Offline.
- Add an App Shortcut to the Home Screen.
- Display Charts Visualizing Event Details.

### User Stories
- As a user, I want to filter events by city so that I can easily find and view a list of events happening in a specific location.
- As a frequent traveler, I want to quickly switch between different cities to discover events in various locations.
- As a user, I want the ability to show or hide event details, allowing me to see more or less information about an event as needed.
- As someone with limited time, I want to quickly scan event summaries and decide which events to explore further.
- As a user, I would like to specify the number of events I want to view in the app, giving me control over the quantity of events displayed at once.
- As a user with varying interests, I want to adjust the number of events displayed to match my current preferences.

### Technical Requirements
- The app must be a React application.
- Develop the app using TDD.
- Utilize the Google Calendar API and OAuth2 authentication flow.
- Implement serverless functions (preferably AWS Lambda) for the authorization server.
- Host the app's code on GitHub.
- Ensure compatibility with modern browsers and IE11.
- Ensure responsive design for various screen sizes.
- Pass Lighthouse’s PWA checklist.
- Implement offline support with a service worker.
- Allow users to install the app on desktop and add it to their home screen on mobile.
- Deploy the app on GitHub Pages.
- Implement an alert system using an OOP approach.
- Incorporate data visualization.
- Achieve test coverage of at least 90%.
- Monitor the app using an online performance monitoring tool.

## Project Features & Scenarios

### Feature 1: Filter Events By City

**Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.**
   - Given the user is on the event list page without specifying a city,
   - When the user opens the app,
   - Then the user should see a list of upcoming events from all cities.

**Scenario 2: User should see a list of suggestions when they search for a city.**
   - Given the main page is open,
   - When the user starts typing in the city textbox,
   - Then the user should receive a list of cities (suggestions) that match what they’ve typed.

**Scenario 3: User can select a city from the suggested list.**
   - Given the user was typing a city name (e.g., "Berlin") in the city textbox and the list of suggested cities is showing,
   - When the user selects a city (e.g., "Berlin, Germany") from the list,
   - Then their city should be changed to that city (i.e., "Berlin, Germany"), and the user should receive a list of upcoming events in that city.

### Feature 2: Show/Hide Event Details

**Scenario 1: An event element is collapsed by default.**
   - Given the user is viewing a list of events,
   - When the events are displayed initially,
   - Then each event element should be collapsed by default, showing limited details.

**Scenario 2: User can expand an event to see details.**
   - Given the user is viewing a list of events with collapsed event elements,
   - When the user clicks on an event to view its details,
   - Then the event details should expand, and the user can see more information about that event.

**Scenario 3: User can collapse an event to hide details.**
   - Given the user is viewing a list of events with expanded event details,
   - When the user clicks on an event again,
   - Then the event details should collapse, hiding the additional information.

### Feature 3: Specify Number of Events

**Scenario 1: When user hasn’t specified a number, 32 events are shown by default.**
   - Given the user is on the event list page without specifying the number of events to display,
   - When the user opens the app,
   - Then the app should display a default of 32 events on the screen.

**Scenario 2: User can change the number of events displayed.**
   - Given the user is on the event list page,
   - When the user specifies a different number of events (e.g., 20 events) to display,
   - Then the app should load and display the specified number of events on the screen.

### Feature 4: Use the App When Offline

**Scenario 1: Show cached data when there’s no internet connection.**
   - Given the user has previously used the app while online and cached data is available,
   - When the user loses internet connectivity and opens the app,
   - Then the app should display cached data, allowing the user to access previously viewed event details and data.

**Scenario 2: Show error when user changes search settings (city, number of events).**
   - Given the user is using the app offline,
   - When the user attempts to change search settings, such as the city

 or the number of events to display,
   - Then the app should display an error message, indicating that these settings cannot be changed while offline.

### Feature 5: Add an App Shortcut to the Home Screen

**Scenario 1: User can install the meet app as a shortcut on their device home screen.**
   - Given the user is using the app,
   - When the user accesses the app's settings or options,
   - Then the user should find an option to add a shortcut to the home screen, allowing them to install the app on their device's home screen.

### Feature 6: Display Charts Visualizing Event Details

**Scenario 1: Show a chart with the number of upcoming events in each city.**
   - Given the user is viewing event details,
   - When the user accesses a chart section related to the number of upcoming events in each city,
   - Then the app should display a chart providing insights into the distribution of events across different cities.
