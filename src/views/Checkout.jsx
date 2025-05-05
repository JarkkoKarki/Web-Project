import React from 'react';
import {OrderForm} from '../components/forms/OrderForm';
import {OrderedItems} from '../components/orders/OrderedItems';
import {useShoppingCart} from '../contexts/ShoppingCartContext';
import {useTranslation} from 'react-i18next';
import {calculateTotalPrice} from '../utils/cartUtils';
import {useCheckout} from '../components/hooks/useCheckout';

export const Checkout = () => {
  const {t} = useTranslation();
  const {cartItems} = useShoppingCart();
  const {handleCheckout} = useCheckout();

  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('src/assets/images/2147772080.jpg')"}}
    >
      <div className="flex w-2/5 flex-col rounded-2xl bg-[#0d0f0e] p-4 text-center text-black shadow-md">
        <div className="mb-6 flex flex-row items-start justify-between">
          <div className="flex flex-1 justify-center pl-10">
            <OrderForm />
          </div>
          <div className="flex flex-1 justify-end pr-10">
            <OrderedItems order={{products: cartItems}} />
          </div>
        </div>
        <div className="mb-2 flex flex-row items-center space-x-2 self-center text-white">
          <h3 className="text-2xl">{t('ordersForm.total-price')}</h3>
          <h3 className="text-2xl">{totalPrice}€</h3>
        </div>
        <button
          type="button"
          onClick={() => {
            console.log('Checkout button clicked');
            handleCheckout(cartItems);
          }}
          className="mt-2 inline-block w-[20%] cursor-pointer self-center border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
        >
          {t('ordersForm.checkout')}
        </button>
      </div>
    </div>
  );
};
