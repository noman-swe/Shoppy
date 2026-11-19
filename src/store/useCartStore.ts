// src/store/useCartStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  isCartDrawerOpen: boolean;
  buyNowProduct: CartItem | null;
  addToCart: (product: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleCartDrawer: (isOpen: boolean) => void;
  clearCart: () => void;
  setBuyNowProduct: (product: CartItem | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartDrawerOpen: false,
      buyNowProduct: null,

      addToCart: (product, qty = 1) => {
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex(
          (item) => item.id === product.id,
        );
        const updatedCart = currentCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + qty }
            : item,
        );

        if (existingIndex === -1) {
          updatedCart.push({ ...product, quantity: qty });
        }

        set({
          cart: updatedCart,
          // isCartDrawerOpen: true,
        });
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, qty) => {
        if (qty <= 0) {
          get().removeFromCart(id);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item,
          ),
        });
      },

      toggleCartDrawer: (isOpen) => set({ isCartDrawerOpen: isOpen }),
      clearCart: () => set({ cart: [] }),
      setBuyNowProduct: (product) => set({ buyNowProduct: product }),
    }),
    {
      name: "shoppybd-cart-storage",
      partialize: (state) => ({
        cart: state.cart,
        buyNowProduct: state.buyNowProduct,
      }),
    },
  ),
);
