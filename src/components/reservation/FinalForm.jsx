import React from 'react';
import {formatDate, formatTime} from '../../utils/formatters';
import ContactInfo from './ContactInfo';
import {useTranslation} from 'react-i18next';

const FinalForm = ({peopleCount, selectedDate, selectedTime, user}) => {
  const {t} = useTranslation();
  return (
    <>
      <h2 className="mb-6 bg-yellow-400 bg-clip-text text-center text-4xl font-extrabold text-transparent">
        {t('reservationPage.reservation-request')}
      </h2>
      <p className="mb-4 text-left text-lg text-gray-300">
        {t('reservationPage.confirm-details')}
      </p>
      <div className="mb-6 ml-3 flex flex-col space-y-4">
        <div className="text-lg text-white">
          <strong className="text-yellow-400">
            {t('reservationPage.people-count')}
          </strong>{' '}
          {peopleCount}
        </div>
        <div className="text-lg text-white">
          <strong className="text-yellow-400">
            {t('reservationPage.selected-date')}
          </strong>{' '}
          {selectedDate
            ? formatDate(selectedDate)
            : t('reservationPage.no-date-selected')}
        </div>
        <div className="text-lg text-white">
          <strong className="text-yellow-400">
            {t('reservationPage.selected-time')}
          </strong>{' '}
          {selectedTime
            ? formatTime(selectedTime)
            : t('reservationPage.no-time-selected')}
        </div>
      </div>
      <ContactInfo
        peopleCount={peopleCount}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        user={user}
        prefilled={!!user}
      />
    </>
  );
};

export default FinalForm;
