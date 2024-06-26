import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Make sure to import Leaflet CSS
import "../styles/resident/map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
import { useSelector } from "react-redux";
import { userSelectors } from "../store/selectors";
//import {  iconPerson  } from './IconPerson';
function Map({ nearsetPosition, shouldRenderMarker,currentP }) {
  const binsData = useSelector((state) => state.bins.data);
  const userLocation = useSelector(userSelectors);
  //const nearestPoint = [32.886023, -6.9208655];

  const customIcon = L.icon({
    iconUrl: require("../images/poubelle.png"),
    iconSize: [30, 30], // Width and height of the icon
  });
  const currentIcon = L.icon({
    iconUrl: require("../images/emplacement.png"),
    iconSize: [30, 30], // Width and height of the icon
  });

  const drowRoute = () => {
    console.log("drow");
    console.log(userLocation);
    console.log(nearsetPosition);
  };

  /**/
  return (
    <MapContainer
      center={currentP}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/*{!test && (drawRoute(nearsetPosition))}*/}
      {binsData.map((bin, index) => (
        <div key={index}>
          <Marker position={bin} icon={customIcon}>
            <Popup>{bin}</Popup>
          </Marker>
        </div>
      ))}
      {shouldRenderMarker && userLocation !== null && (
        <Marker position={userLocation} icon={currentIcon}></Marker>
      )}
      {nearsetPosition && (
        <LeafletRoutingMachine
          currentP={userLocation}
          nearsetP={nearsetPosition}
        />
      )}
    </MapContainer>
  );
}

export default Map;
