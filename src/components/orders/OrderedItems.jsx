import React from 'react';
import {useTranslation} from 'react-i18next';

export const OrderedItems = ({order}) => {
  const {t} = useTranslation();
  order.products.map((product) => {
    console.log('product: ', product);
  });
  return (
    <>
      <div className="flex flex-col bg-[#0d0f0e] text-white">
        <h2 className="mb-6 text-3xl font-bold">{t('ordersForm.order')}</h2>
        <div className="mx-2 mb-4 grid grid-cols-2 justify-items-center gap-4 bg-[#0d0f0e] font-sans text-white">
          {order?.products?.map((product, index) => (
            <div
              key={index}
              className="rounded border border-gray-700 p-2 text-center"
            >
              <p className="font-medium">{`${product.name}`}</p>
              <div className="flex w-full flex-row items-center justify-center space-x-2">
                <p className="text-sm">{`${t('ordersForm.quantity')} ${product.quantity}`}</p>
                <p className="text-sm">{`${t('ordersForm.price')} ${product.price * product.quantity}€`}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-6 flex flex-row items-center space-x-2 self-center text-white">
          <h3 className="text-2xl">{t('ordersForm.total-price')}</h3>
          <h3 className="text-2xl">{order.total_price}€</h3>
        </div>
      </div>
    </>
  );
};
