export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const toRad = (value) => {
  return (value * Math.PI) / 180;
};

export const findNearestCenter = (userLocation, centers) => {
  if (!userLocation || !centers || centers.length === 0) {
    return null;
  }

  let nearest = centers[0];
  let minDistance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    centers[0].lat,
    centers[0].lng
  );

  centers.forEach((center) => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      center.lat,
      center.lng
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearest = center;
    }
  });

  return { center: nearest, distance: minDistance };
};
