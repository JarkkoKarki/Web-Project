import React from 'react';
import {useTranslation} from 'react-i18next';

export const OrderedItems = ({order}) => {
  const {t} = useTranslation();
  return (
    <>
      <div className="items start flex w-1/3 flex-col justify-start bg-[#0d0f0e] text-white">
        <h2 className="mb-12 text-3xl font-bold">Order:</h2>
        <div className="mx-2 mb-2 flex flex-col items-center bg-[#0d0f0e] font-sans text-white">
          {order?.products?.map((product, index) => (
            <div
              key={index}
              className="mb-2 w-full rounded border border-gray-700 p-2 text-center"
            >
              <p className="font-medium">{`${product.name}`}</p>
              <div className="flex w-full flex-row items-center justify-center space-x-2">
                <p className="text-sm">{`Quantity: ${product.quantity}`}</p>
                <p className="text-sm">{`Price: ${product.price * product.quantity}€`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
