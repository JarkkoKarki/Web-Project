import React from 'react';
import {useTranslation} from 'react-i18next';

const PickTime = ({selectedTime, setSelectedTime}) => {
  const {t} = useTranslation();

  const incrementTime = () => {
    setSelectedTime((prev) => {
      const newTime = new Date(prev.getTime() + 15 * 60 * 1000);
      if (newTime.getHours() >= 12 && newTime.getHours() < 24) {
        return newTime;
      }
      return prev;
    });
  };

  const decrementTime = () => {
    setSelectedTime((prev) => {
      const newTime = new Date(prev.getTime() - 15 * 60 * 1000);
      if (newTime.getHours() >= 12 && newTime.getHours() < 24) {
        return newTime;
      }
      return prev;
    });
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const mins = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <p className="absolute top-2 left-2 text-sm font-semibold text-gray-300">
        3/3
      </p>
      <h2 className="mb-6 bg-yellow-400 bg-clip-text text-center text-4xl font-extrabold text-transparent">
        {t('reservationPage.reservation-time')}
      </h2>
      <p className="mb-4 text-center text-lg text-gray-300">
        {t('reservationPage.pick-time')}
      </p>
      <div className="mb-4 flex items-center justify-center space-x-4">
        <button
          className="rounded-full bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600"
          onClick={decrementTime}
        >
          -
        </button>
        <span className="text-4xl font-bold text-yellow-500">
          {formatTime(selectedTime)}
        </span>
        <button
          className="rounded-full bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600"
          onClick={incrementTime}
        >
          +
        </button>
      </div>
      <p className="mb-4 text-center text-lg text-gray-300">
        {t('reservationPage.open-hours')} 12-24
      </p>
    </>
  );
};

export default PickTime;
