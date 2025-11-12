import { describe, it, expect } from 'vitest';
import { calculateDistance, findNearestCenter } from '../../utils/distance';

describe('Distance Utils', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two coordinates correctly', () => {
      // São Paulo to Rio de Janeiro (approximately 357 km)
      const distance = calculateDistance(-23.5505, -46.6333, -22.9068, -43.1729);
      expect(distance).toBeGreaterThan(350);
      expect(distance).toBeLessThan(400);
    });

    it('should return 0 for same coordinates', () => {
      const distance = calculateDistance(-23.5505, -46.6333, -23.5505, -46.6333);
      expect(distance).toBe(0);
    });

    it('should handle negative coordinates', () => {
      const distance = calculateDistance(-23.5505, -46.6333, -23.5880, -46.6396);
      expect(distance).toBeGreaterThan(0);
      expect(distance).toBeLessThan(10);
    });
  });

  describe('findNearestCenter', () => {
    const mockCenters = [
      { id: 1, name: 'Center 1', lat: -23.5505, lng: -46.6333 },
      { id: 2, name: 'Center 2', lat: -23.5880, lng: -46.6396 },
      { id: 3, name: 'Center 3', lat: -23.5629, lng: -46.6825 },
    ];

    it('should find the nearest center', () => {
      const userLocation = { lat: -23.5500, lng: -46.6330 };
      const result = findNearestCenter(userLocation, mockCenters);
      
      expect(result).toBeDefined();
      expect(result.center.id).toBe(1);
      expect(result.distance).toBeLessThan(1);
    });

    it('should return null if no centers provided', () => {
      const userLocation = { lat: -23.5500, lng: -46.6330 };
      const result = findNearestCenter(userLocation, []);
      
      expect(result).toBeNull();
    });

    it('should return null if no user location provided', () => {
      const result = findNearestCenter(null, mockCenters);
      
      expect(result).toBeNull();
    });
  });
});

