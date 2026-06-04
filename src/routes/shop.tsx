import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { products, categories, type Category } from "@/lib/products";

type Search = { category?: Category };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: (s.category as Category) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — Glowify Cosmetics" },
      { name: "description", content: "Shop luxury skincare, makeup, haircare and fragrance from Glowify." },
      { property: "og:title", content: "Shop — Glowify Cosmetics" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { t } = useTranslation();
  const { category } = Route.useSearch();
  const [activeCat, setActiveCat] = useState<Category | undefined>(category);
  const [query, setQuery] = useState("");
  const [priceMax, setPriceMax] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating" | "newest">("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (activeCat && p.category !== activeCat) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (p.price > priceMax) return false;
      if (p.rating < minRating) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].sort((a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new"))); break;
    }
    return list;
  }, [activeCat, query, priceMax, minRating, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-3">{t("shop.title")}</p>
        <h1 className="font-display text-5xl md:text-6xl">All Products</h1>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-10">
        {/* FILTERS */}
        <aside className="space-y-8">
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 start-4 size-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("nav.search")}
              className="w-full bg-warm-white border border-rose/20 rounded-full ps-11 pe-4 py-3 text-sm focus:outline-none focus:border-rose"
            />
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">{t("shop.category")}</h3>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => setActiveCat(undefined)}
                className={`block w-full text-start ${!activeCat ? "text-rose font-bold" : "text-muted-foreground"}`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActiveCat(c.key)}
                  className={`block w-full text-start ${activeCat === c.key ? "text-rose font-bold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t(`nav.${c.key}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              {t("shop.priceRange")} <span className="text-rose">${priceMax}</span>
            </h3>
            <input
              type="range"
              min={10}
              max={200}
              step={5}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-rose"
            />
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">{t("shop.rating")}</h3>
            <div className="flex flex-col gap-2">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex items-center gap-2 text-sm ${minRating === r ? "text-rose font-bold" : "text-muted-foreground"}`}
                >
                  <Star className="size-4 fill-current" />
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setActiveCat(undefined); setQuery(""); setPriceMax(200); setMinRating(0); }}
            className="text-xs uppercase tracking-widest underline text-muted-foreground"
          >
            {t("shop.clear")}
          </button>
        </aside>

        {/* GRID */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">{t("shop.results", { n: filtered.length })}</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-warm-white border border-rose/20 rounded-full px-4 py-2 text-sm focus:outline-none"
            >
              <option value="featured">{t("shop.sortFeatured")}</option>
              <option value="price-asc">{t("shop.sortPriceAsc")}</option>
              <option value="price-desc">{t("shop.sortPriceDesc")}</option>
              <option value="rating">{t("shop.sortRating")}</option>
              <option value="newest">{t("shop.sortNewest")}</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground">No products match your filters.</p>
              <Link to="/shop" className="text-rose underline mt-4 inline-block">Reset</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
