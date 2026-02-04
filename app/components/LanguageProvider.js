"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    nav: {
      photography: "Photography",
      development: "Development",
      homeAria: "Home",
      photoMenuAria: "Open photography menu",
      codeMenuAria: "Open development menu",
      languageAria: "Switch language",
      searchPlaceholder: "Search (wedding, prices, Instagram...)",
      searchButton: "Search",
    },
    social: {
      mail: "Email",
      instagram: "Instagram",
      github: "GitHub",
      linkedin: "LinkedIn",
      mailSubject: "Inquiry",
    },
    home: {
      photographer: "photographer",
      coder: "<coder>",
      latestProjects: "Latest projects",
      development: "Development",
      photography: "Photography",
      photoLabel: "Photo",
      heroAlt: "Nathalie photographer and coder",
    },
    common: {
      videoFallback: "Your browser can't play this video.",
    },
    photo: {
      pageTitle: "Photography",
      portfolioTitle: "Portfolio",
      portfolioIntro: "",
      pricesTitle: "Prices",
      pricesIntro: "",
      categories: {
        wedding: "Weddings & Engagements",
        children: "Children",
        family: "Family",
        event: "Events",
        model: "Model",
      },
      categoryCaptions: {
        wedding: "",
        children: "",
        family: "W",
        event: "",
        model: "",
      },
      albumCount: "{count} photos",
      emptyCategory: "No albums yet.",
      backToGallery: "Back to photography",
      openAlbumAria: "Open album {title}",
      closeModalAria: "Close album",
      previousImageAria: "Previous image",
      nextImageAria: "Next image",
      pricesNote:
        "",
    },
    code: {
      pageTitle: "Development",
      portfolioTitle: "Portfolio",
      portfolioIntro: "Selected development projects.",
    },
    projects: {
      rifthub:
        "Backend 1. Social community built in React with SQLite3 (relational database) and Tailwind: user management (create/update/delete), login/logout, friends, chat, forum, livestreaming and admin panel.",
      nabaski:
        "JavaScript 2. Personal project: portfolio built in React with a booking system, connected to SQLite3.",
      derma:
        "JavaScript 3. SPA for a spa clinic built in Angular (TypeScript) with booking system and webshop, connected to SQLite3.",
      freaky:
        "JavaScript 1. Webshop built in plain JavaScript with SQLite3 as database.",
      blitz:
        "Agile methods / UX & UI. Group project: weather app in plain JavaScript with SQLite3; exposes a REST API (list/get/create/delete) and fetches data from an external weather API.",
    },
  },
  sv: {
    nav: {
      photography: "Fotografi",
      development: "Utveckling",
      homeAria: "Hem",
      photoMenuAria: "Öppna fotomeny",
      codeMenuAria: "Öppna kodmeny",
      languageAria: "Byt språk",
      searchPlaceholder: "Sök (bröllop, priser, Instagram...)",
      searchButton: "Sök",
    },
    social: {
      mail: "E-post",
      instagram: "Instagram",
      github: "GitHub",
      linkedin: "LinkedIn",
      mailSubject: "Förfrågan",
    },
    home: {
      photographer: "fotograf",
      coder: "<kodare>",
      latestProjects: "Senaste projekt",
      development: "Utveckling",
      photography: "Fotografi",
      photoLabel: "Foto",
      heroAlt: "Nathalie fotograf och kodare",
    },
    common: {
      videoFallback: "Din webbläsare kan tyvärr inte spela upp videon.",
    },
    photo: {
      pageTitle: "Fotografi",
      portfolioTitle: "Portfolio",
      portfolioIntro: "Utvalda kategorier och arbeten.",
      pricesTitle: "Priser",
      pricesIntro: "Paket och timpriser.",
      categories: {
        wedding: "Bröllop och förlovning",
        children: "Barn",
        family: "Familj",
        event: "Event",
        model: "Modell",
      },
      categoryCaptions: {
        wedding: "Heldagsdokumentation med tidlös och naturlig känsla.",
        children: "Lekfulla porträtt med mjukt ljus och äkta ögonblick.",
        family: "Varma, berättande porträtt för familjer.",
        event: "Från mindre sammankomster till större produktioner.",
        model: "Rena, redaktionella bilder för portföljer och kampanjer.",
      },
      albumCount: "{count} bilder",
      emptyCategory: "Inga album ännu.",
      backToGallery: "Tillbaka till fotografi",
      openAlbumAria: "Öppna album {title}",
      closeModalAria: "Stäng album",
      previousImageAria: "Föregående bild",
      nextImageAria: "Nästa bild",
      pricesNote:
        "Lägg in dina paket, timpriser och eventuella tillägg här.",
    },
    code: {
      pageTitle: "Utveckling",
      portfolioTitle: "Portfolio",
      portfolioIntro: "Utvalda utvecklingsprojekt.",
    },
    projects: {
      rifthub:
        "Backend 1. Socialt community byggt i React med SQLite3 (relationsdatabas) och Tailwind: användarhantering (skapa/uppdatera/radera), in-/utloggning, vänner, chatt, forum, livestreaming och adminpanel.",
      nabaski:
        "JavaScript 2. Eget projekt: portfolio byggt i React med bokningssystem, kopplat till SQLite3.",
      derma:
        "JavaScript 3. SPA för en spa-klinik byggt i Angular (TypeScript) med bokningssystem och webbshop, kopplat till SQLite3.",
      freaky:
        "JavaScript 1. Webshop byggd i ren JavaScript med SQLite3 som databas.",
      blitz:
        "Agila projektmetoder / UX & UI. Grupprojekt: väderapp i ren JavaScript med SQLite3; exponerar ett REST-API (lista/hämta/skapa/radera) och hämtar data från extern väder-API.",
    },
  },
};

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: () => "",
});

function getByKey(obj, key) {
  return key.split(".").reduce((acc, part) => (acc ? acc[part] : null), obj);
}

function interpolate(value, vars) {
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match
  );
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "sv" || stored === "en") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      const current = getByKey(translations[lang], key);
      const fallback = getByKey(translations.en, key);
      const text = typeof current === "string" ? current : fallback;
      return typeof text === "string" ? interpolate(text, vars) : key;
    };

    return { lang, setLang, t };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
