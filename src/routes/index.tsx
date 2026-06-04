import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Sparkles, Star, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { products, categories } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glowify Cosmetics — Luxury Beauty & Skincare" },
      { name: "description", content: "Discover botanical-first luxury beauty. Skincare, makeup, haircare and fragrance crafted with intention." },
      { property: "og:title", content: "Glowify Cosmetics" },
      { property: "og:description", content: "Premium beauty formulated with intention." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useTranslation();
  const featured = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
  const main = products[0];
  const tile1 = products[1];
  const tile2 = products[2];
  const wide = products[3];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1631214540242-6fa6ddcef687?auto=format&fit=crop&w=2000&q=80"
            alt="Glowify hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl animate-reveal">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-deep mb-6">
              ✦ {t("hero.eyebrow")}
            </p>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-8 text-balance">
              {t("hero.title1")} <br />
              <span className="text-rose italic">{t("hero.title2")}</span> {t("hero.title3")}
            </h1>
            <p className="text-lg mb-10 text-pretty max-w-md opacity-80">{t("hero.body")}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-foreground text-background px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-deep transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                {t("hero.ctaShop")} <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
              <Link
                to="/shop"
                className="border border-foreground/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-warm-white transition-all"
              >
                {t("hero.ctaExplore")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FLASH SALE MARQUEE */}
      <div className="bg-rose-deep py-3 text-warm-white overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-12 items-center animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-xs font-bold uppercase tracking-[0.3em] inline-flex items-center gap-12">
              <Sparkles className="size-3" />
              {t("sale.flash")}
              <span>•</span>
              {t("sale.endsIn")}: 02h 45m 12s
            </span>
          ))}
        </div>
      </div>

      {/* BENTO ESSENTIALS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">{t("sections.essentials")}</h2>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-rose">
            {t("sections.viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 md:h-[900px]">
          {/* Main */}
          <Link
            to="/product/$slug"
            params={{ slug: main.slug }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-pink-light/20 min-h-[400px]"
          >
            <img src={main.image} alt={main.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 inset-x-8 flex justify-between items-end text-warm-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">{main.category}</p>
                <h3 className="font-display text-3xl">{main.name}</h3>
                <p className="font-medium mt-1">${main.price.toFixed(2)}</p>
              </div>
              <div className="bg-warm-white text-foreground size-12 rounded-full grid place-items-center font-bold">+</div>
            </div>
          </Link>

          <Link to="/product/$slug" params={{ slug: tile1.slug }} className="group relative overflow-hidden rounded-3xl bg-pink-light/20 min-h-[300px]">
            <img src={tile1.image} alt={tile1.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
            <div className="absolute bottom-6 inset-x-6 text-warm-white">
              <h3 className="font-display text-xl">{tile1.name}</h3>
              <p className="text-sm opacity-90">${tile1.price.toFixed(2)}</p>
            </div>
          </Link>

          <Link to="/product/$slug" params={{ slug: tile2.slug }} className="group relative overflow-hidden rounded-3xl bg-pink-light/20 min-h-[300px]">
            <img src={tile2.image} alt={tile2.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
            <div className="absolute bottom-6 inset-x-6 text-warm-white">
              <h3 className="font-display text-xl">{tile2.name}</h3>
              <p className="text-sm opacity-90">${tile2.price.toFixed(2)}</p>
            </div>
          </Link>

          <Link to="/product/$slug" params={{ slug: wide.slug }} className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-pink-light/20 min-h-[300px]">
            <img src={wide.image} alt={wide.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute top-6 end-6 bg-background/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
              Award Winning
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
            <div className="absolute bottom-6 inset-x-6 text-warm-white">
              <h3 className="font-display text-2xl">{wide.name}</h3>
              <p className="text-sm opacity-90">${wide.price.toFixed(2)}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-pink-light/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl text-center mb-16">{t("sections.categories")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {categories.map((c, i) => {
              const img = products.find((p) => p.category === c.key)?.image;
              return (
                <Link
                  key={c.key}
                  to="/shop"
                  search={{ category: c.key }}
                  className="text-center group"
                >
                  <div className="aspect-square rounded-full bg-warm-white border border-rose/20 mb-6 overflow-hidden transition-transform group-hover:-translate-y-2 shadow-[0_20px_60px_-30px_rgba(196,92,124,0.4)]">
                    <img src={img} alt={c.label} className="w-full h-full object-cover opacity-90" />
                  </div>
                  <h4 className="font-display text-lg uppercase tracking-widest">{t(`nav.${c.key}`)}</h4>
                  <p className="text-xs mt-1 text-muted-foreground">
                    {products.filter((p) => p.category === c.key).length} products
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-3">★ Top Rated</p>
            <h2 className="font-display text-4xl md:text-5xl">{t("sections.bestsellers")}</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-rose">
            {t("sections.viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BEAUTY TIPS */}
      <section className="bg-foreground text-background py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display text-4xl md:text-5xl">{t("sections.tips")}</h2>
            <a href="#" className="text-xs font-bold uppercase tracking-widest border-b border-background/40 pb-1">
              {t("sections.viewAll")}
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "The Glass-Skin Ritual", img: "photo-1556228720-195a672e8a03", tag: "Skincare" },
              { title: "A Rose-Tinted Lip in 60s", img: "photo-1586495777744-4413f21062fa", tag: "Makeup" },
              { title: "Scalp Care for Healthy Hair", img: "photo-1626282874430-c11ae32d2898", tag: "Haircare" },
            ].map((tip) => (
              <article key={tip.title} className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                  <img
                    src={`https://images.unsplash.com/${tip.img}?auto=format&fit=crop&w=900&q=80`}
                    alt={tip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs uppercase tracking-widest text-rose mb-2">{tip.tag}</p>
                <h3 className="font-display text-2xl mb-2">{tip.title}</h3>
                <p className="text-sm text-background/60">A three-step morning ceremony designed for a luminous, satin-finish glow that lasts.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-16">{t("sections.testimonials")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Layla A.", text: "Glowify changed my morning routine. The Hydra-Satin Dew is unmatched." },
            { name: "Noor K.", text: "Finally a brand that delivers on luxury and clean ingredients." },
            { name: "Sofia M.", text: "The packaging alone is worth it. The formulas are incredible." },
          ].map((r) => (
            <div key={r.name} className="bg-warm-white rounded-3xl p-8 border border-rose/10">
              <div className="flex gap-1 mb-4 text-rose">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-rose" />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-6">"{r.text}"</p>
              <p className="text-xs uppercase tracking-widest font-bold">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-5xl mb-6">{t("sections.newsletter")}</h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">{t("sections.newsletterBody")}</p>
        <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder={t("sections.email")}
            className="flex-1 bg-warm-white border border-rose/20 rounded-full px-8 py-4 focus:outline-none focus:border-rose"
          />
          <button
            type="submit"
            className="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-deep transition"
          >
            {t("sections.subscribe")}
          </button>
        </form>
      </section>
    </div>
  );
}
