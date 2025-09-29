import { React, useEffect, useState } from 'react';
import { APIProvider, useMapsLibrary} from'@vis.gl/react-google-maps';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';


const iconLocation = L.icon({
  iconUrl: require('../includes/icon-location.png'),
  iconAnchor: null,
  shadowAnchor: null,
  shadowSize: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon',
});


function Map({datos}) {
  const position = [6.1687825, -75.3392373];
  const API = '35b063d52feb40aa8fd297cf43368586';
  const direccion = datos[0].direccion;
  const ciudad = datos[0].ciudad;
  return (
    <MapContainer
      center={position}
      zoom={15}
    >
      <TileLayer
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href"https://www.openstreetmap.org/copyright">OpenStreetMap<a/> contributors' />

      <Marker position={position} icon={iconLocation} >

        <Popup>Casa de {datos[0].nombre_mascota}</Popup>
      </Marker>
      <Circle
        center={position}
        pathOptions={{ fillColor: 'blue' }}
        radius={300}
      />
    </MapContainer>

  );
}










export default Map;