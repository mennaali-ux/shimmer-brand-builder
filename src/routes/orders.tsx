import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Truck, CheckCircle2 } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Order History — Glowify" }] }),
  component: OrdersPage,
});

const orders = [
  {
    id: "GLW-10421",
    date: "Mar 28, 2026",
    status: "delivered",
    total: 142.5,
    items: [products[0], products[1]],
  },
  {
    id: "GLW-10387",
    date: "Mar 14, 2026",
    status: "shipped",
    total: 86.0,
    items: [products[2]],
  },
  {
    id: "GLW-10342",
    date: "Feb 22, 2026",
    status: "delivered",
    total: 215.0,
    items: [products[3], products[4], products[5]],
  },
  {
    id: "GLW-10301",
    date: "Feb 04, 2026",
    status: "delivered",
    total: 64.0,
    items: [products[7]],
  },
] as const;

const statusMap = {
  delivered: { label: "Delivered", icon: CheckCircle2, color: "text-green-600" },
  shipped: { label: "In transit", icon: Truck, color: "text-rose" },
  processing: { label: "Processing", icon: Package, color: "text-amber-600" },
} as const;

function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-3">Account</p>
      <h1 className="font-display text-5xl md:text-6xl mb-12">Order History</h1>

      <div className="space-y-6">
        {orders.map((o) => {
          const s = statusMap[o.status as keyof typeof statusMap];
          return (
            <div key={o.id} className="bg-warm-white border border-rose/10 rounded-3xl p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-rose/10">
                <div>
                  <p className="font-bold">{o.id}</p>
                  <p className="text-xs text-muted-foreground mt-1">{o.date}</p>
                </div>
                <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${s.color}`}>
                  <s.icon className="size-4" /> {s.label}
                </div>
                <p className="font-display text-xl">${o.total.toFixed(2)}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {o.items.map((p) => (
                  <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} loading="lazy" className="size-16 rounded-2xl object-cover" />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex gap-3 mt-6 pt-6 border-t border-rose/10">
                <button className="text-xs uppercase tracking-widest border border-foreground/20 px-5 py-2.5 rounded-full hover:bg-pink-light/20">Reorder</button>
                <button className="text-xs uppercase tracking-widest border border-foreground/20 px-5 py-2.5 rounded-full hover:bg-pink-light/20">Track package</button>
                <button className="text-xs uppercase tracking-widest border border-foreground/20 px-5 py-2.5 rounded-full hover:bg-pink-light/20">Download invoice</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
