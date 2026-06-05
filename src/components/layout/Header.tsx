import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Sun, Moon, Globe, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useCart, useWishlist } from "@/lib/store";
import { toggleLanguage, toggleTheme } from "@/lib/app-providers";

export function Header() {
  const { t, i18n } = useTranslation();
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const ob = new MutationObserver(update);
    ob.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => ob.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-rose/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-2xl tracking-tighter uppercase font-extrabold">
            Glowify
          </Link>
          <div className="hidden lg:flex gap-6 text-sm font-medium uppercase tracking-widest">
            <Link to="/shop" className="hover:text-rose transition-colors">{t("nav.shop")}</Link>
            <Link to="/shop" search={{ category: "skincare" }} className="hover:text-rose transition-colors">{t("nav.skincare")}</Link>
            <Link to="/shop" search={{ category: "makeup" }} className="hover:text-rose transition-colors">{t("nav.makeup")}</Link>
            <Link to="/shop" search={{ category: "haircare" }} className="hover:text-rose transition-colors">{t("nav.haircare")}</Link>
            <Link to="/about" className="hover:text-rose transition-colors">About</Link>
            <Link to="/contact" className="hover:text-rose transition-colors">Contact</Link>
          </div>
        </div>

        <Link to="/shop" className="hidden md:flex items-center bg-pink-light/30 px-4 py-2 rounded-full border border-rose/20 flex-1 max-w-xs hover:border-rose transition">
          <Search className="size-4 text-rose-deep/60 me-2" />
          <span className="text-xs text-rose-deep/60">{t("nav.search")}</span>
        </Link>

        <div className="flex items-center gap-3 text-xs font-bold">
          <button onClick={toggleLanguage} className="flex items-center gap-1 hover:text-rose transition-colors" aria-label="Toggle language">
            <Globe className="size-4" />
            <span className="hidden sm:inline">{i18n.language === "ar" ? "EN" : "AR"}</span>
          </button>
          <button onClick={toggleTheme} className="hover:text-rose transition-colors" aria-label="Toggle theme">
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Link to="/account" className="hover:text-rose hidden sm:inline-flex" aria-label="Account">
            <User className="size-4" />
          </Link>
          <Link to="/wishlist" className="hover:text-rose hidden sm:inline-flex relative" aria-label="Wishlist">
            <Heart className="size-4" />
            {wishCount > 0 && (
              <span className="absolute -top-2 -end-2 bg-rose text-warm-white text-[9px] rounded-full size-4 grid place-items-center">{wishCount}</span>
            )}
          </Link>
          <Link to="/cart" className="hover:text-rose relative inline-flex" aria-label="Cart">
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -top-2 -end-2 bg-rose-deep text-warm-white text-[9px] rounded-full size-4 grid place-items-center">{count}</span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden hover:text-rose" aria-label="Menu">
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-rose/10 bg-background px-6 py-4 flex flex-col gap-3 text-sm uppercase tracking-widest">
          <Link to="/shop" onClick={() => setOpen(false)}>{t("nav.shop")}</Link>
          <Link to="/shop" search={{ category: "skincare" }} onClick={() => setOpen(false)}>{t("nav.skincare")}</Link>
          <Link to="/shop" search={{ category: "makeup" }} onClick={() => setOpen(false)}>{t("nav.makeup")}</Link>
          <Link to="/shop" search={{ category: "haircare" }} onClick={() => setOpen(false)}>{t("nav.haircare")}</Link>
          <Link to="/shop" search={{ category: "fragrance" }} onClick={() => setOpen(false)}>{t("nav.fragrance")}</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/account" onClick={() => setOpen(false)}>{t("nav.account")}</Link>
          <Link to="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
          <Link to="/orders" onClick={() => setOpen(false)}>Orders</Link>
        </div>
      )}
    </nav>
  );
}
