import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MARKER_ICONS, MARKER_SIZES, MAP_TILE_URL, MAP_ATTRIBUTION } from '../constants/map';
import './Map.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const userIcon = new L.Icon({
  iconUrl: MARKER_ICONS.user,
  shadowUrl: MARKER_ICONS.shadow,
  ...MARKER_SIZES.standard
});

const centerIcon = new L.Icon({
  iconUrl: MARKER_ICONS.center,
  shadowUrl: MARKER_ICONS.shadow,
  ...MARKER_SIZES.standard
});

const nearestIcon = new L.Icon({
  iconUrl: MARKER_ICONS.nearest,
  shadowUrl: MARKER_ICONS.shadow,
  ...MARKER_SIZES.nearest
});

const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const Map = ({ centers, userLocation, nearestCenter, onCenterSelect, initialZoom = 13 }) => {
  const defaultCenter = [-23.5505, -46.6333];
  const mapCenter = userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter;
  const zoom = userLocation ? initialZoom : 12;

  return (
    <div className="map-wrapper">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        className="map-container"
      >
        <MapController center={mapCenter} zoom={zoom} />
        <TileLayer
          attribution={MAP_ATTRIBUTION}
          url={MAP_TILE_URL}
        />
        
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <strong>Sua Localização</strong>
            </Popup>
          </Marker>
        )}
        
        {centers.map((center) => {
          const isNearest = nearestCenter && center.id === nearestCenter.id;
          return (
            <Marker
              key={center.id}
              position={[center.lat, center.lng]}
              icon={isNearest ? nearestIcon : centerIcon}
              eventHandlers={{
                click: () => onCenterSelect(center)
              }}
            >
              <Popup>
                <div className="popup-content">
                  <strong>{center.name}</strong>
                  {isNearest && <div className="nearest-badge">Centro Mais Próximo</div>}
                  <p style={{ margin: '8px 0 4px 0', fontSize: '0.9rem' }}>{center.address}</p>
                  <button 
                    className="popup-btn"
                    onClick={() => onCenterSelect(center)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default React.memo(Map);
