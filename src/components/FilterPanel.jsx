import React, { useState, useMemo } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ centers, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // Extract all unique materials from centers
  const allMaterials = useMemo(() => {
    const materials = new Set();
    centers.forEach(center => {
      center.acceptedMaterials.forEach(material => materials.add(material));
    });
    return Array.from(materials).sort();
  }, [centers]);

  const handleMaterialToggle = (material) => {
    const newSelected = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    
    setSelectedMaterials(newSelected);
    onFilterChange(newSelected);
  };

  const handleClearFilters = () => {
    setSelectedMaterials([]);
    onFilterChange([]);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`filter-panel ${isOpen ? 'open' : ''}`}>
      <button 
        className="filter-toggle-btn"
        onClick={togglePanel}
        aria-label={isOpen ? 'Fechar filtros' : 'Abrir filtros'}
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">🔍</span>
        <span>Filtrar por Material</span>
        {selectedMaterials.length > 0 && (
          <span className="filter-count" aria-label={`${selectedMaterials.length} filtros ativos`}>
            {selectedMaterials.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="filter-content" role="region" aria-label="Filtros de material">
          <div className="filter-header">
            <h3>Filtrar por Material</h3>
            {selectedMaterials.length > 0 && (
              <button 
                className="clear-filters-btn"
                onClick={handleClearFilters}
                aria-label="Limpar todos os filtros"
              >
                Limpar Tudo
              </button>
            )}
          </div>
          
          <div className="filter-options" role="group" aria-label="Opções de material">
            {allMaterials.map(material => (
              <label key={material} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() => handleMaterialToggle(material)}
                  aria-label={`Filtrar por ${material}`}
                />
                <span className="checkbox-custom"></span>
                <span className="material-name">{material}</span>
              </label>
            ))}
          </div>

          {selectedMaterials.length > 0 && (
            <div className="active-filters">
              <p className="active-filters-label">Filtros ativos:</p>
              <div className="active-filter-tags">
                {selectedMaterials.map(material => (
                  <button
                    key={material}
                    className="active-filter-tag"
                    onClick={() => handleMaterialToggle(material)}
                    aria-label={`Remover filtro ${material}`}
                  >
                    {material}
                    <span aria-hidden="true">×</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(FilterPanel);

