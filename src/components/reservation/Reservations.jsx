import {useEffect, useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';
import {useTranslation} from 'react-i18next';

const Reservations = () => {
  const {user} = useUserContext();
  const {t} = useTranslation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://10.120.32.87/app/api/reservations/${user?.id}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);
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

  if (loading) return <div className="text-white">{t('loading')}</div>;
  if (error)
    return (
      <div className="text-red-500">
        {t('error')}: {error}
      </div>
    );

  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {reservations.length === 0 ? (
        <p className="text-center text-gray-400">{t('reservations.none')}</p>
      ) : (
        reservations.map((res, index) => (
          <div
            key={index}
            className="w-[300px] rounded-lg border border-gray-700 bg-[#1a1c1b] p-4 shadow transition hover:shadow-lg"
          >
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
        ))
      )}
    </div>
  );
};

export default Reservations;
