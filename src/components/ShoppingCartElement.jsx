import React from 'react';
import {useShoppingCart} from '../contexts/ShoppingCartContext';
import {toNumber} from 'lodash';

const ShoppingCartElement = () => {
  const {cartItems, addItemToCart, removeItemFromCart} = useShoppingCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + toNumber(item.price) * toNumber(item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        'http://10.120.32.87/app/api/payment/create-checkout-session',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            productIds: cartItems.map((item) => item.id),
          }),
        },
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned.');
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  return (
    <div className="shopping-cart-drawer">
      <h2 className="mb-4 text-xl font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className="flex flex-wrap items-center justify-between gap-2 border-b pt-4 pb-4"
              >
                <span className="max-w-[150px] truncate font-medium">
                  {item.name}
                </span>
                <span className="text-amber-300">{item.price}</span>
                <span className="text-zinc-500">x</span>
                <span className="text-gray-50">{item.quantity}</span>
                <span>|</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addItemToCart(item)}
                    className="cursor-pointer font-semibold text-green-500 hover:text-green-700"
                  >
                    Add
                  </button>
                  <span>|</span>
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right font-bold">
            Total: ${calculateTotalPrice()}
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full rounded-sm border border-yellow-500 px-4 py-1 text-sm transition hover:bg-yellow-500 hover:text-black"
          >
            Buy now
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCartElement;
