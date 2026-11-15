import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translate } from "../i18n/translations";

const PreferencesContext = createContext(null);

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem("language");
    const hasUserPreference = localStorage.getItem("languagePreference") === "true";
    if (hasUserPreference && (savedLanguage === "en" || savedLanguage === "fr")) return savedLanguage;
  } catch {
    // English is the default when browser storage is unavailable.
  }
  return "en";
}

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {
    // Use the system preference when storage is unavailable.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function PreferencesProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);
  const [theme, setTheme] = useState(getInitialTheme);

  const setLanguage = useCallback((nextLanguage) => {
    if (nextLanguage !== "en" && nextLanguage !== "fr") return;
    setLanguageState(nextLanguage);
    try {
      localStorage.setItem("languagePreference", "true");
    } catch {
      // The preference still works for the current page if storage is disabled.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("language", language);
    } catch {
      // The preference still works for the current page if storage is disabled.
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // The preference still works for the current page if storage is disabled.
    }
  }, [theme]);

  const t = useCallback((key) => translate(language, key), [language]);
  const value = useMemo(() => ({
    language,
    setLanguage,
    theme,
    setTheme,
    toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    t,
  }), [language, theme, t]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used within PreferencesProvider");
  return context;
}
