import React, {useState} from 'react';
import {formatDate, formatTime} from '../../utils/formatters';
import {useTranslation} from 'react-i18next';

const ContactInfo = ({
  user,
  prefilled,
  peopleCount,
  selectedTime,
  selectedDate,
}) => {
  const [name, setName] = useState(
    prefilled ? `${user.first_name} ${user.last_name}` : '',
  );
  const [phone, setPhone] = useState(prefilled ? user.phone : '');
  const [email, setEmail] = useState(prefilled ? user.email : '');
  const [comments, setComments] = useState('');
  const {t} = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert(t('reservationPage.emptyFieldsError'));
      return;
    }
    if (user) {
      console.log({
        user_id: user.id,
        comments,
        peopleCount,
        Time: formatTime(selectedTime),
        Date: formatDate(selectedDate),
      });
    } else {
      console.log({
        name,
        phone,
        email,
        comments,
        peopleCount,
        Time: formatTime(selectedTime),
        Date: formatDate(selectedDate),
      });
    }
  };

  return (
    <div className="rounded-lg bg-gray-800 p-6">
      <h3 className="mb-4 text-2xl font-bold text-yellow-400">
        {t('reservationPage.contact-info-title')}
      </h3>
      <form className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-300"
            htmlFor="name"
          >
            {t('reservationPage.name-label')}
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 w-full rounded-md bg-gray-700 p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder={t('reservationPage.name-placeholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={prefilled}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-300"
            htmlFor="phone"
          >
            {t('reservationPage.phone-label')}
          </label>
          <input
            type="tel"
            id="phone"
            className="mt-1 w-full rounded-md bg-gray-700 p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder={t('reservationPage.phone-placeholder')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            readOnly={prefilled}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-300"
            htmlFor="email"
          >
            {t('reservationPage.email-label')}
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full rounded-md bg-gray-700 p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder={t('reservationPage.email-placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={prefilled}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-300"
            htmlFor="comments"
          >
            {t('reservationPage.comments-label')}
          </label>
          <textarea
            id="comments"
            className="mt-1 w-full rounded-md bg-gray-700 p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder={t('reservationPage.comments-placeholder')}
            rows="4"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
      </form>
      <button
        className="transform rounded bg-yellow-400 px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105 hover:bg-green-500"
        onClick={handleSubmit}
        type="button"
      >
        {t('reservationPage.confirm')}
      </button>
    </div>
  );
};

export default ContactInfo;
