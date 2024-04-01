import L from 'leaflet';

const iconPerson = L.Icon({
 
    iconUrl: require('../images/poubelle.png'),
    iconRetinaUrl: require('../images/poubelle.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
  
});
export { iconPerson };
