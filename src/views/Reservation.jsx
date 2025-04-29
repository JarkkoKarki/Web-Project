import React from 'react';
import {useTranslation} from 'react-i18next';

const Reservation = () => {
  const {t} = useTranslation();

  return (
    <div className="px-8 py-12">
      <h2 className="mb-6 text-center text-3xl font-bold">
        {t('reservationPage.book-table')}
      </h2>
      <form
        action="#"
        method="POST"
        className="mx-auto max-w-lg space-y-4 rounded-lg bg-[#1a1c1b] p-6 shadow-lg"
      >
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            {t('reservationPage.date')}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full rounded border border-gray-700 bg-[#0d0f0e] p-2 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="time" className="mb-2 block text-sm font-medium">
            {t('reservationPage.time')}
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="w-full rounded border border-gray-700 bg-[#0d0f0e] p-2 text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="party-size"
            className="mb-2 block text-sm font-medium"
          >
            {t('reservationPage.table-size')}
          </label>
          <select
            id="party-size"
            name="party-size"
            className="w-full rounded border border-gray-700 bg-[#0d0f0e] p-2 text-white"
            required
          >
            <option value="2-seater">
              {t('reservationPage.table-2-seater')}
            </option>
            <option value="4-seater">
              {t('reservationPage.table-4-seater')}
            </option>
            <option value="6-seater">
              {t('reservationPage.table-6-seater')}
            </option>
            <option value="8-seater">
              {t('reservationPage.table-8-seater')}
            </option>
            <option value="10-seater">
              {t('reservationPage.table-10-seater')}
            </option>
            <option value="large">{t('reservationPage.table-large')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {t('reservationPage.name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded border border-gray-700 bg-[#0d0f0e] p-2 text-white"
            placeholder={t('reservationPage.name-placeholder')}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            {t('reservationPage.phone-number')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded border border-gray-700 bg-[#0d0f0e] p-2 text-white"
            placeholder={t('reservationPage.phone-placeholder')}
            required
          />
        </div>

        <div>
          <label htmlFor="requests" className="mb-2 block text-sm font-medium">
            {t('reservationPage.special-requests')}
          </label>
          <textarea
            id="requests"
            name="requests"
            rows="3"
            className="w-full rounded border border-gray-700 bg-[#0d0f0e] p-2 text-white"
            placeholder={t('reservationPage.special-requests-placeholder')}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded bg-yellow-500 py-2 font-medium text-black transition hover:bg-yellow-600"
          >
            {t('reservationPage.reserve-now')}
          </button>
        </div>
      </form>

      <div
        id="confirmation-message"
        className="mt-6 hidden text-center font-medium text-green-500"
      >
        {t('reservationPage.confirmation-message')}
      </div>
    </div>
  );
};

export default Reservation;
