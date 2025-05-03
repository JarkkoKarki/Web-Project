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
      <h2 className="mb-4 text-center text-2xl font-bold text-yellow-500">
        Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <ul className="max-h-[300px] space-y-2 overflow-y-auto px-4">
            {cartItems.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className="flex items-center justify-between rounded-lg bg-gray-700 p-4 shadow-md"
              >
                <div className="flex flex-col space-y-1">
                  <span className="max-w-[120px] truncate font-medium text-white">
                    {item.name}
                  </span>
                  <span className="font-semibold text-amber-300">
                    {item.price}€ x {item.quantity}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addItemToCart(item)}
                    className="rounded bg-green-500 px-3 py-1 text-sm font-semibold text-white shadow-md hover:bg-green-600"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 px-4 text-right text-lg font-bold text-yellow-500">
            Total: {calculateTotalPrice()}€
          </div>
          <button
            onClick={handleCheckout}
            className="mx-4 mt-6 w-[calc(100%-2rem)] rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-yellow-600"
          >
            Buy now
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCartElement;
