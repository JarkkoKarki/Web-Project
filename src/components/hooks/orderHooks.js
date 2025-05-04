'use strict';

import {useMemo} from 'react';

export const useProductInfo = (products) => {
  return useMemo(() => {
    const result = products.reduce(
      (acc, product) => {
        const price = parseFloat(product.price);
        acc.totalQuantity += product.quantity;
        if (price > acc.mostExpensiveProduct.price) {
          acc.mostExpensiveProduct = {...product, price};
        }
        return acc;
      },
      {mostExpensiveProduct: {price: 0}, totalQuantity: 0},
    );

    return {
      mostExpensiveProduct: result.mostExpensiveProduct,
      totalQuantity: result.totalQuantity,
    };
  }, [products]);
};
