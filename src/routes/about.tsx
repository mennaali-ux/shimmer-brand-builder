import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Sparkles, ShieldCheck, Award } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import storeInterior from "@/assets/store-interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Glowify Cosmetics" },
      { name: "description", content: "Glowify Cosmetics — botanical-first luxury beauty crafted in small batches with intention." },
      { property: "og:title", content: "Our Story — Glowify" },
      { property: "og:description", content: "Botanical-first beauty, crafted with intention." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Leaf, title: "Botanical-first", body: "Every formula starts with sustainably sourced botanicals — never synthetic shortcuts." },
  { icon: ShieldCheck, title: "Clinically proven", body: "Every product is dermatologist-tested and supported by independent clinical studies." },
  { icon: Sparkles, title: "Ritual, not routine", body: "Beauty is a daily ceremony. We design tools and textures that turn care into ritual." },
  { icon: Award, title: "Award winning", body: "Honored by Allure, Cosmopolitan and Vogue Arabia across the last three years." },
];

const team = [
  { name: "Mira Halabi", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
  { name: "Dr. Reem Salah", role: "Head of Formulation", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name: "Yara Othman", role: "Head of Sustainability", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80" },
];

function AboutPage() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[480px] flex items-center overflow-hidden">
        <img src={aboutHero} alt="Glowify lab" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30" />
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-deep mb-6">Our Story</p>
          <h1 className="font-display text-6xl md:text-7xl tracking-tighter max-w-xl">A ritual of radiance, since 2018.</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-8">Beauty that begins with intention.</h2>
        <p className="text-lg leading-loose text-foreground/80">
          Glowify Cosmetics was born in a small Beirut atelier with a single belief: that
          luxury beauty should never compromise on ethics. Today, our laboratories blend
          centuries-old botanical wisdom with modern dermatological science to create
          formulas that perform — and feel — extraordinary.
        </p>
      </section>

      <section className="bg-pink-light/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl mb-12 text-center">What we stand for</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-background rounded-3xl p-8 border border-rose/10">
                <v.icon className="size-8 text-rose mb-6" />
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-display text-4xl mb-12 text-center">The atelier</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((p) => (
            <div key={p.name} className="text-center">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-2xl">{p.name}</h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{p.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative h-[60vh] overflow-hidden">
        <img src={storeInterior} alt="Glowify boutique interior" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16 text-warm-white">
          <h2 className="font-display text-5xl max-w-xl mb-6">Visit the flagship.</h2>
          <p className="max-w-md opacity-90 mb-6">Touch every formula, chat with our beauty advisors, and book complimentary masterclasses in store.</p>
          <Link to="/contact" className="bg-warm-white text-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs w-fit">
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
