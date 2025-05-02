import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

const Reservation = () => {
  const {t} = useTranslation();
  const [peopleCount, setPeopleCount] = useState(1);
  const [processCount, setProcessCount] = useState(1);

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('src/assets/images/2147772080.jpg')"}}
    >
      <div className="relative w-11/12 max-w-md rounded-lg bg-gray-900 p-8 shadow-2xl">
        <p className="absolute top-2 left-2 text-sm font-semibold text-gray-300">
          {processCount}/3
        </p>
        <h2 className="mb-6 bg-yellow-400 bg-clip-text text-center text-4xl font-extrabold text-transparent">
          {t('reservationPage.book-table')}
        </h2>
        <p className="mb-4 text-center text-lg text-gray-300">
          How many of you are there?
        </p>
        <div className="mb-6 flex items-center justify-center">
          <button
            className="transform rounded-l bg-red-500 px-4 py-2 text-white transition-transform hover:scale-105 hover:bg-red-600"
            onClick={() => setPeopleCount((prev) => Math.max(prev - 1, 0))}
          >
            -
          </button>
          <span className="rounded bg-gray-700 px-6 py-2 text-2xl font-semibold text-white">
            {peopleCount}
          </span>
          <button
            className="transform rounded-r bg-green-500 px-4 py-2 text-white transition-transform hover:scale-105 hover:bg-green-600"
            onClick={() => setPeopleCount((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="transform rounded bg-yellow-400 px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105 hover:bg-green-500"
            onClick={() => {
              if (peopleCount === 0) {
                alert('Please select at least one person.');
              } else {
                console.log('Proceeding to the next step');
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
