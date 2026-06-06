import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, AlertTriangle, TrendingDown } from "lucide-react";
import { useCatalog } from "@/lib/store";

export const Route = createFileRoute("/admin/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Glowify Admin" }] }),
  component: AdminInventory,
});

function AdminInventory() {
  const products = useCatalog((s) => s.products);
  const updateStock = useCatalog((s) => s.updateStock);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");

  const filtered = useMemo(() => products.filter((p) => {
    if (filter === "low" && p.stock > 20) return false;
    if (filter === "out" && p.stock !== 0) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [products, query, filter]);

  const lowCount = products.filter((p) => p.stock <= 20 && p.stock > 0).length;
  const outCount = products.filter((p) => p.stock === 0).length;
  const totalUnits = products.reduce((a, p) => a + p.stock, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Warehouse</p>
        <h1 className="font-display text-4xl md:text-5xl">Inventory</h1>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Stat icon={<TrendingDown className="size-5 text-rose" />} label="Total units" value={String(totalUnits)} />
        <Stat icon={<AlertTriangle className="size-5 text-amber-500" />} label="Low stock" value={String(lowCount)} />
        <Stat icon={<AlertTriangle className="size-5 text-rose-deep" />} label="Out of stock" value={String(outCount)} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute top-1/2 -translate-y-1/2 start-4 size-4 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search inventory..."
            className="w-full bg-warm-white border border-rose/20 rounded-full ps-11 pe-4 py-2.5 text-sm focus:outline-none focus:border-rose" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="bg-warm-white border border-rose/20 rounded-full px-5 py-2.5 text-sm">
          <option value="all">All</option>
          <option value="low">Low stock</option>
          <option value="out">Out of stock</option>
        </select>
      </div>

      <div className="bg-warm-white border border-rose/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-pink-light/20">
              <tr className="text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4 text-start">Product</th>
                <th className="px-4 py-4 text-start">SKU</th>
                <th className="px-4 py-4 text-end">Price</th>
                <th className="px-4 py-4 text-end">Stock</th>
                <th className="px-4 py-4 text-start">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-rose/5">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} loading="lazy" className="size-10 rounded-xl object-cover" />
                      <p className="font-medium">{p.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{p.id.toUpperCase()}</td>
                  <td className="px-4 py-3 text-end">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-end">
                    <input type="number" value={p.stock} min={0}
                      onChange={(e) => updateStock(p.id, Math.max(0, Number(e.target.value)))}
                      className="w-20 bg-background border border-rose/20 rounded-lg px-2 py-1 text-end" />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      p.stock === 0 ? "bg-rose-100 text-rose-800" :
                      p.stock <= 20 ? "bg-amber-100 text-amber-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {p.stock === 0 ? "Out" : p.stock <= 20 ? "Low" : "In stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-warm-white border border-rose/10 rounded-3xl p-6">
      <div className="size-10 rounded-full bg-pink-light/30 grid place-items-center mb-3">{icon}</div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p className="font-display text-3xl">{value}</p>
    </div>
  );
}
