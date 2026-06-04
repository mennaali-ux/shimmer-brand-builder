import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, CreditCard, Wallet } from "lucide-react";
import { useCart } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Glowify" }] }),
  component: Checkout,
});

function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const resolved = useCart((s) => s.resolved());
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const [payment, setPayment] = useState<"cod" | "card">("card");
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="size-20 rounded-full bg-rose grid place-items-center mx-auto mb-8">
          <Check className="size-10 text-warm-white" />
        </div>
        <h1 className="font-display text-5xl mb-6">Thank you</h1>
        <p className="text-muted-foreground mb-8">Your order has been placed. A confirmation has been sent to your email.</p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const onPlace = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    setPlaced(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-12">{t("checkout.title")}</h1>

      <form onSubmit={onPlace} className="grid md:grid-cols-[1fr_400px] gap-12">
        <div className="space-y-10">
          <Section title={t("checkout.contact")}>
            <Input label={t("checkout.email")} type="email" required />
            <Input label={t("checkout.phone")} type="tel" required />
          </Section>

          <Section title={t("checkout.shipping")}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label={t("checkout.firstName")} required />
              <Input label={t("checkout.lastName")} required />
            </div>
            <Input label={t("checkout.address")} required />
            <div className="grid sm:grid-cols-3 gap-4">
              <Input label={t("checkout.city")} required />
              <Input label={t("checkout.country")} required />
              <Input label={t("checkout.zip")} required />
            </div>
          </Section>

          <Section title={t("checkout.payment")}>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <PaymentBtn icon={<CreditCard className="size-5" />} label={t("checkout.card")} active={payment === "card"} onClick={() => setPayment("card")} />
              <PaymentBtn icon={<Wallet className="size-5" />} label={t("checkout.cod")} active={payment === "cod"} onClick={() => setPayment("cod")} />
            </div>
            {payment === "card" && (
              <div className="space-y-4">
                <Input label={t("checkout.cardNumber")} placeholder="•••• •••• •••• ••••" required />
                <div className="grid grid-cols-2 gap-4">
                  <Input label={t("checkout.expiry")} placeholder="MM / YY" required />
                  <Input label={t("checkout.cvc")} placeholder="•••" required />
                </div>
              </div>
            )}
          </Section>
        </div>

        <aside className="bg-warm-white rounded-3xl p-8 border border-rose/10 h-fit sticky top-28">
          <h2 className="font-display text-2xl mb-6">{t("checkout.review")}</h2>
          <div className="space-y-4 mb-6 max-h-72 overflow-auto">
            {resolved.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 items-center">
                <img src={product.image} alt={product.name} className="size-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">× {qty}</p>
                </div>
                <p className="text-sm font-medium">${(product.price * qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm pt-4 border-t border-rose/10">
            <div className="flex justify-between"><span>{t("cart.subtotal")}</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>{t("cart.shipping")}</span><span>{shipping === 0 ? t("cart.free") : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-lg font-bold pt-3">
              <span>{t("cart.total")}</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={resolved.length === 0}
            className="w-full mt-6 bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-deep transition disabled:opacity-40"
          >
            {t("checkout.placeOrder")}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-warm-white rounded-3xl p-6 md:p-8 border border-rose/10">
      <h2 className="font-display text-2xl mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">{label}</span>
      <input
        {...props}
        className="w-full bg-background border border-rose/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose"
      />
    </label>
  );
}

function PaymentBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-2 text-sm font-medium ${
        active ? "border-rose bg-pink-light/20" : "border-rose/10"
      }`}
    >
      {icon} {label}
    </button>
  );
}
