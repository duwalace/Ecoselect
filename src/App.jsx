import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import CollectionCenterInfo from './components/CollectionCenterInfo';
import FilterPanel from './components/FilterPanel';
import DarkModeToggle from './components/DarkModeToggle';
import { centersAPI, geocodingAPI } from './services/api';
import { calculateDistance } from './utils/distance';
import { useGeolocation } from './hooks/useGeolocation';
import { useNearestCenter } from './hooks/useNearestCenter';
import { useDarkMode } from './hooks/useDarkMode';
import './App.css';

function App() {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [filterMaterials, setFilterMaterials] = useState([]);
  const [centers, setCenters] = useState([]);
  const [centersLoading, setCentersLoading] = useState(true);
  const [centersError, setCentersError] = useState(null);
  const [userCity, setUserCity] = useState(null);
  const [mapZoom, setMapZoom] = useState(13);
  
  // Use custom hooks
  const { location: userLocation, error: locationError, loading: locationLoading } = useGeolocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  // Fetch centers from API
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setCentersLoading(true);
        setCentersError(null);
        const response = await centersAPI.getAll();
        setCenters(response.data || []);
      } catch (err) {
        console.error('Error fetching centers:', err);
        setCentersError('Falha ao carregar centros de coleta. Por favor, tente novamente mais tarde.');
      } finally {
        setCentersLoading(false);
      }
    };

    fetchCenters();
  }, []);

  // Get city from user location and filter centers
  useEffect(() => {
    const getUserCity = async () => {
      if (!userLocation) return;

      try {
        // Get city from coordinates
        const cityData = await geocodingAPI.reverseGeocode(
          userLocation.lat,
          userLocation.lng
        );
        
        setUserCity(cityData.city);
        console.log('📍 User city detected:', cityData.city);

        // Fetch centers for user's city
        if (cityData.city && cityData.city !== 'Unknown') {
          try {
            const response = await centersAPI.getNearby(
              userLocation.lat,
              userLocation.lng,
              20 // 20km radius
            );
            
            if (response.data && response.data.length > 0) {
              setCenters(response.data);
              // Adjust zoom based on number of centers
              setMapZoom(response.data.length > 5 ? 12 : 13);
            }
          } catch (err) {
            console.error('Error fetching nearby centers:', err);
            // Keep all centers if nearby search fails
          }
        }
      } catch (err) {
        console.error('Error getting city:', err);
      }
    };

    getUserCity();
  }, [userLocation]);
  
  // Filter centers based on selected materials
  const filteredCenters = useMemo(() => {
    if (filterMaterials.length === 0) {
      return centers;
    }
    return centers.filter(center =>
      filterMaterials.every(material =>
        center.acceptedMaterials.includes(material)
      )
    );
  }, [filterMaterials, centers]);
  
  const nearestCenter = useNearestCenter(userLocation, filteredCenters);

  // Auto-select nearest center when found
  useEffect(() => {
    if (nearestCenter && !selectedCenter) {
      setSelectedCenter(nearestCenter);
    }
  }, [nearestCenter, selectedCenter]);

  const handleFilterChange = (materials) => {
    setFilterMaterials(materials);
    // Clear selection when filters change
    setSelectedCenter(null);
  };

  // Combine errors
  const error = locationError || centersError;

  const handleCenterSelect = (center) => {
    setSelectedCenter(center);
  };

  const handleCloseInfo = () => {
    setSelectedCenter(null);
  };

  const getDistanceToCenter = (center) => {
    if (!userLocation || !center) return undefined;
    return calculateDistance(
      userLocation.lat,
      userLocation.lng,
      center.lat,
      center.lng
    );
  };

  const isLoading = locationLoading || centersLoading;

  return (
    <div className="app">
      <Header 
        error={error} 
        locationLoading={isLoading} 
        userCity={userCity}
      />
      {!centersLoading && centers.length > 0 && (
        <FilterPanel 
          centers={centers}
          onFilterChange={handleFilterChange}
        />
      )}
      {centersLoading ? (
        <div className="loading-container">
          <div className="loading-spinner-large">⟳</div>
          <p>Carregando centros de coleta...</p>
        </div>
      ) : centers.length === 0 ? (
        <div className="no-data-container">
          <p>Nenhum centro de coleta encontrado na sua área.</p>
          <p>Tente ajustar sua localização ou volte mais tarde.</p>
        </div>
      ) : (
        <Map
          centers={filteredCenters}
          userLocation={userLocation}
          nearestCenter={nearestCenter}
          onCenterSelect={handleCenterSelect}
          initialZoom={mapZoom}
        />
      )}
      {selectedCenter && (
        <CollectionCenterInfo
          center={selectedCenter}
          distance={getDistanceToCenter(selectedCenter)}
          onClose={handleCloseInfo}
        />
      )}
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
    </div>
  );
}

export default App;
