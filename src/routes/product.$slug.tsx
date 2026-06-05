import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heart, Share2, Star, Truck, ShieldCheck, Leaf } from "lucide-react";
import { getProduct, getRelated } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/shop/ProductCard";

import type { Product } from "@/lib/products";

type LoaderData = { product: Product };

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): LoaderData => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }: { loaderData?: LoaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Glowify` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Glowify" }],
  }),
  errorComponent: () => <div className="p-24 text-center">Couldn't load product.</div>,
  notFoundComponent: () => <div className="p-24 text-center">Product not found.</div>,
  component: ProductPage,
});

function ProductPage() {
  const { t } = useTranslation();
  const { product } = Route.useLoaderData() as LoaderData;
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "ingredients" | "benefits" | "reviews">("description");
  const add = useCart((s) => s.add);
  const wishHas = useWishlist((s) => s.ids.includes(product.id));
  const wishToggle = useWishlist((s) => s.toggle);
  const related = getRelated(product.slug);
  const gallery = product.gallery.length ? product.gallery : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <nav className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
        <Link to="/" className="hover:text-rose">Home</Link> / <Link to="/shop" className="hover:text-rose">Shop</Link> / <span>{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* GALLERY */}
        <div>
          <div className="aspect-square bg-pink-light/20 rounded-3xl overflow-hidden mb-4 group">
            <img
              src={gallery[active]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square w-20 rounded-2xl overflow-hidden border-2 ${
                    i === active ? "border-rose" : "border-transparent"
                  }`}
                >
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-4">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-0.5 text-rose">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-4 ${i < Math.round(product.rating) ? "fill-rose" : ""}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <p className="font-display text-4xl">${product.price.toFixed(2)}</p>
            {product.oldPrice && (
              <p className="text-lg text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</p>
            )}
          </div>

          <p className="text-base leading-relaxed mb-8 text-foreground/80">{product.description}</p>

          <p className="text-xs uppercase tracking-widest mb-6">
            {product.stock > 10 ? (
              <span className="text-green-600">● {t("product.inStock")}</span>
            ) : (
              <span className="text-rose-deep">● {t("product.lowStock", { n: product.stock })}</span>
            )}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center bg-warm-white border border-rose/20 rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 font-bold">−</button>
              <span className="px-4 font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 py-3 font-bold">+</button>
            </div>
            <button
              onClick={() => add(product.id, qty)}
              className="flex-1 bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-deep transition"
            >
              {t("product.addToCart")}
            </button>
          </div>

          <div className="flex gap-3 mb-10">
            <button
              onClick={() => wishToggle(product.id)}
              className="flex-1 border border-foreground/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:bg-warm-white"
            >
              <Heart className={`size-4 ${wishHas ? "fill-rose text-rose" : ""}`} />
              {t("product.addToWishlist")}
            </button>
            <button className="border border-foreground/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:bg-warm-white">
              <Share2 className="size-4" /> {t("product.share")}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground border-t border-rose/10 pt-6">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="size-5 text-rose" />
              Free shipping over $50
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="size-5 text-rose" />
              30-day returns
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Leaf className="size-5 text-rose" />
              Cruelty-free
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-20">
        <div className="flex gap-8 border-b border-rose/10 mb-8 overflow-x-auto">
          {(["description", "ingredients", "benefits", "reviews"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`pb-4 text-xs font-bold uppercase tracking-widest border-b-2 transition ${
                tab === k ? "border-rose text-rose" : "border-transparent text-muted-foreground"
              }`}
            >
              {t(`product.${k}`)}
            </button>
          ))}
        </div>
        <div className="max-w-3xl">
          {tab === "description" && <p className="text-base leading-loose">{product.description}</p>}
          {tab === "ingredients" && (
            <ul className="grid sm:grid-cols-2 gap-3">
              {product.ingredients.map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="size-1.5 rounded-full bg-rose" /> {i}
                </li>
              ))}
            </ul>
          )}
          {tab === "benefits" && (
            <ul className="space-y-3">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base">
                  <span className="size-1.5 rounded-full bg-rose mt-2.5" /> {b}
                </li>
              ))}
            </ul>
          )}
          {tab === "reviews" && (
            <div className="space-y-6">
              {product.reviews.length === 0 ? (
                <p className="text-muted-foreground">No reviews yet. Be the first.</p>
              ) : (
                product.reviews.map((r, i) => (
                  <div key={i} className="border-b border-rose/10 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold">{r.author}</p>
                      <div className="flex gap-0.5 text-rose">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`size-3 ${j < r.rating ? "fill-rose" : ""}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80">{r.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{r.date}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-3xl md:text-4xl mb-10">{t("product.related")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
