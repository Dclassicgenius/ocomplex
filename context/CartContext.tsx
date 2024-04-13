"use client";
import { Cart, CartItem, Product } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const loadCart = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

const CartContext = createContext<Cart | undefined>(undefined);

export const useCart = () => useContext(CartContext)!;

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );
      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        if (quantity > 0) {
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            product,
            quantity,
          };
        } else {
          updatedItems.splice(itemIndex, 1);
        }
        return updatedItems;
      } else if (quantity > 0) {
        return [...prevItems, { product, quantity }];
      }
      return prevItems;
    });
  };

  const removeFromCart = (product: Product) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.product.id !== product.id);
    });
  };

  const clearCart = () => {
    setItems([]);
  };
  const getTotalItems = () =>
    items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, getTotalItems, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
