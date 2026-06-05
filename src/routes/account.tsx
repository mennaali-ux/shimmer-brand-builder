import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Heart, MapPin, CreditCard, LogOut, Sparkles } from "lucide-react";
import { useWishlist } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Glowify" }] }),
  component: AccountPage,
});

const recentOrders = [
  { id: "GLW-10421", date: "Mar 28, 2026", total: 142.5, status: "Delivered" },
  { id: "GLW-10387", date: "Mar 14, 2026", total: 86.0, status: "Delivered" },
  { id: "GLW-10342", date: "Feb 22, 2026", total: 215.0, status: "Delivered" },
];

function AccountPage() {
  const wishCount = useWishlist((s) => s.ids.length);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
        <div className="flex items-center gap-5">
          <div className="size-20 rounded-full bg-gradient-to-br from-rose to-rose-deep grid place-items-center text-warm-white font-display text-3xl">
            L
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-1">Inner Circle Member</p>
            <h1 className="font-display text-4xl">Welcome back, Layla.</h1>
            <p className="text-sm text-muted-foreground mt-1">layla@example.com</p>
          </div>
        </div>
        <Link to="/auth" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-foreground/20 px-5 py-3 rounded-full hover:bg-warm-white">
          <LogOut className="size-4" /> Sign out
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-12">
        <Stat label="Total orders" value="14" />
        <Stat label="Glow Points" value="1,280" />
        <Stat label="Wishlist" value={String(wishCount)} />
        <Stat label="Saved cards" value="2" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <ActionCard to="/orders" icon={<Package className="size-5 text-rose" />} title="Orders" desc="Track and manage your past purchases." />
        <ActionCard to="/wishlist" icon={<Heart className="size-5 text-rose" />} title="Wishlist" desc={`${wishCount} item${wishCount === 1 ? "" : "s"} saved for later.`} />
        <ActionCard to="/account" icon={<MapPin className="size-5 text-rose" />} title="Addresses" desc="Manage shipping & billing addresses." />
        <ActionCard to="/account" icon={<CreditCard className="size-5 text-rose" />} title="Payment methods" desc="Two cards saved securely." />
        <ActionCard to="/account" icon={<Sparkles className="size-5 text-rose" />} title="Glow rewards" desc="1,280 points · 2 free gifts unlocked." />
      </div>

      <div className="bg-warm-white border border-rose/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">Recent orders</h2>
          <Link to="/orders" className="text-xs uppercase tracking-widest underline">View all</Link>
        </div>
        <div className="divide-y divide-rose/10">
          {recentOrders.map((o) => (
            <div key={o.id} className="flex items-center justify-between py-4 text-sm">
              <div>
                <p className="font-bold">{o.id}</p>
                <p className="text-xs text-muted-foreground mt-1">{o.date}</p>
              </div>
              <div className="text-end">
                <p className="font-medium">${o.total.toFixed(2)}</p>
                <span className="text-[10px] uppercase tracking-widest text-green-600 font-bold">{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-warm-white border border-rose/10 rounded-3xl p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
      <p className="font-display text-4xl">{value}</p>
    </div>
  );
}

function ActionCard({ to, icon, title, desc }: { to: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link to={to} className="block bg-warm-white border border-rose/10 rounded-3xl p-6 hover:border-rose transition group">
      <div className="size-10 rounded-full bg-pink-light/30 grid place-items-center mb-4">{icon}</div>
      <h3 className="font-display text-xl mb-1 group-hover:text-rose transition">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </Link>
  );
}
