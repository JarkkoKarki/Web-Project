import React, {useState} from 'react';
import {useShoppingCart} from '../contexts/ShoppingCartContext';
import {toNumber} from 'lodash';
import {useTranslation} from 'react-i18next';
import {url} from '../utils/variables';

const ShoppingCartElement = () => {
  const {t} = useTranslation();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const {cartItems, addItemToCart, removeItemFromCart} = useShoppingCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + toNumber(item.price) * toNumber(item.quantity);
    }, 0);
  };

  // luodaan uusi objekti, missä products sisältää id:t ja summa
  const mapCartItemsToPayload = () => {
    const products = cartItems.map((item) => ({
      id: item.id,
      quantity: toNumber(item.quantity),
    }));
    const total_price = calculateTotalPrice();

    return {products, total_price};
  };

  const handleCheckout = async () => {
    try {
      const payload = mapCartItemsToPayload();
      console.log(payload);

      const response = await fetch(url + '/payment/create-checkout-session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          products: payload.products, // Send products with id and quantity
        }),
      });

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
    <>
      <button
        onClick={toggleCart}
        className="fixed right-4 bottom-4 cursor-pointer rounded-full bg-yellow-500 p-4 text-black shadow-lg transition hover:bg-yellow-600"
      >
        🛒
      </button>

      {isCartOpen && (
        <div className="bottom-20% fixed top-20 right-10 z-999 h-auto w-100 bg-gray-800 p-4 text-white shadow-lg">
          <button
            onClick={toggleCart}
            className="cursor-pointer rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
          >
            {t('shoppingCart.close')}
          </button>

          <div className="shopping-cart-drawer">
            <h2 className="mb-4 text-center text-2xl font-bold text-yellow-500">
              {t('shoppingCart.shopping-cart')}
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400">
                {t('shoppingCart.empty-cart')}
              </p>
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
                          onClick={() =>
                            addItemToCart(item) + console.log('asd')
                          }
                          className="rounded bg-green-500 px-3 py-1 text-sm font-semibold text-white shadow-md hover:bg-green-600"
                        >
                          {t('shoppingCart.add')}
                        </button>
                        <button
                          onClick={() => removeItemFromCart(item.id)}
                          className="rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow-md hover:bg-red-600"
                        >
                          {t('shoppingCart.remove')}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 px-4 text-right text-lg font-bold text-yellow-500">
                  {t('shoppingCart.total')} {calculateTotalPrice()}€
                </div>
                <button
                  onClick={handleCheckout}
                  className="mx-4 mt-6 w-[calc(100%-2rem)] rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-yellow-600"
                >
                  {t('shoppingCart.order-now')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCartElement;
