const express = require('express');
const cors = require('cors');
const centersData = require('./data/centers.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all collection centers
app.get('/api/centers', (req, res) => {
  try {
    res.json({
      success: true,
      data: centersData,
      count: centersData.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch collection centers'
    });
  }
});

// Get centers by city
app.get('/api/centers/city/:city', (req, res) => {
  try {
    const { city } = req.params;
    const cityNormalized = city.toLowerCase().trim();
    
    const filteredCenters = centersData.filter(center => 
      center.city.toLowerCase().includes(cityNormalized)
    );

    res.json({
      success: true,
      data: filteredCenters,
      count: filteredCenters.length,
      city: city
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch centers by city'
    });
  }
});

// Get centers by coordinates (nearby)
app.get('/api/centers/nearby', (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        error: 'Latitude and longitude are required'
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const maxRadius = parseFloat(radius);

    // Haversine formula to calculate distance
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const toRad = (value) => (value * Math.PI) / 180;

    // Filter and sort by distance
    const centersWithDistance = centersData.map(center => ({
      ...center,
      distance: calculateDistance(userLat, userLng, center.lat, center.lng)
    }));

    const nearbyCenters = centersWithDistance
      .filter(center => center.distance <= maxRadius)
      .sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      data: nearbyCenters,
      count: nearbyCenters.length,
      userLocation: { lat: userLat, lng: userLng },
      radius: maxRadius
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby centers'
    });
  }
});

// Get centers by material
app.get('/api/centers/material/:material', (req, res) => {
  try {
    const { material } = req.params;
    const materialNormalized = material.toLowerCase().trim();
    
    const filteredCenters = centersData.filter(center => 
      center.acceptedMaterials.some(m => 
        m.toLowerCase().includes(materialNormalized)
      )
    );

    res.json({
      success: true,
      data: filteredCenters,
      count: filteredCenters.length,
      material: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch centers by material'
    });
  }
});

// Get single center by ID
app.get('/api/centers/:id', (req, res) => {
  try {
    const { id } = req.params;
    const center = centersData.find(c => c.id === parseInt(id));

    if (!center) {
      return res.status(404).json({
        success: false,
        error: 'Collection center not found'
      });
    }

    res.json({
      success: true,
      data: center
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch collection center'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'ECOSELECT API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ECOSELECT API server running on http://localhost:${PORT}`);
  console.log(`📍 Collection centers loaded: ${centersData.length}`);
});

module.exports = app;

