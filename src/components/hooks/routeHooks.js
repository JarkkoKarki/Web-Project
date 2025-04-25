import {useEffect, useState} from 'react';

export function useRoute(apiUrl) {
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiUrl) return;

    async function fetchRoute() {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setRoute(data.decodedLegs || []);
      } catch (err) {
        console.error('Failed to fetch route:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRoute();
  }, [apiUrl]);

  return {route, loading, error};
}
