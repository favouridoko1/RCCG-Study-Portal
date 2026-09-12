import { create } from "zustand";

export type CartItem = {
  materialId?: number;
  title: string;
  subtitle: string;
  price: string;
  type: string;
};

type CartStore = {
  items: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (title: string) => void;
  setItems: (items: CartItem[]) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addToCart: (item) =>
    set((state) => {
      const alreadyInCart = state.items.some(
        (cartItem) =>
          cartItem.materialId === item.materialId ||
          cartItem.title === item.title
      );

      if (alreadyInCart) {
        return state;
      }

      return {
        items: [...state.items, item],
      };
    }),

  removeFromCart: (title) =>
    set((state) => ({
      items: state.items.filter((item) => item.title !== title),
    })),

  setItems: (items) => set({ items }),

  clearCart: () => set({ items: [] }),
}));