import React from 'react';
import {useTranslation} from 'react-i18next';

const BookTable = ({peopleCount, setPeopleCount, maxPeople = 5}) => {
  const {t} = useTranslation();
  return (
    <>
      <p className="absolute top-2 left-2 text-sm font-semibold text-gray-300">
        1/3
      </p>
      <h2 className="mb-6 bg-yellow-400 bg-clip-text text-center text-4xl font-extrabold text-transparent">
        {t('reservationPage.book-table')}
      </h2>
      <p className="mb-4 text-center text-lg text-gray-300">
        {t('reservationPage.people-amount')}
      </p>
      <div className="mb-6 flex items-center justify-center">
        <button
          className="transform rounded-l bg-red-500 px-4 py-2 text-white transition-transform hover:scale-105 hover:bg-red-600"
          onClick={() => setPeopleCount((prev) => Math.max(prev - 1, 1))}
        >
          -
        </button>
        <span className="rounded bg-gray-700 px-6 py-2 text-2xl font-semibold text-white">
          {peopleCount}
        </span>
        <button
          className={`transform rounded-r px-4 py-2 text-white transition-transform ${
            peopleCount >= maxPeople
              ? 'cursor-not-allowed bg-gray-500'
              : 'bg-green-500 hover:scale-105 hover:bg-green-600'
          }`}
          onClick={() =>
            setPeopleCount((prev) => Math.min(prev + 1, maxPeople))
          }
          disabled={peopleCount >= maxPeople}
        >
          +
        </button>
      </div>
      {peopleCount >= maxPeople && (
        <p className="text-text-sm text-center text-yellow-400">
          {t('reservationPage.maxPeopleReached', {max: maxPeople})}
        </p>
      )}
    </>
  );
};

export default BookTable;
