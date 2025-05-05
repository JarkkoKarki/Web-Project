'use strict';
import {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {mapCartItemsToPayload} from '../../utils/cartUtils';
import {url} from '../../utils/variables';

export const useCheckout = () => {
  const {user} = useContext(UserContext);

  const handleCheckout = async (cartItems) => {
    if (!user || !user.id || !user.username || !user.address) {
      alert('User information is incomplete');
      return;
    }

    try {
      const payload = mapCartItemsToPayload(cartItems);
      console.log('Payload:', payload);

      const response = await fetch(url + '/payment/create-checkout-session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          products: payload.products,
          user: {
            user_id: user.id,
            username: user.username,
            address: user.address,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        throw new Error('Payment session creation failed');
      }

      const data = await response.json();
      console.log('Stripe Response Data:', data);

      if (data.url) {
        window.location.href = data.url; // Redirect to checkout URL
      } else {
        console.error('No checkout URL returned.');
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  return {handleCheckout};
};
