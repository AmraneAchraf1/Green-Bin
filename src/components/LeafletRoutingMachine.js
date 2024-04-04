import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import { color } from "framer-motion";
const LeafletRoutingMachine = ({ currentP, nearsetP }) => {
  const map = useMap();
  useEffect(() => {
    L.Routing.control({
      waypoints: [L.latLng(currentP), L.latLng(nearsetP)],

      routeWhileDragging: false,
      show: false, // Hide markers
      routeDragInterval: false,
      draggableWaypoints: false,

      lineOptions: {
        styles: [
          {
            color: "green",
            weight: 4,
          },
        ],
      },
    }).addTo(map);
  }, []);
  return null;
};
export default LeafletRoutingMachine;
