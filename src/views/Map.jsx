import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Polyline, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {useRoute} from '../components/hooks/routeHooks';

import locationIconUrl from '../assets/icons/location.svg';
import destinationIconUrl from '../assets/icons/destination.svg';

const locationIcon = new L.Icon({
  iconUrl: locationIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const destinationIcon = new L.Icon({
  iconUrl: destinationIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

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

export function Map() {
  const [position, setPosition] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);
  const destination = [60.2055, 24.6559];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = [pos.coords.latitude, pos.coords.longitude];
        setPosition(origin);

        const base = 'http://10.120.32.87/app/api/route/legs/';
        const fullUrl = `${base}${origin[0]}/${origin[1]}/${destination[0]}/${destination[1]}`;
        setApiUrl(fullUrl);
      },
      (err) => {
        console.error('Location error:', err);
      },
    );
  }, []);

  const {route, loading, error} = useRoute(apiUrl);
  if (loading) {
    return <p>Loading route...</p>;
  }

  if (error) {
    return <p>Error fetching route: {error.message}</p>;
  }
  const routesCoordinates = [];

  if (route && Array.isArray(route)) {
    const firstGroup = route[0];

    if (Array.isArray(firstGroup)) {
      const groupCoordinates = [];

      firstGroup.forEach((leg) => {
        if (leg.decodedPoints && Array.isArray(leg.decodedPoints)) {
          leg.decodedPoints.forEach((point) => {
            if (Array.isArray(point) && point.length === 2) {
              groupCoordinates.push([point[0], point[1]]);
            }
          });
        }
      });

      if (groupCoordinates.length > 0) {
        routesCoordinates.push(groupCoordinates);
      }
    }
  }

  return position ? (
    <MapContainer
      center={position}
      zoom={12}
      style={{height: '400px', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position} icon={locationIcon} />
      <SetViewOnLocation position={position} />

      {routesCoordinates.length > 0 && (
        <>
          <Polyline positions={routesCoordinates[0]} color="red" />
          <Marker position={destination} icon={destinationIcon} />
        </>
      )}
    </MapContainer>
  ) : (
    <p>Loading map...</p>
  );
}
