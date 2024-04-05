import React, { useEffect ,useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet CSS
import '../../styles/resident/map.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import LeafletRoutingMachine from '../../components/LeafletRoutingMachine';
import { useSelector } from 'react-redux';
import { binSelectors,userSelectors } from '../../store/selectors'

function Mapc({ bins, order }) {
  const binsData = useSelector(state => state.bins.data);
  const userLocation = useSelector(userSelectors);
  
  const customIcon = L.icon({
    iconUrl: require('../../images/poubelle.png'),
    iconSize: [30, 30], // Width and height of the icon
  });
  const currentIcon= L.icon({
    iconUrl: require("../../images/emplacement.png"),
    iconSize: [30, 30], // Width and height of the icon
  });

  // Define a function to draw the route between bins
  const drawRoute = (map) => {
    if (!binsData || binsData.length === 0 || !order || order.length === 0) return;

    const waypoints = order.map(index => binsData[index]);
    L.Routing.control({
      waypoints,
      routeWhileDragging: true
    }).addTo(map);
  }

  // Custom hook to access the Leaflet map instance
  function SetViewOnClick({ coords }) {
    const map = useMap();
    useEffect(() => {
      if (coords && coords.length === 2) {
        map.setView(coords, 13);
        drawRoute(map);
      }
    }, [map, coords]);
    return null;
  }

  return (
    <MapContainer center={[34.06650110272195, -6.761945197993995]} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {binsData.map((bin, index) => (
        <div key={index}>
          <Marker position={bin} icon={customIcon}>
            <Popup>{bin}</Popup>
          </Marker>
        </div>
      ))}
      {userLocation && <Marker position={userLocation} icon={currentIcon}></Marker>}
      <SetViewOnClick coords={userLocation} />
    </MapContainer>
  )
}

export default Mapc;
