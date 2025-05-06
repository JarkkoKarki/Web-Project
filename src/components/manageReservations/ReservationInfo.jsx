import React from 'react';
import { useTranslation } from 'react-i18next';

const ReservationInfo = ({ item, setSelectedItem }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-lg flex-col rounded border border-[#000000] bg-[#101211] p-8 shadow-lg text-white">
        <button
          onClick={() => setSelectedItem(null)}
          className="mb-6 w-fit cursor-pointer border border-yellow-500 px-4 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
        >
          X
        </button>

        <h3 className="mb-2 text-2xl font-bold text-yellow-500">
          {item.name || t('reservations.unnamed') || 'Unnamed'}
        </h3>

        <div className="mb-6 space-y-3 text-lg text-white">
          <p>
            <span className="font-semibold text-gray-300">{t('reservations.phone')}:</span>{' '}
            {item.phone || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold text-gray-300">{t('manageReservations.email')}:</span>{' '}
            {item.email || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold text-gray-300">{t('manageReservations.table-id')}:</span>{' '}
            {item.table_id || 'Unknown'}
          </p>
        </div>

        <div className="space-y-3 text-lg text-white">
          <p>
            <span className="font-semibold text-gray-300">
              {t('reservations.date')}:
            </span>{' '}
            {item.reservation_date
              ? new Date(item.reservation_date).toLocaleDateString('fi-FI')
              : 'Unknown'}
          </p>
          <p>
            <span className="font-semibold text-gray-300">
              {t('reservations.time')}:
            </span>{' '}
            {item.reservation_time || 'Unknown'}
          </p>
          <p>
            <span className="font-semibold text-gray-300">
              {t('manageReservations.people-amount')}:
            </span>{' '}
            {item.people_count || 'Unknown'}
          </p>
        </div>

        <h3 className="mt-6 text-xl font-semibold text-gray-300">Info</h3>

        <p className="mt-2 text-lg italic text-gray-400">
          {item.comments || t('reservations.no_comments') || 'No comments'}
        </p>
      </div>
    </div>
  );
};

export default ReservationInfo;
