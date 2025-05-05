import React from 'react';
import {useTranslation} from 'react-i18next';
import {useUserContext} from '../hooks/contextHooks';
import useForm from '../hooks/formHooks';
import {useCheckout} from '../hooks/useCheckout';

export const OrderForm = ({items}) => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const {handleCheckout} = useCheckout();

  const {inputs, handleInputChange, handleSubmit} = useForm(
    () => {
      handleCheckout(items, inputs);
    },
    {
      address: user?.address || '',
      email: user?.email || '',
      phone: user?.phone || '',
      additional_info: '',
    },
  );
  console.log('inputs: ', inputs);

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-[#0d0f0e] text-white">
        <h2 className="mb-8 text-2xl font-bold underline underline-offset-4">
          {t('ordersForm.information')}
        </h2>
        <form
          className="flex w-full flex-col items-center justify-center bg-[#0d0f0e] font-sans text-white"
          onSubmit={(e) => handleSubmit(e)}
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
              value={inputs.address}
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
              value={inputs.email}
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
              value={inputs.phone}
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
              name="additional_info"
              value={inputs.additional_info}
              placeholder={t('ordersForm.additional-input')}
              className="w-full rounded border border-gray-300 px-2 py-2 text-wrap"
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-block w-[60%] cursor-pointer self-center border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          >
            {t('ordersForm.checkout')}
          </button>
        </form>
      </section>
    </>
  );
};
