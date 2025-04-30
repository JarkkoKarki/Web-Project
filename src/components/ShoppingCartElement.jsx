import React from 'react';
import {useShoppingCart} from '../contexts/ShoppingCartContext';
import {toNumber} from 'lodash';

const ShoppingCartElement = () => {
  const {cartItems, addItemToCart, removeItemFromCart} = useShoppingCart();

  const calculateTotalPrice = () => {
    if (cartItems.length !== 0) {
      let total = 0;
      cartItems.forEach((item) => {
        total += toNumber(item.price) * toNumber(item.quantity); // vähän tuli hakattuu päätä ku jostai syyst noi on stringei
      });
      console.log(total, ' Total hinta');
      return total;
    }
  };

  console.log(cartItems, ' cartItems');

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
        </>
      )}
    </div>
  );
};

export default ShoppingCartElement;
