import React, {useState, useEffect} from 'react';

function Modal({routeData, onClose}) {
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  if (!routeData || !routeData.edges) {
    return <div>Loading route data...</div>;
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="max-h-[80vh] w-1/2 overflow-y-auto rounded-lg bg-neutral-700 p-6 shadow-lg">
        <button
          onClick={onClose}
          className="rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        >
          Close
        </button>
        <h2 className="mb-4 text-center text-xl font-bold">
          Route Information
        </h2>

        <div className="space-y-4">
          {routeData.edges.map((edge, index) => (
            <div key={index} className="rounded-md bg-gray-400 p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Trip #{index + 1}</h3>
              <div className="space-y-2">
                <div>
                  <strong>Start Time:</strong> {formatTime(edge.node.start)}
                </div>
                <div>
                  <strong>End Time:</strong> {formatTime(edge.node.end)}
                </div>
                <div>
                  <strong>Emissions (CO2):</strong>{' '}
                  {edge.node.emissionsPerPerson?.co2.toFixed(2)} g
                </div>
                <div>
                  <strong>Journey Details:</strong>
                  <ul className="list-disc pl-6">
                    {edge.node.legs.map((leg, legIndex) => (
                      <li key={legIndex} className="text-sm">
                        <div>
                          <strong>Mode:</strong> {leg.mode}
                        </div>
                        <div>
                          <strong>Duration:</strong> {leg.duration} seconds
                        </div>
                        <div>
                          <strong>Distance:</strong> {leg.distance.toFixed(2)}{' '}
                          meters
                        </div>
                        <div>
                          <strong>Start:</strong>{' '}
                          {formatTime(leg.start.scheduledTime)}
                        </div>
                        <div>
                          <strong>End:</strong>{' '}
                          {formatTime(leg.end.scheduledTime)}
                        </div>
                        <div>
                          <strong>Realtime State:</strong>{' '}
                          {leg.realtimeState || 'Not available'}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center"></div>
      </div>
    </div>
  );
}

function MapInfo({position, destination}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setLoading(true);
      const baseUrl = 'http://10.120.32.87/app/api/route/';
      const apiUrl = `${baseUrl}${position[0]}/${position[1]}/${destination[0]}/${destination[1]}`;
      console.log(apiUrl);

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setRouteData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching route data:', error);
          setLoading(false);
        });
    }
  }, [isModalOpen, position, destination]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex justify-center">
      <button
        onClick={openModal}
        className="m-4 rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
      >
        Route Info
      </button>

      {isModalOpen && (
        <Modal
          routeData={loading ? {message: 'Loading route data...'} : routeData}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default MapInfo;
