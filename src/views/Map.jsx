import React, {useEffect, useState, useRef} from 'react';
import {MapContainer, TileLayer, Marker, Polyline, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {useRoute} from '../components/hooks/routeHooks';

import locationIconUrl from '../assets/icons/location.svg';
import destinationIconUrl from '../assets/icons/destination.svg';
import carIconUrl from '../assets/icons/car.svg';
import MapInfo from '../components/MapInfo';

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

const carIcon = new L.Icon({
  iconUrl: carIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function FitMapToRoute({coordinates}) {
  const map = useMap();

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, {padding: [20, 20]});
    }
  }, [map, coordinates]);

  return null;
}

export function Map() {
  const [position, setPosition] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);
  const destination = [60.2055, 24.6559];
  const carMarkerRef = useRef(null);

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

  useEffect(() => {
    if (!routesCoordinates.length || !carMarkerRef.current) return;

    const latlngs = routesCoordinates[0].map(([lat, lng]) =>
      L.latLng(lat, lng),
    );
    if (!latlngs.length) return;

    let index = 0;
    let nextIndex = 1;
    let startTime = null;
    const speed = 100;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const p1 = latlngs[index];
      const p2 = latlngs[nextIndex];
      const distance = p1.distanceTo(p2);
      const duration = (distance / speed) * 1000;

      if (elapsed < duration) {
        const ratio = elapsed / duration;
        const lat = p1.lat + (p2.lat - p1.lat) * ratio;
        const lng = p1.lng + (p2.lng - p1.lng) * ratio;
        if (carMarkerRef.current) {
          carMarkerRef.current.setLatLng([lat, lng]);
        }
        requestAnimationFrame(animate);
      } else {
        carMarkerRef.current?.setLatLng(p2);
        index = nextIndex;
        nextIndex = (nextIndex + 1) % latlngs.length;
        startTime = null;
        requestAnimationFrame(animate);
      }
    }

    carMarkerRef.current.setLatLng(latlngs[0]);
    requestAnimationFrame(animate);
  }, [routesCoordinates]);

  return position ? (
    <>
      <div className="flex flex-row justify-center align-middle">
        <MapContainer
          className="m-4.5 rounded-2xl border-2 border-amber-300 shadow-2xs shadow-amber-500"
          center={position}
          zoom={12}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          touchZoom={false}
          zoomControl={false}
          style={{
            height: '400px',
            width: '70%',
            zIndex: '1',
            opacity: 0.75,
            pointerEvents: 'none',
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={position} icon={locationIcon} />

          {routesCoordinates.length > 0 ? (
            <>
              <Polyline positions={routesCoordinates[0]} color="red" />
              <Marker position={destination} icon={destinationIcon} />
              <Marker
                position={routesCoordinates[0][0]}
                icon={carIcon}
                ref={carMarkerRef}
              />
              <FitMapToRoute coordinates={routesCoordinates[0]} />
            </>
          ) : loading ? (
            <p>Loading route...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : null}
        </MapContainer>
      </div>
      <MapInfo position={position} destination={destination} />
    </>
  ) : (
    <p>Loading map...</p>
  );
}
