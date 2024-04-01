// routingService.js

// Function to find the nearest position using OpenStreetMap Nominatim API
export const findNearestPosition =  (currentPosition, bins) => {
  let minDistance = Number.MAX_VALUE;
  let nearestPos = null;
  
  bins.forEach(bin => {
      const distance = calculateDistance(currentPosition,bin);
      if (distance < minDistance) {
          minDistance = distance;
          nearestPos = bin;
      }
  });
  return nearestPos;
  };
  
  
// find the 5 nearest bin position
export const findNearestBinPositions = (currentPosition, binPositions) => {

    const distances = binPositions.map(binPosition => {
    const distance = calculateDistance(currentPosition, binPosition);
    return { position: binPosition.position, distance };
  });

// Sort bin positions by distance
  distances.sort((a, b) => a.distance - b.distance);

S// Return the 5 nearest bin positions
  return distances.slice(0, 5);
};

const calculateDistance = (point1, point2) => {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
    return distance;
};

const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
};
 