'use strict';

import {toNumber} from 'lodash';

export const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + toNumber(item.price) * toNumber(item.quantity);
  }, 0);
};

export const mapCartItemsToPayload = (cartItems) => {
  const products = cartItems.map((item) => {
    console.log(item);
    return {
      id: item.id,
      quantity: toNumber(item.quantity),
    };
  });
  const total_price = calculateTotalPrice(cartItems);
  return {products, total_price};
};
