import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products, type Product } from "./products";

export interface CartItem {
  productId: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
  resolved: () => Array<{ product: Product; qty: number }>;
}

const safeStorage = () =>
  typeof window === "undefined"
    ? (undefined as unknown as Storage)
    : window.localStorage;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (productId, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === productId ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...s.items, { productId, qty }] };
        }),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.productId === productId ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, i) => a + i.qty, 0),
      resolved: () =>
        get()
          .items.map((i) => {
            const product = products.find((p) => p.id === i.productId);
            return product ? { product, qty: i.qty } : null;
          })
          .filter((x): x is { product: Product; qty: number } => !!x),
      subtotal: () =>
        get()
          .resolved()
          .reduce((a, { product, qty }) => a + product.price * qty, 0),
    }),
    { name: "glowify-cart", storage: createJSONStorage(() => safeStorage()) }
  )
);

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "glowify-wishlist", storage: createJSONStorage(() => safeStorage()) }
  )
);
