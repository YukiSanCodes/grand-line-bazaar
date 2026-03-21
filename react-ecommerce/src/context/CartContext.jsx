import { createContext, useEffect, useRef, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartNotification, setCartNotification] = useState(null);
  const notificationTimerRef = useRef(null);
  const cartRef = useRef(cart);

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  const dismissCartNotification = () => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
      notificationTimerRef.current = null;
    }
    setCartNotification(null);
  };

  const showCartNotification = (payload) => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }
    setCartNotification({ id: Date.now(), ...payload });
    notificationTimerRef.current = setTimeout(() => {
      setCartNotification(null);
      notificationTimerRef.current = null;
    }, 4500);
  };

  const addToCart = (product) => {
    const existing = cartRef.current.find((item) => item.id === product.id);

    setCart((prevCart) => {
      const inCart = prevCart.find((item) => item.id === product.id);
      if (inCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });

    showCartNotification({
      title: existing ? 'Quantity updated' : 'Added to cart',
      productName: product.name,
    });
  };

  const removeFromCart = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this item?'
    );
    if (confirmed) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  };

  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartNotification,
        dismissCartNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
