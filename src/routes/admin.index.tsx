import { createFileRoute, Link } from "@tanstack/react-router";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";
import { useCatalog } from "@/lib/store";
import { orders, customers } from "@/lib/products";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Overview — Glowify Admin" }] }),
  component: AdminOverview,
});

const statusColor: Record<string, string> = {
  Processing: "bg-amber-100 text-amber-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Refunded: "bg-rose-100 text-rose-800",
};

function AdminOverview() {
  const products = useCatalog((s) => s.products);
  const totalRevenue = orders.filter((o) => o.status !== "Refunded").reduce((a, o) => a + o.total, 0);
  const lowStock = products.filter((p) => p.stock <= 20).slice(0, 6);
  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  const stats = [
    { label: "Total Products", value: String(products.length), delta: 4.2, icon: ShoppingBag },
    { label: "Total Orders",   value: "1,284",                  delta: 8.2, icon: ShoppingBag },
    { label: "Customers",      value: String(customers.length * 451), delta: 5.1, icon: Users },
    { label: "Revenue",        value: `$${totalRevenue.toFixed(0)}`, delta: 12.5, icon: DollarSign },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Dashboard</p>
          <h1 className="font-display text-4xl md:text-5xl">Overview</h1>
        </div>
        <select className="bg-warm-white border border-rose/20 rounded-full px-5 py-2.5 text-sm">
          <option>Last 30 days</option><option>Last 7 days</option><option>This year</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-warm-white border border-rose/10 rounded-3xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 rounded-full bg-pink-light/30 grid place-items-center"><s.icon className="size-5 text-rose" /></div>
              <span className={`inline-flex items-center gap-1 text-xs font-bold ${s.delta > 0 ? "text-green-600" : "text-rose-deep"}`}>
                {s.delta > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{Math.abs(s.delta)}%
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
            <p className="font-display text-3xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mb-8">
        <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl">Revenue overview</h2>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600">
              <TrendingUp className="size-3" /> +12.5%
            </div>
          </div>
          <div className="flex items-end gap-2 h-48">
            {[40, 65, 50, 78, 60, 90, 72, 95, 80, 100, 85, 110].map((v, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-rose to-pink-light/40 rounded-t-xl" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            {["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
          <h2 className="font-display text-2xl mb-6">Best sellers</h2>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="flex items-center gap-3 hover:bg-pink-light/10 -mx-2 p-2 rounded-xl">
                <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                <img src={p.image} alt={p.name} loading="lazy" className="size-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.reviewCount} sold</p>
                </div>
                <p className="text-sm font-bold">${p.price.toFixed(0)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
        <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl">Recent orders</h2>
            <Link to="/admin/orders" className="text-xs uppercase tracking-widest underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-muted-foreground border-b border-rose/10">
                  <th className="pb-3 text-start">Order</th>
                  <th className="pb-3 text-start">Customer</th>
                  <th className="pb-3 text-start">Total</th>
                  <th className="pb-3 text-start">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-b border-rose/5">
                    <td className="py-3 font-bold">{o.id}</td>
                    <td className="py-3">{o.customer}</td>
                    <td className="py-3">${o.total.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl inline-flex items-center gap-2">
              <AlertTriangle className="size-5 text-amber-500" /> Low stock
            </h2>
            <Link to="/admin/inventory" className="text-xs uppercase tracking-widest underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt={p.name} loading="lazy" className="size-10 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">SKU {p.id.toUpperCase()}</p>
                </div>
                <span className={`text-xs font-bold ${p.stock <= 10 ? "text-rose-deep" : "text-amber-600"}`}>{p.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
