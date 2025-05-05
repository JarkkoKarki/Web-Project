import React from 'react';
import {useTranslation} from 'react-i18next';
import {useUserContext} from '../hooks/contextHooks';
import useForm from '../hooks/formHooks';

export const OrderForm = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();

  const {inputs, handleInputChange, handleSubmit} = useForm(
    () => {
      console.log('Form submitted:', inputs);
    },
    {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      address: user?.address || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  );

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-[#0d0f0e] text-white">
        <h2 className="mb-12 text-3xl font-bold">
          {t('ordersForm.information')}
        </h2>
        <form
          className="flex flex-col items-center justify-center bg-[#0d0f0e] font-sans text-white"
          onSubmit={(e) => handleSubmit(e)} // Pass inputs to handleSubmit
        >
          <label htmlFor="name" className="mb-2 block text-sm font-bold">
            {t('ordersForm.name')}
          </label>
          <div className="mb-4 flex flex-row items-center justify-between space-x-4">
            <input
              onChange={handleInputChange}
              type="text"
              id="firstName"
              name="firstName"
              value={inputs.firstName} // Bind to inputs state
              placeholder={t('ordersForm.firstName-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
            <input
              onChange={handleInputChange}
              type="text"
              id="lastName"
              name="lastName"
              value={inputs.lastName} // Bind to inputs state
              placeholder={t('ordersForm.lastName-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm font-bold">
              {t('ordersForm.address')}
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="address"
              name="address"
              value={inputs.address} // Bind to inputs state
              placeholder={t('ordersForm.address-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-bold">
              {t('ordersForm.email')}
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              id="email"
              name="email"
              value={inputs.email} // Bind to inputs state
              placeholder={t('ordersForm.email-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="mb-2 block text-sm font-bold">
              {t('ordersForm.phone')}
            </label>
            <input
              onChange={handleInputChange}
              type="tel"
              id="phone"
              name="phone"
              value={inputs.phone} // Bind to inputs state
              placeholder={t('ordersForm.phone-input')}
              className="w-full rounded border border-gray-300 px-4 py-2"
            />
          </div>
        </form>
      </section>
    </>
  );
};
