import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/mockDb';

export interface CartItem {
  id: string;
  product: Product;
  variant: {
    size: string;
    color: string;
  };
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: { size: string; color: string }, qty: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variant: { size: string; color: string }, qty: number) => {
    setItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product.id === product.id && 
                item.variant.size === variant.size && 
                item.variant.color === variant.color
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex].qty += qty;
        return newItems;
      }

      return [...prev, {
        id: Math.random().toString(36).substring(7),
        product,
        variant,
        qty
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  };

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);
  
  const cartTotal = items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + (price * item.qty);
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
