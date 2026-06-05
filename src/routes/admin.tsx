import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, ShoppingBag, Users, TrendingUp, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Glowify" }] }),
  component: AdminPage,
});

const stats = [
  { label: "Revenue", value: "$48,920", delta: 12.5, icon: DollarSign },
  { label: "Orders", value: "1,284", delta: 8.2, icon: ShoppingBag },
  { label: "Customers", value: "3,610", delta: 5.1, icon: Users },
  { label: "Conversion", value: "4.8%", delta: -1.4, icon: TrendingUp },
];

const recentOrders = [
  { id: "GLW-10428", customer: "Layla Ahmed", total: 142.5, status: "Processing", date: "5 min ago" },
  { id: "GLW-10427", customer: "Noor Khaled", total: 86.0, status: "Shipped", date: "32 min ago" },
  { id: "GLW-10426", customer: "Sofia Mansour", total: 215.0, status: "Delivered", date: "1 h ago" },
  { id: "GLW-10425", customer: "Aya Salim", total: 64.0, status: "Delivered", date: "2 h ago" },
  { id: "GLW-10424", customer: "Mira Halabi", total: 198.0, status: "Refunded", date: "3 h ago" },
];

const statusColor: Record<string, string> = {
  Processing: "bg-amber-100 text-amber-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Refunded: "bg-rose-100 text-rose-800",
};

function AdminPage() {
  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Internal</p>
          <h1 className="font-display text-4xl md:text-5xl">Admin Dashboard</h1>
        </div>
        <select className="bg-warm-white border border-rose/20 rounded-full px-5 py-2.5 text-sm">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>This year</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-warm-white border border-rose/10 rounded-3xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 rounded-full bg-pink-light/30 grid place-items-center">
                <s.icon className="size-5 text-rose" />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-bold ${s.delta > 0 ? "text-green-600" : "text-rose-deep"}`}>
                {s.delta > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {Math.abs(s.delta)}%
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
            <p className="font-display text-3xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
        <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
          <h2 className="font-display text-2xl mb-6">Sales overview</h2>
          <div className="flex items-end gap-2 h-48">
            {[40, 65, 50, 78, 60, 90, 72, 95, 80, 100, 85, 110].map((v, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-rose to-pink-light/40 rounded-t-xl" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
          <h2 className="font-display text-2xl mb-6">Top products</h2>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                <img src={p.image} alt={p.name} loading="lazy" className="size-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.reviewCount} sold</p>
                </div>
                <p className="text-sm font-bold">${p.price.toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-warm-white border border-rose/10 rounded-3xl p-8 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">Recent orders</h2>
          <button className="text-xs uppercase tracking-widest underline">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-start text-xs uppercase tracking-widest text-muted-foreground border-b border-rose/10">
                <th className="pb-3 text-start">Order</th>
                <th className="pb-3 text-start">Customer</th>
                <th className="pb-3 text-start">Total</th>
                <th className="pb-3 text-start">Status</th>
                <th className="pb-3 text-end">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-rose/5">
                  <td className="py-4 font-bold">{o.id}</td>
                  <td className="py-4">{o.customer}</td>
                  <td className="py-4">${o.total.toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-4 text-end text-xs text-muted-foreground">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-warm-white border border-rose/10 rounded-3xl p-8 mt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl">Inventory</h2>
            <p className="text-xs text-muted-foreground mt-1">{products.length} products in catalog</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Package className="size-4" /> Add product
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-2xl border border-rose/10">
              <img src={p.image} alt={p.name} loading="lazy" className="size-14 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">Stock: {p.stock}</p>
              </div>
              <span className={`size-2 rounded-full ${p.stock > 20 ? "bg-green-500" : p.stock > 5 ? "bg-amber-500" : "bg-rose-deep"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
