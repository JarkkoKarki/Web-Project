import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import BookTable from '../components/reservation/BookTable';
import PickDate from '../components/reservation/PickDate';
import PickTime from '../components/reservation/PickTime';
import FinalForm from '../components/reservation/FinalForm';
import {formatDate, formatTime} from '../utils/formatters';

const Reservation = () => {
  const {t} = useTranslation();
  const [peopleCount, setPeopleCount] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(() => {
    const initialTime = new Date();
    initialTime.setHours(12, 0, 0, 0);
    return initialTime;
  });

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('src/assets/images/2147772080.jpg')"}}
    >
      <div className="relative w-10/12 max-w-lg rounded-xl border border-gray-700 bg-gray-800 p-10 shadow-xl">
        {currentStep === 1 && (
          <BookTable
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
          />
        )}
        {currentStep === 2 && (
          <PickDate
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        {currentStep === 3 && (
          <PickTime
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        )}
        {currentStep === 4 && (
          <FinalForm
            peopleCount={peopleCount}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        )}
        <div className="flex justify-center space-x-4">
          <button
            className="transform rounded bg-gray-400 px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105 hover:bg-red-500"
            hidden={currentStep === 1}
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep((prev) => prev - 1);
              }
            }}
          >
            {t('reservationPage.back')}
          </button>
          <button
            className="transform rounded bg-yellow-400 px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105 hover:bg-green-500"
            onClick={() => {
              if (currentStep < 4) {
                setCurrentStep((prev) => prev + 1);
              } else {
                console.log('VARAUS: ', {
                  peopleCount,
                  selectedDate: formatDate(selectedDate),
                  selectedTime: formatTime(selectedTime),
                });
                alert('Tungettu consoliin infot');
              }
            }}
          >
            {currentStep < 4
              ? t('reservationPage.next')
              : t('reservationPage.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
