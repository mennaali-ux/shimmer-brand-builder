import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Instagram, Music2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Glowify Cosmetics" },
      { name: "description", content: "Get in touch with the Glowify Cosmetics team — boutiques, customer care and partnership inquiries." },
      { property: "og:title", content: "Contact Glowify" },
      { property: "og:description", content: "We're here to help with anything you need." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-3">Contact</p>
      <h1 className="font-display text-5xl md:text-6xl mb-16">Let's talk.</h1>

      <div className="grid md:grid-cols-[1fr_400px] gap-12">
        {sent ? (
          <div className="bg-warm-white border border-rose/10 rounded-3xl p-16 text-center">
            <h2 className="font-display text-4xl mb-4">Message received.</h2>
            <p className="text-muted-foreground mb-8">Our team will get back to you within 24 hours.</p>
            <button onClick={() => setSent(false)} className="text-xs uppercase tracking-widest underline">Send another</button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="bg-warm-white border border-rose/10 rounded-3xl p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
            <Field label="Email" type="email" required />
            <Field label="Subject" required />
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">Message</span>
              <textarea required rows={5} className="w-full bg-background border border-rose/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose" />
            </label>
            <button type="submit" className="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-deep transition">
              Send message
            </button>
          </form>
        )}

        <aside className="space-y-6">
          <Info icon={<Mail className="size-5 text-rose" />} title="Email" lines={["care@glowify.com", "press@glowify.com"]} />
          <Info icon={<Phone className="size-5 text-rose" />} title="Phone" lines={["+966 11 484 9000", "Sat–Thu, 9am–8pm"]} />
          <Info icon={<MapPin className="size-5 text-rose" />} title="Flagship" lines={["Olaya Tower, 4th Floor", "Riyadh, Saudi Arabia"]} />
          <Info icon={<Clock className="size-5 text-rose" />} title="Hours" lines={["Daily 10am – 10pm", "Holidays 12pm – 8pm"]} />
          <div className="bg-warm-white border border-rose/10 rounded-3xl p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Follow</h4>
            <div className="flex gap-4 text-rose">
              <a href="#" aria-label="Instagram"><Instagram className="size-5" /></a>
              <a href="#" aria-label="TikTok"><Music2 className="size-5" /></a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">{label}</span>
      <input {...props} className="w-full bg-background border border-rose/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose" />
    </label>
  );
}

function Info({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="bg-warm-white border border-rose/10 rounded-3xl p-6 flex gap-4">
      <div className="shrink-0 size-10 rounded-full bg-pink-light/30 grid place-items-center">{icon}</div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest mb-2">{title}</h4>
        {lines.map((l) => <p key={l} className="text-sm text-foreground/80">{l}</p>)}
      </div>
    </div>
  );
}
