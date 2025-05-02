import React, {createContext, useContext, useState} from 'react';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? {...i, quantity: i.quantity + 1} : i,
        );
      } else {
        return [...prevItems, {...item, quantity: 1}];
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <ShoppingCartContext.Provider
      value={{cartItems, addItemToCart, removeItemFromCart}}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);
