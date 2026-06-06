import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";
import { products, orders, customers } from "@/lib/products";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Glowify Admin" }] }),
  component: AdminAnalytics,
});

const monthly = [
  { m: "Oct", revenue: 28400, orders: 412 },
  { m: "Nov", revenue: 34800, orders: 521 },
  { m: "Dec", revenue: 52100, orders: 712 },
  { m: "Jan", revenue: 38900, orders: 480 },
  { m: "Feb", revenue: 41200, orders: 528 },
  { m: "Mar", revenue: 48920, orders: 612 },
];

const channels = [
  { label: "Direct",      value: 42, color: "bg-rose" },
  { label: "Instagram",   value: 28, color: "bg-rose-deep" },
  { label: "TikTok",      value: 15, color: "bg-pink-light" },
  { label: "Email",       value: 10, color: "bg-foreground" },
  { label: "Affiliate",   value:  5, color: "bg-amber-400" },
];

function AdminAnalytics() {
  const max = Math.max(...monthly.map((m) => m.revenue));
  const totalRev = monthly.reduce((a, m) => a + m.revenue, 0);
  const totalOrders = monthly.reduce((a, m) => a + m.orders, 0);
  const aov = totalRev / totalOrders;
  const catBreakdown = ["skincare", "makeup", "haircare", "fragrance", "bodycare", "tools"].map((c) => ({
    cat: c,
    count: products.filter((p) => p.category === c).length,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Insights</p>
        <h1 className="font-display text-4xl md:text-5xl">Analytics & Reports</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Kpi icon={<DollarSign className="size-5 text-rose" />} label="6-month revenue" value={`$${(totalRev/1000).toFixed(1)}k`} delta="+18.2%" />
        <Kpi icon={<ShoppingBag className="size-5 text-rose" />} label="6-month orders" value={totalOrders.toLocaleString()} delta="+11.4%" />
        <Kpi icon={<TrendingUp className="size-5 text-rose" />} label="Avg order value" value={`$${aov.toFixed(2)}`} delta="+6.1%" />
        <Kpi icon={<Users className="size-5 text-rose" />} label="Active customers" value={(customers.length * 451).toLocaleString()} delta="+5.1%" />
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mb-8">
        <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
          <h2 className="font-display text-2xl mb-6">Revenue by month</h2>
          <div className="flex items-end gap-4 h-56">
            {monthly.map((m) => (
              <div key={m.m} className="flex-1 flex flex-col items-center justify-end gap-2">
                <span className="text-[10px] font-bold">${(m.revenue/1000).toFixed(0)}k</span>
                <div className="w-full bg-gradient-to-t from-rose to-pink-light rounded-t-xl" style={{ height: `${(m.revenue/max)*100}%` }} />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
          <h2 className="font-display text-2xl mb-6">Traffic sources</h2>
          <div className="space-y-4">
            {channels.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{c.label}</span><span className="font-bold">{c.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-pink-light/30 overflow-hidden">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.value*2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
        <h2 className="font-display text-2xl mb-6">Category mix</h2>
        <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {catBreakdown.map((c) => (
            <div key={c.cat} className="bg-pink-light/15 rounded-2xl p-4 text-center">
              <p className="font-display text-3xl">{c.count}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 capitalize">{c.cat}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-6">Computed from current catalog ({products.length} products) and last {orders.length} orders.</p>
      </div>
    </div>
  );
}

function Kpi({ icon, label, value, delta }: { icon: React.ReactNode; label: string; value: string; delta: string }) {
  return (
    <div className="bg-warm-white border border-rose/10 rounded-3xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="size-10 rounded-full bg-pink-light/30 grid place-items-center">{icon}</div>
        <span className="text-xs font-bold text-green-600">{delta}</span>
      </div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className="font-display text-3xl">{value}</p>
    </div>
  );
}
