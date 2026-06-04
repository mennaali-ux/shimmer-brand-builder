import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Your Bag — Glowify" }, { name: "description", content: "Review your bag and proceed to checkout." }],
  }),
  component: CartPage,
});

function CartPage() {
  const { t } = useTranslation();
  const items = useCart((s) => s.items);
  const resolved = useCart((s) => s.resolved());
  const subtotal = useCart((s) => s.subtotal());
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-5xl mb-6">{t("cart.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("cart.empty")}</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs"
        >
          {t("cart.continue")} <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-12">{t("cart.title")}</h1>
      <div className="grid md:grid-cols-[1fr_400px] gap-12">
        <div className="space-y-6">
          {resolved.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-6 bg-warm-white rounded-3xl p-4 md:p-6 border border-rose/10">
              <Link to="/product/$slug" params={{ slug: product.slug }} className="shrink-0">
                <img src={product.image} alt={product.name} className="size-28 md:size-32 rounded-2xl object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-rose-deep/60">{product.category}</p>
                    <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display text-lg md:text-xl">
                      {product.name}
                    </Link>
                  </div>
                  <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-rose-deep">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-background border border-rose/20 rounded-full">
                    <button onClick={() => setQty(product.id, Math.max(0, qty - 1))} className="px-3 py-2 font-bold">−</button>
                    <span className="px-3 text-sm">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="px-3 py-2 font-bold">+</button>
                  </div>
                  <p className="font-medium">${(product.price * qty).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-warm-white rounded-3xl p-8 border border-rose/10 h-fit sticky top-28">
          <h2 className="font-display text-2xl mb-6">Summary</h2>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder={t("cart.coupon")}
              className="flex-1 bg-background border border-rose/20 rounded-full px-4 py-2 text-sm"
            />
            <button className="px-5 py-2 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest">
              {t("cart.apply")}
            </button>
          </div>

          <div className="space-y-3 text-sm pb-6 border-b border-rose/10">
            <div className="flex justify-between"><span>{t("cart.subtotal")}</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>{t("cart.shipping")}</span><span>{shipping === 0 ? t("cart.free") : `$${shipping.toFixed(2)}`}</span></div>
          </div>
          <div className="flex justify-between text-lg font-bold py-6">
            <span>{t("cart.total")}</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block text-center bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-deep transition"
          >
            {t("cart.checkout")}
          </Link>
        </aside>
      </div>
    </div>
  );
}
