import {useReservations} from '../components/hooks/apiHooks.js';
import {useTranslation} from 'react-i18next';
import ReservationRow from '../components/manageReservations/ReservationRow.jsx';
import {useState} from 'react';
import ReservationInfo from '../components/manageReservations/ReservationInfo.jsx';

const ManageReservations = () => {
  const {reservations} = useReservations();
  const [selectedItem, setSelectedItem] = useState(null);
  const {t} = useTranslation();
  const [filterDate, setFilterDate] = useState('');

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const convertInputDate = (isoDateStr) => {
    if (!isoDateStr) return '';
    const [year, month, day] = isoDateStr.split('-');
    return `${parseInt(day)}.${parseInt(month)}.${year}`; // removes leading 0s
  };

  const filteredReservations = filterDate
    ? reservations.filter(
        (item) => item.reservation_date === convertInputDate(filterDate),
      )
    : reservations;

  return (
    <>
      <style>
        {`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1); /* Makes the icon white */
          }
        `}
      </style>
      <div className="mx-auto max-w-screen-md">
        <h1 className="mb-4 text-center text-xl font-semibold text-yellow-500 md:text-3xl">
          {t('manageReservations.reservations')}
        </h1>
        {selectedItem ? (
          <ReservationInfo
            item={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <div className="p-4 md:p-8">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
              <label className="font-semibold text-yellow-500">
                {t('manageReservations.filter-date')}:
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="rounded border border-yellow-500 px-2 py-1"
              />
              <div className="flex">
                <button
                  onClick={() => setFilterDate('')}
                  className="ml-auto rounded border border-yellow-500 px-3 py-1 font-semibold text-yellow-500 hover:bg-yellow-500 hover:text-black md:ml-4"
                >
                  {t('manageReservations.filter-reset')}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-[#2a2c2b]">
                <thead>
                  <tr>
                    <th className="border-b-2 border-yellow-500 px-2 py-3 text-left text-sm md:px-6 md:text-lg">
                      {t('manageReservations.table-id')}
                    </th>
                    <th className="border-b-2 border-yellow-500 px-2 py-3 text-left text-sm md:px-6 md:text-lg">
                      {t('manageReservations.people-amount')}
                    </th>
                    <th className="border-b-2 border-yellow-500 px-2 py-3 text-left text-sm md:px-6 md:text-lg">
                      {t('manageReservations.reservation-date')}
                    </th>
                    <th className="border-b-2 border-yellow-500 px-2 py-3 text-left text-sm md:px-6 md:text-lg">
                      {t('manageReservations.reservation-time')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((item) => (
                    <ReservationRow
                      key={item.id}
                      item={item}
                      onClick={handleClick}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageReservations;
