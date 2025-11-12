/**
 * Map configuration constants
 */

// Default map center (São Paulo city center)
export const DEFAULT_MAP_CENTER = [-23.5505, -46.6333];

// Default zoom levels
export const DEFAULT_ZOOM = 13;
export const DEFAULT_ZOOM_WITHOUT_LOCATION = 12;

// Geolocation API options
export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

// Map tile attribution
export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const MAP_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Marker icon URLs
export const MARKER_ICONS = {
  user: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  center: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  nearest: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadow: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
};

// Marker sizes
export const MARKER_SIZES = {
  standard: {
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  },
  nearest: {
    iconSize: [30, 49],
    iconAnchor: [15, 49],
    popupAnchor: [1, -40],
    shadowSize: [41, 41]
  }
};

