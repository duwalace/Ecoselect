import React, { useEffect, useRef } from 'react';
import './CollectionCenterInfo.css';

const CollectionCenterInfo = ({ center, distance, onClose }) => {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  if (!center) return null;

  // Focus trap and keyboard support
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTab = (e) => {
      if (e.key === 'Tab' && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus close button when panel opens
    closeButtonRef.current?.focus();

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [onClose]);

  return (
    <div 
      className="info-panel" 
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="center-name"
    >
      <div className="info-header">
        <h2 id="center-name">{center.name}</h2>
        <button 
          ref={closeButtonRef}
          className="close-btn" 
          onClick={onClose} 
          aria-label="Fechar painel"
          title="Fechar (Esc)"
        >
          ×
        </button>
      </div>
      
      <div className="info-content">
        {distance !== undefined && (
          <div className="distance-badge" role="status">
            <span className="distance-icon" aria-hidden="true">📍</span>
            <span>{distance.toFixed(2)} km de distância</span>
          </div>
        )}

        <div className="info-section">
          <h3>
            <span aria-hidden="true">📍</span>
            <span className="visually-hidden">Localização</span> Endereço
          </h3>
          <p>{center.address}</p>
        </div>

        {center.phone && (
          <div className="info-section">
            <h3>
              <span aria-hidden="true">📞</span>
              <span className="visually-hidden">Contato</span> Telefone
            </h3>
            <p>
              <a href={`tel:${center.phone.replace(/\D/g, '')}`} className="contact-link">
                {center.phone}
              </a>
            </p>
          </div>
        )}

        {center.email && (
          <div className="info-section">
            <h3>
              <span aria-hidden="true">✉️</span>
              <span className="visually-hidden">Email</span> Contato
            </h3>
            <p>
              <a href={`mailto:${center.email}`} className="contact-link">
                {center.email}
              </a>
            </p>
          </div>
        )}

        <div className="info-section">
          <h3>
            <span aria-hidden="true">🕒</span>
            <span className="visually-hidden">Horário</span> Horário de Funcionamento
          </h3>
          <div className="hours-list" role="list">
            <p className="hours-item" role="listitem">{center.operatingHours.weekdays}</p>
            <p className="hours-item" role="listitem">{center.operatingHours.saturday}</p>
            <p className="hours-item" role="listitem">{center.operatingHours.sunday}</p>
          </div>
        </div>

        <div className="info-section">
          <h3>
            <span aria-hidden="true">♻️</span>
            <span className="visually-hidden">Recicláveis</span> Materiais Aceitos
          </h3>
          <div className="materials-list" role="list" aria-label="Materiais aceitos">
            {center.acceptedMaterials.map((material, index) => (
              <span key={index} className="material-tag" role="listitem">{material}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CollectionCenterInfo);
