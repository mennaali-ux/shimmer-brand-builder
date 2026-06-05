import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/products";
import { useWishlist } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Glowify" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="size-12 rounded-full bg-pink-light/30 grid place-items-center">
          <Heart className="size-5 text-rose" />
        </div>
        <div>
          <h1 className="font-display text-4xl md:text-5xl">Your Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} item{items.length === 1 ? "" : "s"} saved</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-warm-white border border-rose/10 rounded-3xl p-16 text-center">
          <p className="font-display text-3xl mb-4">Nothing saved yet.</p>
          <p className="text-muted-foreground mb-8">Tap the heart on any product to add it to your wishlist.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs">
            Discover products <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
