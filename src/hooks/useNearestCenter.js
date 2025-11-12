import { useState, useEffect } from 'react';
import { findNearestCenter } from '../utils/distance';

/**
 * Custom hook to find the nearest collection center to user's location
 * @param {Object} userLocation - User's location { lat, lng }
 * @param {Array} centers - Array of collection centers
 * @returns {Object} Nearest center object
 */
export const useNearestCenter = (userLocation, centers) => {
  const [nearestCenter, setNearestCenter] = useState(null);

  useEffect(() => {
    if (!userLocation || !centers || centers.length === 0) {
      setNearestCenter(null);
      return;
    }

    const result = findNearestCenter(userLocation, centers);
    if (result) {
      setNearestCenter(result.center);
    }
  }, [userLocation, centers]);

  return nearestCenter;
};

