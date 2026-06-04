## Glowify Cosmetics — v1 Plan

Frontend-only luxury cosmetics storefront with mock product data, full EN/AR + RTL support, and light/dark themes. Built in the selected "Satin Editorial Luxe" direction (palette #fef0f5 / #f8c8d8 / #e88aab / #c45c7c + ink near-black, Syne display + Plus Jakarta body, bento-grid composition).

### Scope of this iteration

Core storefront routes:

1. `/` — Home (hero, flash sale marquee, bento essentials, categories, best sellers, beauty tips, testimonials, newsletter, footer)
2. `/shop` — Product grid with search, category/price/rating filters, sort, pagination
3. `/product/$slug` — Image gallery + zoom, description/ingredients/benefits tabs, reviews, related products, add-to-cart, add-to-wishlist
4. `/cart` — Line items, quantity, coupon field, order summary
5. `/checkout` — Address + shipping + payment UI (mock), order review
6. `/auth` — Login + register + forgot password (UI only, no backend)

Plus the always-visible shared chrome: sticky glass nav (logo, links, search, EN/AR toggle, theme toggle, wishlist, account, cart count) and full footer.

Deferred to follow-up iterations (called out so expectations are clear): admin dashboard, blog, developer page, about/contact/FAQ, order tracking, user dashboard / order history, loyalty/referrals/gift cards, real auth, real database, payments.

### Design tokens (locked from chosen direction)

Copied verbatim into `src/styles.css` under `@theme`:
- `--background: #fef0f5`, `--foreground: #1a1a1a`
- `--pink-light: #f8c8d8`, `--rose: #e88aab`, `--rose-deep: #c45c7c`
- `--warm-white: #ffffff`, gold accent `--gold: #c9a84c` for luxury micro-details
- Dark mode: deep ink background, blush text, rose accents preserved
- Fonts: Syne (display, weights 700/800), Plus Jakarta Sans (body, 400/500/600)
- Radius scale: generous (24–32px) to match the satin/ceramic feel
- Custom easing: `--ease-out-expo`, reveal + marquee keyframes

### State (client-only, mock data)

- `src/lib/products.ts` — ~24 mock products across Skincare, Makeup, Haircare, Fragrance with images, price, rating, reviews, tags (bestseller, new, sale)
- `src/lib/store.ts` — Zustand stores for `cart`, `wishlist`, `auth` (mock), persisted to localStorage
- `src/lib/i18n.ts` — i18next with `en` and `ar` resources; `dir` attribute swaps on `<html>` for RTL
- `src/lib/theme.ts` — light/dark toggle stored in localStorage, applied via `.dark` class on `<html>`

### Routes & components

```text
src/routes/
  __root.tsx          (HTML shell, header, footer, providers)
  index.tsx           (home)
  shop.tsx
  product.$slug.tsx
  cart.tsx
  checkout.tsx
  auth.tsx

src/components/
  layout/Header.tsx, Footer.tsx, LanguageToggle.tsx, ThemeToggle.tsx
  home/Hero.tsx, FlashSaleMarquee.tsx, BentoEssentials.tsx, CategoryCircles.tsx,
       BestSellers.tsx, BeautyTips.tsx, Testimonials.tsx, Newsletter.tsx
  shop/ProductCard.tsx, ProductGrid.tsx, FilterSidebar.tsx, SortBar.tsx
  product/Gallery.tsx, ProductInfo.tsx, ReviewList.tsx, RelatedProducts.tsx
  cart/CartLine.tsx, OrderSummary.tsx
  checkout/CheckoutForm.tsx, PaymentMethods.tsx
  auth/AuthTabs.tsx
```

### Imagery

Generate ~10 hero & product images with `imagegen` (fast tier) and reuse across cards: silk/petals hero, ceramic serum bottles, lipsticks, compacts, brushes, oils, perfume mist. Saved to `src/assets/`.

### i18n + RTL

- Translation keys for every label, button, nav, section title
- `<html lang dir>` updates on language switch
- Tailwind `rtl:` variants used for asymmetric spacing where needed (arrow direction, padding sides)
- Arabic typography uses system Arabic fallback; Syne keeps Latin glyphs

### Technical notes

- TanStack Start file routes, dot-separated naming
- Each route defines its own `head()` meta (title, description, og:*)
- `errorComponent` + `notFoundComponent` on routes with loaders
- Mock data is synchronous so loaders are unused; reads happen in components
- All colors via semantic tokens — no raw hex in components
- shadcn primitives used for `Button`, `Input`, `Tabs`, `Sheet` (mobile nav + cart drawer), `Dialog`, `Select`, `Slider` (price range)

### After v1 ships

Follow-up iterations on request: (a) remaining marketing pages (about/contact/FAQ/blog/services/developer), (b) admin dashboard, (c) Lovable Cloud backend + real auth + DB-backed products/orders, (d) payments. I'll flag what to tackle next when v1 is in the preview.
