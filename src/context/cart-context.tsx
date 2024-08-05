"use client";

import { Product } from "@/lib/interfaces";
import { createContext, ReactNode, useContext, useState } from "react";

const CartContext = createContext({} as CartContext);

export function useCartContext() {
  return useContext(CartContext);
}

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContext = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (product: Product) => void;
  decreseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

export function CartProvider({ children }: CartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.product.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(product: Product) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.product.id === product.id) == null) {
        return [...currItems, { product, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.product.id === id) == null) {
        return currItems.filter((item) => item.product.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.product.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
