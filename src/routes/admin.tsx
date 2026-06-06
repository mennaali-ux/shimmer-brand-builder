import { createFileRoute, Outlet, Link, redirect, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Star, Boxes, BarChart3, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    // Allow /admin/login without auth; everything else requires admin
    if (location.pathname === "/admin/login") return;
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("glowify-auth");
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed?.state?.user?.role === "admin") return;
    } catch {}
    throw redirect({ to: "/admin/login" });
  },
  head: () => ({ meta: [{ title: "Glowify Admin" }] }),
  component: AdminLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/admin",             label: "Overview",   icon: LayoutDashboard, exact: true },
  { to: "/admin/products",    label: "Products",   icon: Package },
  { to: "/admin/orders",      label: "Orders",     icon: ShoppingBag },
  { to: "/admin/customers",   label: "Customers",  icon: Users },
  { to: "/admin/categories",  label: "Categories", icon: Tag },
  { to: "/admin/reviews",     label: "Reviews",    icon: Star },
  { to: "/admin/inventory",   label: "Inventory",  icon: Boxes },
  { to: "/admin/analytics",   label: "Analytics",  icon: BarChart3 },
  { to: "/admin/settings",    label: "Settings",   icon: Settings },
];

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const [open, setOpen] = useState(false);

  // Login page renders inside outlet without the chrome
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-pink-light/10">
        <Outlet />
      </div>
    );
  }

  const onLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen flex bg-pink-light/5">
      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-foreground text-background flex-col transition-transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex flex`}>
        <div className="px-6 py-6 flex items-center justify-between">
          <Link to="/admin" className="font-display text-2xl uppercase tracking-tighter font-extrabold">
            Glowify<span className="text-rose">·</span>Admin
          </Link>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-auto">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                  active ? "bg-rose text-warm-white" : "text-background/80 hover:bg-background/10"
                }`}
              >
                <n.icon className="size-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-background/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-full bg-rose grid place-items-center text-warm-white font-bold text-sm">
              {user?.name?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest border border-background/20 rounded-full py-2 hover:bg-background/10">
            <LogOut className="size-4" /> Sign out
          </button>
          <Link to="/" className="block text-center text-[10px] mt-3 uppercase tracking-widest opacity-60 hover:opacity-100">
            View storefront →
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="md:hidden sticky top-0 z-30 bg-background border-b border-rose/10 px-4 h-14 flex items-center justify-between">
          <button onClick={() => setOpen(true)}><Menu className="size-5" /></button>
          <span className="font-display text-lg uppercase tracking-tighter font-extrabold">Admin</span>
          <div className="size-5" />
        </header>
        <Outlet />
      </div>
    </div>
  );
}
