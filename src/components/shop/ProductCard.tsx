import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const wishHas = useWishlist((s) => s.ids.includes(product.id));
  const wishToggle = useWishlist((s) => s.toggle);

  return (
    <div className="group">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="aspect-[4/5] bg-pink-light/20 rounded-3xl overflow-hidden relative mb-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.tags.includes("sale") && (
            <span className="absolute top-4 start-4 bg-rose-deep text-warm-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Sale
            </span>
          )}
          {product.tags.includes("new") && !product.tags.includes("sale") && (
            <span className="absolute top-4 start-4 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              New
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              wishToggle(product.id);
            }}
            className="absolute top-4 end-4 size-9 grid place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background transition"
            aria-label="Wishlist"
          >
            <Heart className={`size-4 ${wishHas ? "fill-rose text-rose" : ""}`} />
          </button>
        </div>
      </Link>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-rose-deep/60 mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-lg truncate">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-medium">${product.price.toFixed(2)}</p>
            {product.oldPrice && (
              <p className="text-sm text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => add(product.id)}
          className="shrink-0 bg-foreground text-background size-10 rounded-full grid place-items-center hover:bg-rose transition-colors font-bold"
          aria-label="Add to cart"
        >
          +
        </button>
      </div>
    </div>
  );
}
