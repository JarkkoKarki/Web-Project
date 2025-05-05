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
    <div className="ml-10 flex flex-col text-white">
      <h3 className="mb-4 text-xl font-bold">
        {t('reservations.title') || 'Your Reservations'}
      </h3>
      {reservations.length === 0 ? (
        <p>{t('reservations.none') || 'No reservations found.'}</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((res) => (
            <li
              key={res.id}
              className="rounded border border-gray-700 p-4 shadow"
            >
              <p>
                <strong>{t('reservations.date') || 'Date'}:</strong>{' '}
                {new Date(res.reservation_date).toLocaleDateString('fi-FI')}
              </p>
              <p>
                <strong>{t('reservations.time') || 'Time'}:</strong>{' '}
                {res.reservation_time}
              </p>
              <p>
                <strong>{t('reservations.name') || 'Name'}:</strong> {res.name}
              </p>
              <p>
                <strong>{t('reservations.people') || 'People'}:</strong>{' '}
                {res.people_count}
              </p>
              <p>
                <strong>{t('reservations.phone') || 'Phone'}:</strong>{' '}
                {res.phone}
              </p>
              {res.comments && (
                <p>
                  <strong>{t('reservations.comments') || 'Comments'}:</strong>{' '}
                  {res.comments}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reservations;
