import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { orders, type Order, type OrderStatus, products } from "@/lib/products";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders — Glowify Admin" }] }),
  component: AdminOrders,
});

const statusColor: Record<OrderStatus, string> = {
  Processing: "bg-amber-100 text-amber-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Refunded: "bg-rose-100 text-rose-800",
};

const allStatuses: OrderStatus[] = ["Processing", "Shipped", "Delivered", "Refunded"];

function AdminOrders() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [statuses, setStatuses] = useState<Record<string, OrderStatus>>(() =>
    Object.fromEntries(orders.map((o) => [o.id, o.status]))
  );
  const [open, setOpen] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const status = statuses[o.id];
    if (filter !== "all" && status !== filter) return false;
    if (query && !o.id.toLowerCase().includes(query.toLowerCase()) && !o.customer.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Sales</p>
        <h1 className="font-display text-4xl md:text-5xl">Orders</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute top-1/2 -translate-y-1/2 start-4 size-4 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by order ID or customer..."
            className="w-full bg-warm-white border border-rose/20 rounded-full ps-11 pe-4 py-2.5 text-sm focus:outline-none focus:border-rose" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as OrderStatus | "all")}
          className="bg-warm-white border border-rose/20 rounded-full px-5 py-2.5 text-sm">
          <option value="all">All statuses</option>
          {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-warm-white border border-rose/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-pink-light/20">
              <tr className="text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4 text-start">Order</th>
                <th className="px-4 py-4 text-start">Customer</th>
                <th className="px-4 py-4 text-start">Date</th>
                <th className="px-4 py-4 text-end">Total</th>
                <th className="px-4 py-4 text-start">Status</th>
                <th className="px-4 py-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t border-rose/5">
                  <td className="px-6 py-3 font-bold">{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{o.customer}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </td>
                  <td className="px-4 py-3">{o.date}</td>
                  <td className="px-4 py-3 text-end">${o.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <select value={statuses[o.id]} onChange={(e) => setStatuses({ ...statuses, [o.id]: e.target.value as OrderStatus })}
                      className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border-0 ${statusColor[statuses[o.id]]}`}>
                      {allStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button onClick={() => setOpen(o)} className="text-xs uppercase tracking-widest underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(null)} />
          <div className="relative ms-auto h-full w-full max-w-lg bg-background overflow-auto">
            <div className="sticky top-0 bg-background border-b border-rose/10 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-display text-xl">Order {open.id}</h2>
              <button onClick={() => setOpen(null)}><X className="size-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Customer</p>
                <p className="font-medium">{open.customer}</p>
                <p className="text-sm text-muted-foreground">{open.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Ship to</p>
                <p className="text-sm">{open.address}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Items</p>
                <div className="space-y-3">
                  {open.items.map((i) => {
                    const p = products.find((x) => x.id === i.productId);
                    if (!p) return null;
                    return (
                      <div key={i.productId} className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} loading="lazy" className="size-12 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground">× {i.qty}</p>
                        </div>
                        <p className="text-sm font-bold">${(i.price * i.qty).toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="border-t border-rose/10 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${(open.total - open.shipping).toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{open.shipping === 0 ? "Free" : `$${open.shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-lg font-bold pt-2"><span>Total</span><span>${open.total.toFixed(2)}</span></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => alert("Invoice downloaded")} className="flex-1 border border-foreground/20 rounded-full py-3 text-xs font-bold uppercase tracking-widest">Invoice</button>
                <Link to="/orders/$id" params={{ id: open.id }} className="flex-1 text-center bg-foreground text-background rounded-full py-3 text-xs font-bold uppercase tracking-widest">Tracking</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
