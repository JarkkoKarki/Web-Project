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
          className="flex w-full flex-col items-center justify-center bg-[#0d0f0e] font-sans text-white"
          onSubmit={(e) => handleSubmit(e)} // Pass inputs to handleSubmit
        >
          <div className="mb-4 w-[80%]">
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
              className="w-full rounded border border-gray-300 px-6 py-2 text-center"
            />
          </div>
          <div className="mb-4 w-[80%]">
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
              className="w-full rounded border border-gray-300 px-6 py-2 text-center"
            />
          </div>
          <div className="mb-4 w-[80%]">
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
              className="w-full rounded border border-gray-300 px-6 py-2 text-center"
            />
          </div>
          <div className="mb-4 w-[80%]">
            <label htmlFor="phone" className="mb-2 block text-sm font-bold">
              {t('ordersForm.additional')}
            </label>
            <textarea
              onChange={handleInputChange}
              type="text"
              id="additional"
              name="additional"
              value={inputs.additional} // Bind to inputs state
              placeholder={t('ordersForm.additional-input')}
              className="w-full rounded border border-gray-300 px-2 py-2 text-wrap"
            />
          </div>
        </form>
      </section>
    </>
  );
};
