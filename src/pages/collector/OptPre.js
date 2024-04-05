const calcudis = (lat1, lon1, lat2, lon2) => {

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;

};



function calculateTime(distance) {
    const averageSpeed = 40; 
    const time = distance / averageSpeed; 
    return time;
}

export const prevar = (bins) =>{
    const distanceMatrix = [];
    const timeMatrix = [];
    const sizeMatix = [];
    for (let i = 0; i < bins.length; i++) {
        const rowDistance = [];
        const rowTime = [];
        for (let j = 0; j < bins.length; j++) {
            if (i === j) {
                rowDistance.push(0);
                rowTime.push(0);
            } else {
                const distance = calcudis(bins[i].lat, bins[i].lng, bins[j].lat, bins[j].lng);
                const time = calculateTime(distance);
                rowDistance.push(distance);
                rowTime.push(time);
            }
        }
        sizeMatix.push(bins[i].size)
        distanceMatrix.push(rowDistance);
        timeMatrix.push(rowTime);

    }

    return {distanceMatrix, timeMatrix, sizeMatix}
}