import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Trash2, CheckCircle2 } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/admin/reviews")({
  head: () => ({ meta: [{ title: "Reviews — Glowify Admin" }] }),
  component: AdminReviews,
});

interface ReviewRow {
  productId: string;
  productName: string;
  productImage: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  approved: boolean;
}

function AdminReviews() {
  const all: ReviewRow[] = useMemo(() => products.flatMap((p) =>
    p.reviews.map((r, i) => ({
      productId: p.id + i, productName: p.name, productImage: p.image,
      author: r.author, rating: r.rating, text: r.text, date: r.date, approved: true,
    }))
  ), []);
  // Add a few mock pending reviews
  const pending: ReviewRow[] = [
    { productId: "pending-1", productName: products[0].name, productImage: products[0].image, author: "Hala F.", rating: 5, text: "Absolutely loved this serum. The texture is dreamy.", date: "Apr 02, 2026", approved: false },
    { productId: "pending-2", productName: products[6].name, productImage: products[6].image, author: "Dana K.", rating: 4, text: "Beautiful scent, just wish it lasted a bit longer.", date: "Apr 01, 2026", approved: false },
  ];
  const [rows, setRows] = useState<ReviewRow[]>([...pending, ...all]);
  const [tab, setTab] = useState<"all" | "pending">("all");

  const visible = rows.filter((r) => tab === "all" || !r.approved);
  const approve = (id: string) => setRows(rows.map((r) => r.productId === id ? { ...r, approved: true } : r));
  const remove = (id: string) => setRows(rows.filter((r) => r.productId !== id));

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Community</p>
          <h1 className="font-display text-4xl md:text-5xl">Reviews</h1>
        </div>
        <div className="flex gap-2 text-xs uppercase tracking-widest">
          {(["all", "pending"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full ${tab === t ? "bg-foreground text-background" : "bg-warm-white border border-rose/20"}`}>
              {t === "all" ? "All" : `Pending (${rows.filter((r) => !r.approved).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {visible.map((r) => (
          <div key={r.productId} className="bg-warm-white border border-rose/10 rounded-3xl p-6">
            <div className="flex flex-wrap items-start gap-4">
              <img src={r.productImage} alt={r.productName} loading="lazy" className="size-16 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <p className="font-bold">{r.author}</p>
                  <div className="flex gap-0.5 text-rose">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`size-3 ${i < r.rating ? "fill-rose" : ""}`} />)}
                  </div>
                  <span className="text-xs text-muted-foreground">on {r.productName}</span>
                  {!r.approved && <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Pending</span>}
                </div>
                <p className="text-sm text-foreground/80">{r.text}</p>
                <p className="text-xs text-muted-foreground mt-2">{r.date}</p>
              </div>
              <div className="flex gap-2">
                {!r.approved && (
                  <button onClick={() => approve(r.productId)} className="p-2 rounded-full hover:bg-green-100 text-green-600"><CheckCircle2 className="size-4" /></button>
                )}
                <button onClick={() => remove(r.productId)} className="p-2 rounded-full hover:bg-rose/10 text-rose-deep"><Trash2 className="size-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
