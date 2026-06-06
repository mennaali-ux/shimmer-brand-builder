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

// ---------- Auth (mock) ----------
export interface AuthUser {
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface AuthState {
  user: AuthUser | null;
  loginCustomer: (email: string, name?: string) => void;
  loginAdmin: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  isAdmin: () => boolean;
}

export const ADMIN_EMAIL = "admin@glowify.com";
export const ADMIN_PASSWORD = "Admin123";

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loginCustomer: (email, name) =>
        set({
          user: {
            email,
            name: name ?? email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
            role: "customer",
          },
        }),
      loginAdmin: (email, password) => {
        if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          set({ user: { name: "Mira Halabi", email: ADMIN_EMAIL, role: "admin" } });
          return { ok: true };
        }
        return { ok: false, error: "Invalid email or password." };
      },
      logout: () => set({ user: null }),
      isAdmin: () => get().user?.role === "admin",
    }),
    { name: "glowify-auth", storage: createJSONStorage(() => safeStorage()) }
  )
);

// ---------- Editable product store (mock CRUD for admin) ----------
import { products as seedProducts } from "./products";

interface CatalogState {
  products: Product[];
  reset: () => void;
  upsert: (p: Product) => void;
  remove: (id: string) => void;
  updateStock: (id: string, stock: number) => void;
}

export const useCatalog = create<CatalogState>()(
  persist(
    (set) => ({
      products: seedProducts,
      reset: () => set({ products: seedProducts }),
      upsert: (p) =>
        set((s) => {
          const exists = s.products.some((x) => x.id === p.id);
          return {
            products: exists
              ? s.products.map((x) => (x.id === p.id ? p : x))
              : [p, ...s.products],
          };
        }),
      remove: (id) => set((s) => ({ products: s.products.filter((x) => x.id !== id) })),
      updateStock: (id, stock) =>
        set((s) => ({
          products: s.products.map((x) => (x.id === id ? { ...x, stock } : x)),
        })),
    }),
    {
      name: "glowify-catalog",
      storage: createJSONStorage(() => safeStorage()),
      // Only persist diffs from seed — keep seed when storage empty
      version: 2,
    }
  )
);
