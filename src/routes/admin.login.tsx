import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";
import { useAuth, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Sign in — Glowify" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const loginAdmin = useAuth((s) => s.loginAdmin);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginAdmin(email, password);
    if (!res.ok) {
      setError(res.error ?? "Login failed");
      return;
    }
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 py-16">
      <div className="w-full max-w-md bg-background border border-rose/10 rounded-3xl p-10 shadow-[0_30px_80px_-40px_rgba(196,92,124,0.4)]">
        <div className="text-center mb-10">
          <div className="size-14 rounded-full bg-foreground text-background grid place-items-center mx-auto mb-6">
            <Lock className="size-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose mb-2">Internal</p>
          <h1 className="font-display text-3xl">Admin sign in</h1>
          <p className="text-sm text-muted-foreground mt-2">Restricted to Glowify staff.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 text-sm bg-rose/10 text-rose-deep rounded-xl px-4 py-3">
              <AlertCircle className="size-4" /> {error}
            </div>
          )}
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">Email</span>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-warm-white border border-rose/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block text-muted-foreground">Password</span>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-warm-white border border-rose/20 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-rose"
            />
          </label>
          <button type="submit" className="w-full bg-foreground text-background py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-deep transition">
            Sign in
          </button>
        </form>

        <div className="mt-8 bg-pink-light/20 border border-rose/10 rounded-2xl p-4 text-xs">
          <p className="font-bold uppercase tracking-widest mb-2 text-rose-deep">Demo credentials</p>
          <p>Email: <span className="font-mono">{ADMIN_EMAIL}</span></p>
          <p>Password: <span className="font-mono">{ADMIN_PASSWORD}</span></p>
        </div>

        <Link to="/" className="block text-center text-xs uppercase tracking-widest mt-6 text-muted-foreground hover:text-rose">
          ← Back to storefront
        </Link>
      </div>
    </div>
  );
}
