import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/style.css';
import {addMonths} from 'date-fns';
import {fi, enUS} from 'date-fns/locale';

const ReservationDate = ({selectedDate, setSelectedDate}) => {
  const {t, i18n} = useTranslation();

  const today = new Date();
  const nextMonth = addMonths(today, 1);
  const [month, setMonth] = useState(nextMonth);

  // kieli importit dayPickeriä varten
  const localeMap = {
    en: enUS,
    fi: fi,
  };

  const currentLocale = localeMap[i18n.language] || enUS;

  // muistetaan paikka, jossa oltiin kun navigoidaan takas sivulle
  useEffect(() => {
    if (selectedDate) {
      setMonth(selectedDate);
    }
  }, [selectedDate]);

  return (
    <>
      <p className="absolute top-2 left-2 text-sm font-semibold text-gray-300">
        2/3
      </p>
      <h2 className="mb-6 bg-yellow-400 bg-clip-text text-center text-4xl font-extrabold text-transparent">
        {t('reservationPage.reservation-date')}
      </h2>
      <p className="mb-4 text-center text-lg text-gray-300">
        {t('reservationPage.select-day')}
      </p>
      <div className="mb-4 flex justify-center">
        <DayPicker
          className="space-y-4 rounded-lg border border-yellow-500 bg-[#101211] p-4 shadow-lg"
          animate
          showWeekNumber
          fixedWeeks
          month={month}
          onMonthChange={setMonth}
          mode="single"
          startMonth={today}
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={currentLocale}
          footer={
            <div className="flex items-center justify-between space-x-4">
              <p className="text-sm font-semibold text-yellow-500">
                {selectedDate
                  ? t('reservationPage.selected-date') +
                    selectedDate.toLocaleDateString()
                  : ''}
              </p>
              <button
                className="rounded border border-yellow-500 bg-yellow-500 px-2 py-1 text-xs font-semibold text-black hover:bg-yellow-400"
                onClick={() => {
                  setSelectedDate(today);
                  setMonth(today);
                }}
              >
                {t('reservationPage.go-to-today')}
              </button>
            </div>
          }
        />
      </div>
    </>
  );
};
export default ReservationDate;
