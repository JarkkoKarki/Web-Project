import React from 'react';
import {useTranslation} from 'react-i18next';
import {useUserContext} from '../hooks/contextHooks';
import useForm from '../hooks/formHooks';

export const OrderForm = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const {handleInputChange, handleSubmit} = useForm();
  console.log('user', user);

  return (
    <>
      <section>
        <h2 className="mb-12 text-3xl font-bold">
          {t('ordersForm.your-order')}
        </h2>
        <form
          className="flex flex-col items-center justify-center bg-[#0d0f0e] font-sans text-white"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-row items-center justify-between space-x-4">
            <label htmlFor="name" className="mb-2 block text-sm font-bold">
              {t('ordersForm.name')}:
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="firstName"
              name="firstName"
              value={user?.first_name || ''}
              placeholder={t('ordersForm.firstName-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
            <input
              onChange={handleInputChange}
              type="text"
              id="lastName"
              name="lastName"
              value={user?.last_name || ''}
              placeholder={t('ordersForm.lastName-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm font-bold">
              {t('ordersForm.address')}:
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="address"
              name="address"
              value={user?.address || ''}
              placeholder={t('ordersForm.address-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-bold">
              {t('ordersForm.email')}:
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              id="email"
              name="email"
              value={user?.email || ''}
              placeholder={t('ordersForm.email-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="mb-2 block text-sm font-bold">
              {t('ordersForm.phone')}:
            </label>
            <input
              onChange={handleInputChange}
              type="tel"
              id="phone"
              name="phone"
              value={user?.phone || ''}
              placeholder={t('ordersForm.phone-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            className="inline-block cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          >
            {t('ordersForm.checkout')}
          </button>
        </form>
      </section>
    </>
  );
};
