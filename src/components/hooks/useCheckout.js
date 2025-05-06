'use strict';
import {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {mapCartItemsToPayload} from '../../utils/cartUtils';
import {url} from '../../utils/variables';

export const useCheckout = () => {
  const {user} = useContext(UserContext);

  const handleCheckout = async (cartItems, inputs = {}) => {
    if (!user || !user.id || !user.username) {
      alert('User information is incomplete');
      return;
    } else if ((!inputs.address && !inputs.phone) || !inputs.email) {
      alert('Please fill in all the required fields');
      return;
    }
    try {
      const payload = mapCartItemsToPayload(cartItems);

      const response = await fetch(url + '/payment/create-checkout-session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          products: payload.products,
          user: {
            user_id: user.id,
            username: user.username,
            address: inputs.address || user.address,
            email: inputs.email || user.email,
            phone: inputs.phone || user.phone,
            additional_info: inputs.additional_info || '',
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        throw new Error('Payment session creation failed');
      }

      const data = await response.json();

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
