import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Instagram, Music2, BookOpen } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-foreground text-background/70 py-20 mt-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-2xl text-background uppercase tracking-tighter mb-6 block">
            Glowify
          </span>
          <p className="text-sm leading-relaxed">{t("footer.tagline")}</p>
        </div>
        <div>
          <h5 className="text-background font-bold uppercase tracking-widest text-xs mb-6">
            {t("footer.shop")}
          </h5>
          <ul className="space-y-4 text-sm">
            <li><Link to="/shop" className="hover:text-rose transition-colors">{t("footer.newArrivals")}</Link></li>
            <li><Link to="/shop" className="hover:text-rose transition-colors">{t("footer.bestsellers")}</Link></li>
            <li><Link to="/shop" className="hover:text-rose transition-colors">{t("footer.gift")}</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-background font-bold uppercase tracking-widest text-xs mb-6">
            {t("footer.support")}
          </h5>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-rose transition-colors">{t("footer.shipping")}</a></li>
            <li><a href="#" className="hover:text-rose transition-colors">{t("footer.returns")}</a></li>
            <li><a href="#" className="hover:text-rose transition-colors">{t("footer.contact")}</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-background font-bold uppercase tracking-widest text-xs mb-6">
            {t("footer.connect")}
          </h5>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-rose transition-colors inline-flex items-center gap-2"><Instagram className="size-4" />Instagram</a></li>
            <li><a href="#" className="hover:text-rose transition-colors inline-flex items-center gap-2"><Music2 className="size-4" />TikTok</a></li>
            <li><a href="#" className="hover:text-rose transition-colors inline-flex items-center gap-2"><BookOpen className="size-4" />Journal</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
        <span>{t("footer.rights")}</span>
        <div className="flex gap-6">
          <span>{t("footer.privacy")}</span>
          <span>{t("footer.terms")}</span>
        </div>
      </div>
    </footer>
  );
}
