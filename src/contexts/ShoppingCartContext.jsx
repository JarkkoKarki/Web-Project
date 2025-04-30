import React, {createContext, useContext, useState, useEffect} from 'react';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id,
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem,
        );
      } else {
        return [...prevItems, {...item, quantity: 1}];
      }
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((cartItem) =>
          cartItem.id === itemId
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem,
        );
      } else {
        return prevItems.filter((cartItem) => cartItem.id !== itemId);
      }
    });
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
