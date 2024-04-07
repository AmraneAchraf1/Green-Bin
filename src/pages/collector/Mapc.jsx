import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Make sure to import Leaflet CSS
import "../../styles/resident/map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LeafletRoutingMachinec from "./LeafletRoutingMachinec";
import { prevar } from "./OptPre";

import axios from "axios";
import { useSelector } from "react-redux";
import { userSelectors } from "../../store/selectors";

function Mapc({ shouldRenderMarker }) {
  const [binsInfo, setBinsInfo] = useState([]);
  const userLocation = useSelector(userSelectors);
  const [opt,setOpt] = useState([]);
  const [way,setWay] = useState([]);

  const customIcon = L.icon({
    iconUrl: require("../../images/poubelle.png"),
    iconSize: [30, 30], // Width and height of the icon
  });
  const currentIcon = L.icon({
    iconUrl: require("../../images/emplacement.png"),
    iconSize: [30, 30], // Width and height of the icon
  });

  useEffect(() => {
    getBins();
  }, []);

  const getBins = () => {
    axios
      .get(`http://localhost:8000/api/bins`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer 12|2stEoziOCwxtXxQkFjTlJXxdmzHiLyCDs45yukaNd7d70344",
        },
      })
      .then((res) => {
        setBinsInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const optimizeRoute = async () => {
    const { distanceMatrix, timeMatrix, sizeMatrix } = prevar(binsInfo);
    const parameters = [1, 1, 1, 1, 0.1];
    const numIterations = 100;
    const numRuns = 20;

    try {
      const res = await axios.post(`http://localhost:8000/api/optimize`, {
        distanceMatrix,
        garbageSize: sizeMatrix,
        timeMatrix,
        truckCapacity: 1000,
        parameters,
        numIterations,
        numRuns
      });
      
      const optimizedRoute = res.data;
      setOpt(optimizedRoute);
      console.log("Optimized Route:", optimizedRoute);
    } catch (error) {
      console.error("Error optimizing route:", error);
    }
  };


  const calculateWaypoints = () => {
    // Calculate waypoints based on bins' positions
    optimizeRoute();
    // [0,3,2,1,0]
    const optf = opt
    const waypoints = [];
    for (let i = 0; i < optf.length -1; i++) {
      waypoints.unshift(L.latLng(binsInfo[optf[i]].latitude, binsInfo[optf[i]].longitude));
    }

    //const waypoints = binsInfo.map((bin) => L.latLng(bin.latitude, bin.longitude));
    // if (userLocation) {
    //   waypoints.unshift(L.latLng(userLocation[0], userLocation[1]));
    // }
    console.log(waypoints)
    
    return waypoints;
  };

  

  return (
    <MapContainer
      center={[34.06650110272195, -6.761945197994005]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {binsInfo.map((bin, index) => (
        <div key={index}>
          <Marker position={[bin.latitude, bin.longitude]} icon={customIcon}>
            <Popup>{bin.address}</Popup>
          </Marker>
        </div>
      ))}
      {shouldRenderMarker && userLocation !== null && (
        <Marker position={userLocation} icon={currentIcon}></Marker>
      )}
      {binsInfo.length > 0 && calculateWaypoints().length > 0 &&(
        <LeafletRoutingMachinec
          waypoints={calculateWaypoints()}
          // currentP={userLocation}
        />
      )}
    </MapContainer>
  );
}

export default Mapc;