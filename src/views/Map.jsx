import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Polyline, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {useRoute} from '../components/hooks/routeHooks';

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
  const coordinates = [];

  if (route && Array.isArray(route)) {
    route.forEach((legGroup) => {
      if (Array.isArray(legGroup) && legGroup.length > 0) {
        const leg = legGroup[0];

        if (leg.decodedPoints && Array.isArray(leg.decodedPoints)) {
          leg.decodedPoints.forEach((point) => {
            if (Array.isArray(point) && point.length === 2) {
              coordinates.push([point[0], point[1]]);
            }
          });
        }
      }
    });
  }
  return position ? (
    <MapContainer
      center={position}
      zoom={12}
      style={{height: '400px', width: '100%'}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position} />
      <SetViewOnLocation position={position} />

      {coordinates.length > 0 && (
        <>
          {/*  */}
          <Marker position={coordinates[coordinates.length - 1]} />
          <Polyline positions={coordinates} color="red" />
        </>
      )}
    </MapContainer>
  ) : (
    <p>Loading map...</p>
  );
}
