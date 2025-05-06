import React, {useState} from 'react';
import BookTable from '../components/reservation/BookTable';
import PickDate from '../components/reservation/PickDate';
import PickTime from '../components/reservation/PickTime';
import FinalForm from '../components/reservation/FinalForm';
import {useTranslation} from 'react-i18next';
import {useUserContext} from '../components/hooks/contextHooks';
import backgroundImage from '../assets/images/2147772080.jpg';

const Reservation = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState(false);
  const [selectedTime, setSelectedTime] = useState(() => {
    const initialTime = new Date();
    initialTime.setHours(12, 0, 0, 0);
    return initialTime;
  });

  return (
    <div
      className="flex h-full items-center justify-center bg-cover bg-center bg-no-repeat py-4"
      style={{backgroundImage: `url(${backgroundImage})`}}
    >
      <div className="relative w-10/12 max-w-lg rounded-xl border border-gray-700 bg-[#1c1e24] p-10 shadow-xl">
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
            error={dateError}
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
            user={user}
          />
        )}
        <div
          className={`flex justify-center ${currentStep !== 4 ? 'space-x-4' : ''}`}
        >
          <button
            className="transform rounded bg-gray-400 px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105 hover:bg-red-500"
            hidden={currentStep === 1}
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep((prev) => prev - 1);
                if (currentStep === 3) {
                  setDateError(false);
                }
              }
            }}
          >
            {t('reservationPage.back')}
          </button>
          <button
            className="transform rounded bg-yellow-400 px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105 hover:bg-green-500"
            onClick={() => {
              if (currentStep === 2 && !selectedDate) {
                setDateError(true);
                return;
              }
              if (currentStep < 4) {
                setCurrentStep((prev) => prev + 1);
                setDateError(false);
              }
            }}
            hidden={currentStep === 4}
          >
            {t('reservationPage.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
