import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { categories as seed } from "@/lib/products";
import { useCatalog } from "@/lib/store";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({ meta: [{ title: "Categories — Glowify Admin" }] }),
  component: AdminCategories,
});

function AdminCategories() {
  const products = useCatalog((s) => s.products);
  const [cats, setCats] = useState(seed.map((c) => ({ ...c })));
  const [adding, setAdding] = useState("");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-12">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Taxonomy</p>
        <h1 className="font-display text-4xl md:text-5xl">Categories</h1>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if (adding.trim()) { setCats([...cats, { key: adding.toLowerCase() as never, label: adding, image: seed[0].image }]); setAdding(""); } }}
        className="flex gap-3 mb-8">
        <input value={adding} onChange={(e) => setAdding(e.target.value)} placeholder="New category name..."
          className="flex-1 bg-warm-white border border-rose/20 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-rose" />
        <button className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest">
          <Plus className="size-4" /> Add
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {cats.map((c) => {
          const count = products.filter((p) => p.category === c.key).length;
          return (
            <div key={c.key} className="bg-warm-white border border-rose/10 rounded-3xl p-4 flex items-center gap-4">
              <img src={c.image} alt={c.label} loading="lazy" className="size-20 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-display text-2xl">{c.label}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{count} products</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => alert(`Editing ${c.label}`)} className="p-2 rounded-full hover:bg-pink-light/30"><Edit3 className="size-4" /></button>
                <button onClick={() => confirm(`Delete ${c.label}?`) && setCats(cats.filter((x) => x.key !== c.key))} className="p-2 rounded-full hover:bg-rose/10 text-rose-deep"><Trash2 className="size-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
