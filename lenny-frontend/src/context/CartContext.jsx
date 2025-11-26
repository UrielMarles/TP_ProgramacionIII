import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('lennyCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [customerName, setCustomerName] = useState(() => {
    return localStorage.getItem('lennyCustomerName') || '';
  });

  useEffect(() => {
    localStorage.setItem('lennyCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (customerName) {
      localStorage.setItem('lennyCustomerName', customerName);
    }
  }, [customerName]);

  const addToCart = (product, tipo) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && item.tipo === tipo
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.tipo === tipo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      
      return [...prevCart, { 
        ...product, 
        tipo: tipo,
        cantidad: 1 
      }];
    });
  };

  const removeFromCart = (productId, tipo) => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === productId && item.tipo === tipo))
    );
  };

  const updateQuantity = (productId, tipo, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, tipo);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.tipo === tipo
          ? { ...item, cantidad: newQuantity }
          : item
      )
    );
  };

  const incrementQuantity = (productId, tipo) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.tipo === tipo
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productId, tipo) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId && item.tipo === tipo) {
          const newQuantity = item.cantidad - 1;
          return newQuantity > 0 ? { ...item, cantidad: newQuantity } : item;
        }
        return item;
      }).filter(item => item.cantidad > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  const resetSession = () => {
    setCart([]);
    setCustomerName('');
    localStorage.removeItem('lennyCart');
    localStorage.removeItem('lennyCustomerName');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        customerName,
        setCustomerName,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getTotal,
        getCartCount,
        resetSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};