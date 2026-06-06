import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Edit3, Trash2, X } from "lucide-react";
import { useCatalog } from "@/lib/store";
import { categories, type Category, type Product } from "@/lib/products";

export const Route = createFileRoute("/admin/products")({
  head: () => ({ meta: [{ title: "Products — Glowify Admin" }] }),
  component: AdminProducts,
});

const blank: Product = {
  id: "", slug: "", name: "", brand: "Glowify", category: "skincare",
  price: 0, rating: 4.5, reviewCount: 0, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
  gallery: [], description: "", ingredients: [], benefits: [], tags: [], stock: 0, reviews: [],
};

function AdminProducts() {
  const products = useCatalog((s) => s.products);
  const upsert = useCatalog((s) => s.upsert);
  const remove = useCatalog((s) => s.remove);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [editing, setEditing] = useState<Product | null>(null);

  const filtered = useMemo(() => products.filter((p) => {
    if (cat !== "all" && p.category !== cat) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.brand.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [products, cat, query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Catalog</p>
          <h1 className="font-display text-4xl md:text-5xl">Products</h1>
          <p className="text-sm text-muted-foreground mt-2">{products.length} products in catalog</p>
        </div>
        <button onClick={() => setEditing({ ...blank, id: `p${Date.now()}` })} className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-rose-deep">
          <Plus className="size-4" /> Add product
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute top-1/2 -translate-y-1/2 start-4 size-4 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products or brand..."
            className="w-full bg-warm-white border border-rose/20 rounded-full ps-11 pe-4 py-2.5 text-sm focus:outline-none focus:border-rose" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value as Category | "all")}
          className="bg-warm-white border border-rose/20 rounded-full px-5 py-2.5 text-sm">
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
      </div>

      <div className="bg-warm-white border border-rose/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-pink-light/20">
              <tr className="text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4 text-start">Product</th>
                <th className="px-4 py-4 text-start">Brand</th>
                <th className="px-4 py-4 text-start">Category</th>
                <th className="px-4 py-4 text-end">Price</th>
                <th className="px-4 py-4 text-end">Stock</th>
                <th className="px-4 py-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-rose/5">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} loading="lazy" className="size-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">SKU {p.id.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{p.brand}</td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3 text-end">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-end">
                    <span className={p.stock <= 10 ? "text-rose-deep font-bold" : p.stock <= 25 ? "text-amber-600" : ""}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="inline-flex gap-2">
                      <button onClick={() => setEditing(p)} className="p-2 rounded-full hover:bg-pink-light/30"><Edit3 className="size-4" /></button>
                      <button onClick={() => confirm(`Delete ${p.name}?`) && remove(p.id)} className="p-2 rounded-full hover:bg-rose/10 text-rose-deep"><Trash2 className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-muted-foreground">No products match your filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <ProductDrawer
          product={editing}
          onClose={() => setEditing(null)}
          onSave={(p) => { upsert(p); setEditing(null); }}
        />
      )}
    </div>
  );
}

function ProductDrawer({ product, onClose, onSave }: { product: Product; onClose: () => void; onSave: (p: Product) => void }) {
  const [draft, setDraft] = useState<Product>(product);

  const update = <K extends keyof Product>(k: K, v: Product[K]) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const slug = draft.slug || draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          onSave({ ...draft, slug, gallery: draft.gallery?.length ? draft.gallery : [draft.image] });
        }}
        className="relative ms-auto h-full w-full max-w-lg bg-background overflow-auto"
      >
        <div className="sticky top-0 bg-background border-b border-rose/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display text-xl">{product.name ? "Edit product" : "New product"}</h2>
          <button type="button" onClick={onClose}><X className="size-5" /></button>
        </div>
        <div className="p-6 space-y-5">
          <Field label="Name" value={draft.name} onChange={(v) => update("name", v)} required />
          <Field label="Brand" value={draft.brand} onChange={(v) => update("brand", v)} required />
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">Category</span>
            <select value={draft.category} onChange={(e) => update("category", e.target.value as Category)} className="w-full bg-warm-white border border-rose/20 rounded-2xl px-4 py-3 text-sm">
              {categories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price ($)" type="number" value={String(draft.price)} onChange={(v) => update("price", Number(v))} required />
            <Field label="Stock" type="number" value={String(draft.stock)} onChange={(v) => update("stock", Number(v))} required />
          </div>
          <Field label="Image URL" value={draft.image} onChange={(v) => update("image", v)} required />
          {draft.image && <img src={draft.image} alt="preview" className="w-full aspect-video object-cover rounded-2xl" />}
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">Description</span>
            <textarea value={draft.description} onChange={(e) => update("description", e.target.value)} rows={3}
              className="w-full bg-warm-white border border-rose/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose" />
          </label>
          <Field label="Ingredients (comma-separated)" value={draft.ingredients.join(", ")} onChange={(v) => update("ingredients", v.split(",").map((x) => x.trim()).filter(Boolean))} />
          <Field label="Benefits (comma-separated)" value={draft.benefits.join(", ")} onChange={(v) => update("benefits", v.split(",").map((x) => x.trim()).filter(Boolean))} />
        </div>
        <div className="sticky bottom-0 bg-background border-t border-rose/10 px-6 py-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 border border-foreground/20 rounded-full py-3 text-xs font-bold uppercase tracking-widest">Cancel</button>
          <button type="submit" className="flex-1 bg-foreground text-background rounded-full py-3 text-xs font-bold uppercase tracking-widest hover:bg-rose-deep">Save product</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">{label}</span>
      <input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-warm-white border border-rose/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose" />
    </label>
  );
}
