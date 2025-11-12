import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * API Service for ECOSELECT
 */
export const centersAPI = {
  /**
   * Get all collection centers
   */
  getAll: async () => {
    try {
      const response = await apiClient.get('/centers');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch collection centers');
    }
  },

  /**
   * Get centers by city
   * @param {string} city - City name
   */
  getByCity: async (city) => {
    try {
      const response = await apiClient.get(`/centers/city/${encodeURIComponent(city)}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch centers for city: ${city}`);
    }
  },

  /**
   * Get nearby centers based on coordinates
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} radius - Search radius in km (default: 10)
   */
  getNearby: async (lat, lng, radius = 10) => {
    try {
      const response = await apiClient.get('/centers/nearby', {
        params: { lat, lng, radius }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch nearby centers');
    }
  },

  /**
   * Get centers by material
   * @param {string} material - Material type
   */
  getByMaterial: async (material) => {
    try {
      const response = await apiClient.get(`/centers/material/${encodeURIComponent(material)}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch centers for material: ${material}`);
    }
  },

  /**
   * Get single center by ID
   * @param {number} id - Center ID
   */
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/centers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch center with ID: ${id}`);
    }
  },

  /**
   * Health check
   */
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  }
};

/**
 * Geocoding service to get city from coordinates
 * Using OpenStreetMap Nominatim (free, no API key required)
 */
export const geocodingAPI = {
  /**
   * Reverse geocode: Get address from coordinates
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   */
  reverseGeocode: async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon: lng,
            format: 'json',
            addressdetails: 1,
          },
          headers: {
            'User-Agent': 'ECOSELECT App'
          }
        }
      );
      
      return {
        city: response.data.address?.city || 
              response.data.address?.town || 
              response.data.address?.municipality ||
              response.data.address?.village ||
              'Unknown',
        state: response.data.address?.state || '',
        country: response.data.address?.country || '',
        displayName: response.data.display_name || '',
        fullAddress: response.data.address
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error('Failed to get city from coordinates');
    }
  },

  /**
   * Forward geocode: Get coordinates from address
   * @param {string} address - Address string
   */
  forwardGeocode: async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: address,
            format: 'json',
            addressdetails: 1,
            limit: 1
          },
          headers: {
            'User-Agent': 'ECOSELECT App'
          }
        }
      );

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        return {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          displayName: result.display_name,
          address: result.address
        };
      }
      
      throw new Error('Address not found');
    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error('Failed to get coordinates from address');
    }
  }
};

export default apiClient;

