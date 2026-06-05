import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Account — Glowify" }] }),
  component: Auth,
});

type Mode = "login" | "register" | "forgot";

function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");

  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-deep/40 to-transparent" />
        <div className="relative z-10 p-16 h-full flex flex-col justify-between text-warm-white">
          <span className="font-display text-2xl uppercase tracking-tighter font-extrabold">Glowify</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 opacity-80">The Inner Circle</p>
            <h2 className="font-display text-5xl leading-tight max-w-md">A ritual of radiance — designed for you.</h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-4xl md:text-5xl mb-3">
            {mode === "login" && t("auth.login")}
            {mode === "register" && t("auth.register")}
            {mode === "forgot" && t("auth.forgot")}
          </h1>
          <p className="text-muted-foreground mb-10">
            {mode === "login" && "Welcome back to your beauty ritual."}
            {mode === "register" && "Join the circle and unlock early access."}
            {mode === "forgot" && "We'll email you a link to reset your password."}
          </p>

          <button className="w-full bg-warm-white border border-rose/20 rounded-full py-4 font-bold text-sm flex items-center justify-center gap-3 mb-6 hover:border-rose">
            <GoogleIcon /> {t("auth.google")}
          </button>

          <div className="flex items-center gap-4 mb-6 text-xs uppercase tracking-widest text-muted-foreground">
            <div className="flex-1 h-px bg-rose/10" />
            {t("auth.or")}
            <div className="flex-1 h-px bg-rose/10" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (mode === "forgot") {
                alert("Reset link sent — check your inbox.");
                setMode("login");
              } else {
                navigate({ to: "/account" });
              }
            }}
          >
            {mode === "register" && <Field label={t("auth.name")} type="text" required />}
            <Field label={t("auth.email")} type="email" required />
            {mode !== "forgot" && <Field label={t("auth.password")} type="password" required />}

            {mode === "login" && (
              <div className="text-end">
                <button type="button" onClick={() => setMode("forgot")} className="text-xs text-rose hover:underline">
                  {t("auth.forgot")}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-foreground text-background py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-deep transition"
            >
              {mode === "forgot" ? t("auth.reset") : t("auth.submit")}
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-muted-foreground">
            {mode === "login" ? (
              <>
                {t("auth.havent")}{" "}
                <button onClick={() => setMode("register")} className="text-rose font-bold hover:underline">
                  {t("auth.register")}
                </button>
              </>
            ) : (
              <>
                {t("auth.have")}{" "}
                <button onClick={() => setMode("login")} className="text-rose font-bold hover:underline">
                  {t("auth.login")}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">{label}</span>
      <input
        {...props}
        className="w-full bg-warm-white border border-rose/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}
