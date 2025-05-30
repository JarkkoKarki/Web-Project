import {useEffect, useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';
import {useTranslation} from 'react-i18next';
import {url} from '../../utils/variables';

const Reservations = () => {
  const {user} = useUserContext();
  const {t} = useTranslation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false); // State to toggle showing all reservations

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(url + `/reservations/${user?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchReservations();
    }
  }, [user?.id]);

  const handleDeleteReservation = async (reservationId) => {
    const confirmDelete = window.confirm(t('reservations.confirm-cancel'));
    if (!confirmDelete) return;

    try {
      const response = await fetch(url + `/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== reservationId),
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-white">{t('loading')}</div>;
  if (error)
    return (
      <div className="text-red-500">
        {t('error')}: {error}
      </div>
    );

  const visibleReservations = showAll ? reservations : reservations.slice(0, 3);

  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {reservations.length === 0 ? (
        <p className="text-center text-gray-400">{t('reservations.none')}</p>
      ) : (
        <>
          {visibleReservations.map((res, index) => (
            <div
              key={index}
              className="flex w-[300px] flex-col rounded-lg border border-gray-700 bg-[#1a1c1b] p-4 shadow transition hover:shadow-lg"
            >
              <div className="flex w-full flex-col">
                <h3 className="mb-2 text-lg font-bold text-yellow-400">
                  {res.name || 'Unnamed'}
                </h3>
                <p>
                  <span className="font-semibold text-gray-300">
                    {t('reservations.date')}
                  </span>{' '}
                  {res.reservation_date
                    ? new Date(res.reservation_date).toLocaleDateString('fi-FI')
                    : 'Unknown'}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">
                    {t('reservations.time')}
                  </span>{' '}
                  {res.reservation_time || 'Unknown'}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">
                    {t('reservations.people')}
                  </span>{' '}
                  {res.people_count}
                </p>
                <p className="mt-2 text-sm text-gray-400 italic">
                  {res.comments || 'No comments'}
                </p>
              </div>
              <div className="flex w-full justify-end">
                <button
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={() => handleDeleteReservation(res.id)}
                >
                  {t('reservations.cancel')}
                </button>
              </div>
            </div>
          ))}
          {reservations.length > 3 && (
            <div className="flex w-full justify-center">
              <button
                className="mt-6 inline-block cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll
                  ? t('reservations.show-less')
                  : t('reservations.show-more')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reservations;
