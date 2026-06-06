import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Mail } from "lucide-react";
import { customers } from "@/lib/products";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({ meta: [{ title: "Customers — Glowify Admin" }] }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const [query, setQuery] = useState("");
  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">CRM</p>
        <h1 className="font-display text-4xl md:text-5xl">Customers</h1>
        <p className="text-sm text-muted-foreground mt-2">{customers.length} customers in your circle</p>
      </div>

      <div className="relative max-w-md mb-6">
        <Search className="absolute top-1/2 -translate-y-1/2 start-4 size-4 text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers..."
          className="w-full bg-warm-white border border-rose/20 rounded-full ps-11 pe-4 py-2.5 text-sm focus:outline-none focus:border-rose" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="bg-warm-white border border-rose/10 rounded-3xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <img src={c.avatar} alt={c.name} loading="lazy" className="size-14 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="font-display text-xl truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div className="bg-pink-light/20 rounded-2xl p-3">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Orders</p>
                <p className="font-display text-2xl">{c.orders}</p>
              </div>
              <div className="bg-pink-light/20 rounded-2xl p-3">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Spent</p>
                <p className="font-display text-2xl">${c.spent.toFixed(0)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Joined {c.joined}</span>
              <button onClick={() => alert(`Emailing ${c.name}`)} className="inline-flex items-center gap-1 font-bold uppercase tracking-widest hover:text-rose">
                <Mail className="size-3" /> Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
