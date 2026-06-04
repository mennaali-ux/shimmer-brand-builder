import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export function AppProviders({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Theme
    const theme = localStorage.getItem("glowify-theme");
    if (theme === "dark") document.documentElement.classList.add("dark");

    // Language
    const lang = localStorage.getItem("glowify-lang") ?? "en";
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    setReady(true);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div style={{ visibility: ready ? "visible" : "visible" }}>{children}</div>
    </I18nextProvider>
  );
}

export function toggleTheme() {
  const el = document.documentElement;
  const isDark = el.classList.toggle("dark");
  localStorage.setItem("glowify-theme", isDark ? "dark" : "light");
}

export function toggleLanguage() {
  const next = i18n.language === "ar" ? "en" : "ar";
  i18n.changeLanguage(next);
  localStorage.setItem("glowify-lang", next);
  document.documentElement.lang = next;
  document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
}
