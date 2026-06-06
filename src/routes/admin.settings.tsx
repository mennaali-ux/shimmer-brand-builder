import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Glowify Admin" }] }),
  component: AdminSettings,
});

function AdminSettings() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 md:py-12">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Configuration</p>
        <h1 className="font-display text-4xl md:text-5xl">Store Settings</h1>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
        className="space-y-6"
      >
        <Card title="Store">
          <Field label="Store name" defaultValue="Glowify Cosmetics" />
          <Field label="Support email" defaultValue="care@glowify.com" />
          <Field label="Phone" defaultValue="+966 11 484 9000" />
        </Card>
        <Card title="Currency & region">
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Currency" options={["USD ($)", "EUR (€)", "AED (د.إ)", "SAR (ر.س)"]} />
            <Select label="Default language" options={["English", "العربية"]} />
          </div>
          <Select label="Default country" options={["Saudi Arabia", "United Arab Emirates", "Lebanon", "Jordan"]} />
        </Card>
        <Card title="Shipping">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Flat rate ($)" defaultValue="8" type="number" />
            <Field label="Free shipping over ($)" defaultValue="50" type="number" />
          </div>
        </Card>
        <Card title="Notifications">
          <Toggle label="New order email alerts" defaultChecked />
          <Toggle label="Low stock warnings" defaultChecked />
          <Toggle label="Weekly performance digest" />
        </Card>

        <div className="flex items-center justify-between sticky bottom-4 bg-background border border-rose/10 rounded-2xl px-6 py-3 shadow-lg">
          <p className={`text-xs uppercase tracking-widest ${saved ? "text-green-600" : "text-muted-foreground"}`}>
            {saved ? "✓ Saved" : "Unsaved changes"}
          </p>
          <button type="submit" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Save className="size-4" /> Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-warm-white border border-rose/10 rounded-3xl p-6 md:p-8 space-y-4">
      <h2 className="font-display text-2xl">{title}</h2>
      {children}
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
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">{label}</span>
      <select className="w-full bg-background border border-rose/20 rounded-2xl px-4 py-3 text-sm">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <button type="button" onClick={() => setOn(!on)} className="flex w-full items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <span className={`relative inline-block w-10 h-6 rounded-full transition ${on ? "bg-rose" : "bg-pink-light/40"}`}>
        <span className={`absolute top-0.5 ${on ? "end-0.5" : "start-0.5"} size-5 bg-warm-white rounded-full transition`} />
      </span>
    </button>
  );
}
