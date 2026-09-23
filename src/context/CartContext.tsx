import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';
import { CartContext } from './Context';

// Type untuk item keranjang
export interface CartItem {
  product: Product;
  quantity: number;
}

// Type untuk context
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('minimo_cart') || localStorage.getItem('nusantara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    try {
      channelRef.current = new BroadcastChannel('minimo_cart_sync');
      channelRef.current.onmessage = (event) => {
        if (event.data?.type === 'SYNC_CART' && Array.isArray(event.data.payload)) {
          setCartItems(event.data.payload);
        }
      };
    } catch {
      // BroadcastChannel fallback silently handled
    }

    const handleStorage = (e: StorageEvent) => {
      if ((e.key === 'minimo_cart' || e.key === 'nusantara_cart') && e.newValue) {
        try {
          setCartItems(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      if (channelRef.current) channelRef.current.close();
    };
  }, []);

  const persistCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    try {
      localStorage.setItem('minimo_cart', JSON.stringify(newItems));
      channelRef.current?.postMessage({ type: 'SYNC_CART', payload: newItems });
    } catch {}
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      let updated: CartItem[];
      
      if (existingItem) {
        updated = prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { product, quantity }];
      }

      persistCart(updated);
      return updated;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.product.id !== productId);
      persistCart(updated);
      return updated;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        const updated = prev.filter(item => item.product.id !== productId);
        persistCart(updated);
        return updated;
      }
      
      const updated = prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      persistCart(updated);
      return updated;
    });
  };

  const clearCart = () => {
    persistCart([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const contextValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}