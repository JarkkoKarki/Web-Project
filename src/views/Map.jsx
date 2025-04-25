import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function SetViewOnLocation({position}) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [map, position]);
  return null;
}

export function MapContent() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error('Location error:', err);
      },
    );
  }, []);

  return (
    <MapContainer
      center={[50.5, 30.5]}
      zoom={5}
      style={{height: '400px', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && <Marker position={position} />}
      <SetViewOnLocation position={position} />
    </MapContainer>
  );
}

function MyComponent() {
  const map = useMap();
  console.log('map center:', map.getCenter());
  return null;
}

export function Map() {
  return (
    <MapContainer
      center={[50.5, 30.5]}
      zoom={13}
      style={{height: '400px', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MyComponent />
    </MapContainer>
  );
}
