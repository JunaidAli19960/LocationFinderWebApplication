# Location Finder Web Application

## Overview

The **Location Finder Web Application** is a React-based project that allows users to search for specific locations or types of places (e.g., restaurants, parks, libraries) on a map. This app leverages the **OpenStreetMap** and **Overpass API** to provide location-based data, allowing users to search for nearby places and view them on an interactive map. 

Users can:
- Search for a location using a search bar.
- Display their current location on the map.
- Search for nearby places (e.g., restaurants) within a specified radius of their current location.
- Filter results by specific types of places or cuisine (e.g., Italian, Halal).
- View results either as pins on the map or as a list of places.

## Features

- **Interactive Map**: A fully interactive map built using **Leaflet** and **OpenStreetMap**, allowing users to search for locations and display nearby places.
- **Location Search**: Users can search for any location via a search bar and see it marked on the map.
- **Show My Location**: A button that allows users to display their current location on the map, using browser geolocation.
- **Nearby Places Search**: Users can search for nearby places such as restaurants, parks, libraries, or hospitals, and filter results by specific types (e.g., French restaurants, Halal food).
- **Customizable Search Radius**: Users can specify the search radius (e.g., within 1km, 5km) to adjust how far the search extends.
- **Search Results**: Results are displayed either as pins on the map or as a list, where users can click to pin a location.

## Technologies Used

- **Frontend**: React, Leaflet
- **Backend**: Flask (for server communication if necessary)
- **APIs**: OpenStreetMap, Overpass API (for retrieving map and location data)

## Setup Instructions

### Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Python](https://www.python.org/) (if using Flask for backend)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/location-finder-app.git
   cd location-finder-app
   ```

2. **Install frontend dependencies**:

   ```bash
   cd my-app
   npm install
   ```

3. **Run the React application**:

   ```bash
   npm start
   ```

4. **Optional: Run the Flask backend** (if applicable):

   If you're using Flask for backend communication, navigate to the Flask app directory and run:

   ```bash
   python app.py
   ```

### API Keys

This application currently uses OpenStreetMap and Overpass API, which are open-source and free, so no API key setup is required.

### Usage

- **Search for a location**: Use the search bar to enter a location name (e.g., "New York") and press the **Search** button. The map will focus on that location and place a marker.
- **Show current location**: Press the **Show My Location** button to display your current location on the map.
- **Search for nearby places**: Press the **Search Nearby Places** button after entering a place type or restaurant cuisine (e.g., "Italian", "Halal"). You can also adjust the search radius.
- **View results**: Results are displayed as markers on the map. If there are multiple results, a list will also show the place details.

## Future Enhancements

- Extend the search to include more types of locations (e.g., hospitals, schools).
- Implement additional filters for better search refinement.
- Allow users to save favorite locations or search history.
