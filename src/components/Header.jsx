import React from 'react';
import './Header.css';

const Header = ({ error, locationLoading, userCity }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <span className="logo-icon" aria-hidden="true">♻️</span>
          <h1>ECOSELECT</h1>
        </div>
        <p className="tagline">
          Encontre Centros de Coleta Seletiva Próximos a Você
          {userCity && <span className="user-city"> • {userCity}</span>}
        </p>
      </div>
      
      {error && (
        <div className="error-banner" role="alert" aria-live="polite">
          <span className="error-icon" aria-hidden="true">⚠️</span>
          <span>{error}</span>
        </div>
      )}
      
      {locationLoading && (
        <div className="loading-banner" role="status" aria-live="polite">
          <span className="loading-spinner" aria-hidden="true">⟳</span>
          <span>Obtendo sua localização...</span>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
