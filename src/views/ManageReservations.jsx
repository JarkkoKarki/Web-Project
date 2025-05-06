import {useReservations} from '../components/hooks/apiHooks.js';
import {useTranslation} from 'react-i18next';
import ReservationRow from '../components/manageReservations/ReservationRow.jsx';
import {useState} from 'react';
import 'react-day-picker/dist/style.css';
import ReservationInfo from '../components/manageReservations/ReservationInfo.jsx';

const ManageReservations = () => {
  const {reservations} = useReservations();
  const [selectedItem, setSelectedItem] = useState(null);
  const {t} = useTranslation();

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <div>
        <h1 className="mb-4 text-center text-3xl font-semibold text-yellow-500">
          {t('manageReservations.reservations')}
        </h1>
        {selectedItem ? (
          <ReservationInfo
            item={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <div className="p-8">
            <div className="mb-4">
              <label className="mr-2 font-semibold text-yellow-500">
                {t('manageReservations.filter-date')}:
              </label>
              <input
                type="date"
                className="rounded border border-yellow-500 px-2 py-1 text-black"
              />
              <button
                className="ml-4 rounded border border-yellow-500 px-3 py-1 font-semibold text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                {t('manageReservations.filter-reset')}
              </button>
            </div>
            <table className="min-w-full table-auto border border-[#2a2c2b] p-8">
              <thead>
                <tr>
                  <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                    {t('manageReservations.table-id')}
                  </th>
                  <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                    {t('manageReservations.people-amount')}
                  </th>
                  <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                    {t('manageReservations.reservation-date')}
                  </th>
                  <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                    {t('manageReservations.reservation-time')}
                  </th>
                </tr>
              </thead>
              <tbody>
              {reservations.map((item) => (
                <ReservationRow
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageReservations;
