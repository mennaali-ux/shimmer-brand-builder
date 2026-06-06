import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Circle, Package, MapPin, ArrowLeft } from "lucide-react";
import { getOrder, products, type Order } from "@/lib/products";

type LoaderData = { order: Order };

export const Route = createFileRoute("/orders/$id")({
  loader: ({ params }): LoaderData => {
    const order = getOrder(params.id);
    if (!order) throw notFound();
    return { order };
  },
  head: ({ loaderData }: { loaderData?: LoaderData }) => ({
    meta: [{ title: loaderData ? `Order ${loaderData.order.id} — Glowify` : "Order — Glowify" }],
  }),
  errorComponent: () => <div className="p-24 text-center">Couldn't load order.</div>,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto p-24 text-center">
      <h1 className="font-display text-4xl mb-4">Order not found</h1>
      <p className="text-muted-foreground mb-6">Check the ID or sign in to view your full history.</p>
      <Link to="/orders" className="inline-flex items-center gap-2 underline text-rose">Back to order history</Link>
    </div>
  ),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const { order } = Route.useLoaderData() as LoaderData;
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <Link to="/orders" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-rose mb-8">
        <ArrowLeft className="size-3" /> All orders
      </Link>

      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-3">Order tracking</p>
          <h1 className="font-display text-4xl md:text-5xl">{order.id}</h1>
          <p className="text-sm text-muted-foreground mt-2">Placed on {order.date}</p>
        </div>
        <div className="text-end">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Total</p>
          <p className="font-display text-3xl">${order.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div className="bg-warm-white border border-rose/10 rounded-3xl p-6 md:p-8">
            <h2 className="font-display text-2xl mb-6 inline-flex items-center gap-2"><Package className="size-5 text-rose" /> Progress</h2>
            <ol className="space-y-5">
              {order.tracking.map((t, i) => (
                <li key={i} className="flex gap-4">
                  {t.done ? <CheckCircle2 className="size-5 text-rose mt-0.5" /> : <Circle className="size-5 text-muted-foreground mt-0.5" />}
                  <div className="flex-1">
                    <p className={`font-medium ${t.done ? "" : "text-muted-foreground"}`}>{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.done ? t.date : "Pending"}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-warm-white border border-rose/10 rounded-3xl p-6 md:p-8">
            <h2 className="font-display text-2xl mb-6">Items</h2>
            <div className="divide-y divide-rose/10">
              {order.items.map((i) => {
                const p = products.find((x) => x.id === i.productId);
                if (!p) return null;
                return (
                  <Link key={i.productId} to="/product/$slug" params={{ slug: p.slug }} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <img src={p.image} alt={p.name} loading="lazy" className="size-16 rounded-2xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">× {i.qty} · ${i.price.toFixed(2)}</p>
                    </div>
                    <p className="font-bold">${(i.price * i.qty).toFixed(2)}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-warm-white border border-rose/10 rounded-3xl p-6">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 inline-flex items-center gap-2"><MapPin className="size-3" /> Shipping to</h3>
            <p className="text-sm">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.address}</p>
          </div>
          <div className="bg-warm-white border border-rose/10 rounded-3xl p-6 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${(order.total - order.shipping).toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-rose/10 mt-2"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
          </div>
          <button onClick={() => alert("Invoice downloaded")} className="w-full border border-foreground/20 rounded-full py-3 text-xs font-bold uppercase tracking-widest hover:bg-pink-light/20">
            Download invoice
          </button>
          <Link to="/contact" className="block text-center bg-foreground text-background rounded-full py-3 text-xs font-bold uppercase tracking-widest hover:bg-rose-deep">
            Contact support
          </Link>
        </aside>
      </div>
    </div>
  );
}
