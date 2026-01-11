"use client";

import { useMemo, useState } from "react";
import { CartItem, Product } from "../types";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartShake, setCartShake] = useState(0);

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart],
  );

  const totalQuantity = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing)
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      return [...prev, { ...product, quantity: 1, cartId: crypto.randomUUID() }];
    });
    setCartShake(Date.now());
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId)
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCart([]);

  return {
    cart,
    total,
    totalQuantity,
    cartShake,
    addToCart,
    updateQuantity,
    clearCart,
  };
};
