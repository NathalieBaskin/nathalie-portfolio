"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";

const EMAIL = "namahka@hotmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/namahka/";
const GITHUB_URL = "https://github.com/NathalieBaskin";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/nathalie-baskin-b61790193/";

const CONTACT_KEYWORDS = ["contact", "kontakt", "kontakta"];
const MAIL_KEYWORDS = ["mail", "email", "epost", "e-post", "e-mail", "mejl"];
const INSTAGRAM_KEYWORDS = ["instagram"];
const GITHUB_KEYWORDS = ["github"];
const LINKEDIN_KEYWORDS = ["linkedin"];

function normalizeQuery(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function includesAny(value, keywords) {
  return keywords.some((word) => value.includes(word));
}

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [lockedHighlights, setLockedHighlights] = useState(null);
  const [highlights, setHighlights] = useState({
    mail: false,
    instagram: false,
    github: false,
    linkedin: false,
  });
  const highlightTimeoutRef = useRef(null);

  const normalizedQuery = useMemo(() => normalizeQuery(query), [query]);

  useEffect(() => {
    if (!normalizedQuery) {
      if (lockedHighlights) {
        setHighlights(lockedHighlights);
        return;
      }
      setHighlights({
        mail: false,
        instagram: false,
        github: false,
        linkedin: false,
      });
      return;
    }

    if (lockedHighlights) {
      setLockedHighlights(null);
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
        highlightTimeoutRef.current = null;
      }
    }

    const hasContact = includesAny(normalizedQuery, CONTACT_KEYWORDS);
    const mailMatch = includesAny(normalizedQuery, MAIL_KEYWORDS);
    const instagramMatch = includesAny(normalizedQuery, INSTAGRAM_KEYWORDS);
    const githubMatch = includesAny(normalizedQuery, GITHUB_KEYWORDS);
    const linkedinMatch = includesAny(normalizedQuery, LINKEDIN_KEYWORDS);

    const next = {
      mail: mailMatch || hasContact,
      instagram: instagramMatch || hasContact,
      github: githubMatch || hasContact,
      linkedin: linkedinMatch || hasContact,
    };

    setHighlights(next);
  }, [normalizedQuery, lockedHighlights]);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  const goTo = (path, hash) => {
    if (pathname === path && hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `${path}#${hash}`);
        return;
      }
    }
    router.push(hash ? `${path}#${hash}` : path);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!normalizedQuery) return;

    const hasContact = includesAny(normalizedQuery, CONTACT_KEYWORDS);
    const mailMatch = includesAny(normalizedQuery, MAIL_KEYWORDS);
    const instagramMatch = includesAny(normalizedQuery, INSTAGRAM_KEYWORDS);
    const githubMatch = includesAny(normalizedQuery, GITHUB_KEYWORDS);
    const linkedinMatch = includesAny(normalizedQuery, LINKEDIN_KEYWORDS);

    const contactHighlights = {
      mail: mailMatch || hasContact,
      instagram: instagramMatch || hasContact,
      github: githubMatch || hasContact,
      linkedin: linkedinMatch || hasContact,
    };

    if (hasContact || mailMatch || instagramMatch || githubMatch || linkedinMatch) {
      setLockedHighlights(contactHighlights);
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
      highlightTimeoutRef.current = setTimeout(() => {
        setLockedHighlights(null);
        highlightTimeoutRef.current = null;
      }, 2000);
      goTo("/");
      setQuery("");
      return;
    }

    const isPhoto = includesAny(normalizedQuery, [
      "photo",
      "photography",
      "foto",
      "fotografi",
    ]);
    const isCode = includesAny(normalizedQuery, [
      "code",
      "cod",
      "kod",
      "development",
      "utveckling",
      "dev",
    ]);

    if (includesAny(normalizedQuery, ["wedding", "brollop", "bröllop"])) {
      goTo("/photo", "photo-wedding");
      setQuery("");
      return;
    }
    if (includesAny(normalizedQuery, ["children", "child", "barn"])) {
      goTo("/photo", "photo-children");
      setQuery("");
      return;
    }
    if (includesAny(normalizedQuery, ["family", "familj"])) {
      goTo("/photo", "photo-family");
      setQuery("");
      return;
    }
    if (includesAny(normalizedQuery, ["model", "modell"])) {
      goTo("/photo", "photo-model");
      setQuery("");
      return;
    }
    if (includesAny(normalizedQuery, ["price", "prices", "pris", "priser"])) {
      goTo("/photo", "photo-prices");
      setQuery("");
      return;
    }
    if (includesAny(normalizedQuery, ["portfolio"])) {
      if (isCode) {
        goTo("/code", "code-portfolio");
        setQuery("");
        return;
      }
      goTo("/photo", "photo-portfolio");
      setQuery("");
      return;
    }
    if (isPhoto) {
      goTo("/photo", "photo-portfolio");
      setQuery("");
      return;
    }
    if (isCode) {
      goTo("/code", "code-portfolio");
      setQuery("");
      return;
    }
    setQuery("");
  };

  const toggleLanguage = () => setLang(lang === "en" ? "sv" : "en");

  return (
    <nav className="fixed inset-x-0 top-0 bg-black text-white shadow-md z-50">
      <div className="mx-auto px-3 sm:px-6">
        {/* Mobile */}
        <div className="grid h-14 grid-cols-3 items-center sm:hidden">
          <div className="flex items-center justify-start">
            <NavTextLink href="/photo">{t("nav.photography")}</NavTextLink>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/"
              aria-label={t("nav.homeAria")}
              className="flex flex-col items-center gap-1 hover:opacity-90 transition"
            >
              <Image
                src="/middle-icon.png"
                alt=""
                width={26}
                height={26}
                className="h-6 w-6 object-contain hover:opacity-90 transition"
                priority
              />
            </Link>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t("nav.languageAria")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-2 py-1 hover:border-white/40 transition"
            >
              <FlagBadge active={lang === "sv"}>
                <SwedenFlag />
              </FlagBadge>
              <FlagBadge active={lang === "en"}>
                <GreatBritainFlag />
              </FlagBadge>
            </button>
          </div>

          <div className="flex items-center justify-end">
            <NavTextLink href="/code">{t("nav.development")}</NavTextLink>
          </div>
        </div>

        {/* Desktop */}
        <div className="relative h-14 items-center justify-between hidden sm:flex">
          <div className="flex w-1/2 items-center gap-3 pr-3 sm:gap-4 sm:pr-6">
            <div className="ml-auto flex items-center gap-4 sm:gap-6 whitespace-nowrap">
              <NavTextLink href="/photo">{t("nav.photography")}</NavTextLink>
            </div>
          </div>

          <Link
            href="/"
            aria-label={t("nav.homeAria")}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex flex-col items-center gap-1 pointer-events-auto hover:opacity-90 transition"
          >
            <Image
              src="/middle-icon.png"
              alt=""
              width={28}
              height={28}
              className="h-6 w-6 md:h-7 md:w-7 object-contain hover:opacity-90 transition"
              priority
            />
          </Link>

          <div className="flex w-1/2 items-center gap-3 pl-3 sm:gap-4 sm:pl-6">
            <div className="mr-auto flex items-center gap-4 sm:gap-6 whitespace-nowrap">
              <NavTextLink href="/code">{t("nav.development")}</NavTextLink>
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t("nav.languageAria")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-2 py-1 hover:border-white/40 transition"
            >
              <FlagBadge active={lang === "sv"}>
                <SwedenFlag />
              </FlagBadge>
              <FlagBadge active={lang === "en"}>
                <GreatBritainFlag />
              </FlagBadge>
            </button>

          </div>
        </div>

        {/* Social + search */}
        <div className="border-t border-white/10 py-2">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="hidden sm:block" />
            <div className="flex items-center justify-center gap-4">
              <SocialIcon
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  t("social.mailSubject")
                )}`}
                label={t("social.mail")}
                highlight={highlights.mail}
              >
                <MailIcon />
              </SocialIcon>
              <SocialIcon
                href={INSTAGRAM_URL}
                label={t("social.instagram")}
                highlight={highlights.instagram}
                external
              >
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon
                href={GITHUB_URL}
                label={t("social.github")}
                highlight={highlights.github}
                external
              >
                <GitHubIcon />
              </SocialIcon>
              <SocialIcon
                href={LINKEDIN_URL}
                label={t("social.linkedin")}
                highlight={highlights.linkedin}
                external
              >
                <LinkedInIcon />
              </SocialIcon>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex w-full items-center gap-2 sm:w-[320px] sm:justify-self-end"
            >
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                aria-label={t("nav.searchButton")}
                className="h-9 w-full rounded-full bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="h-9 rounded-full border border-white/20 px-3 text-xs font-semibold uppercase tracking-wider hover:border-white/40 transition"
              >
                {t("nav.searchButton")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavTextLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex flex-col items-start gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 transition hover:text-red-500 sm:text-xs"
    >
      <span>{children}</span>
      <span className="h-[1px] w-full bg-white/50 transition group-hover:bg-red-500" />
    </Link>
  );
}

function SocialIcon({ href, label, highlight, external, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center justify-center transition-transform transition-colors duration-200 ${
        highlight ? "scale-110 text-white animate-pulse" : "text-white/70"
      }`}
    >
      <span className="h-5 w-5">{children}</span>
    </a>
  );
}

function FlagBadge({ active, children }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[2px] border border-white/20 ${
        active ? "opacity-100" : "opacity-50"
      }`}
    >
      {children}
    </span>
  );
}

function SwedenFlag() {
  return (
    <svg
      viewBox="0 0 16 10"
      aria-hidden="true"
      className="h-3 w-5"
    >
      <rect width="16" height="10" fill="#006AA7" />
      <rect y="4" width="16" height="2" fill="#FECC00" />
      <rect x="5" width="2" height="10" fill="#FECC00" />
    </svg>
  );
}

function GreatBritainFlag() {
  return (
    <svg
      viewBox="0 0 16 10"
      aria-hidden="true"
      className="h-3 w-5"
    >
      <rect width="16" height="10" fill="#012169" />
      <path
        d="M0 0l6 4.1V0h4v4.1L16 0v2.1l-4.7 3.1H16v3.6h-4.7L16 11V13L10 8.9V13H6V8.9L0 13v-2l4.7-2.2H0V5.2h4.7L0 2.1z"
        fill="#FFFFFF"
      />
      <path
        d="M0 0l6 4.1V0h2v5L0 0zm16 0l-6 4.1V0h-2v5l8-5zM0 10l6-4.1V10h2V5L0 10zm16 0l-6-4.1V10h-2V5l8 5z"
        fill="#C8102E"
      />
      <rect y="4" width="16" height="2" fill="#FFFFFF" />
      <rect x="7" width="2" height="10" fill="#FFFFFF" />
      <rect y="4.4" width="16" height="1.2" fill="#C8102E" />
      <rect x="7.4" width="1.2" height="10" fill="#C8102E" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M22 8l-9.2 6.9a2 2 0 0 1-1.6 0L2 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M12 .297C5.37.297 0 5.67 0 12.3c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.41 3-.4 1.02 0 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.82.58C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63.297 12 .297z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M22.23 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.46c.97 0 1.77-.78 1.77-1.74V1.74C24 .78 23.2 0 22.23 0zM7.06 20.45H3.56v-11h3.5v11zM5.31 7.43a2.03 2.03 0 110-4.06 2.03 2.03 0 010 4.06zM20.45 20.45h-3.49v-5.36c0-1.28-.02-2.93-1.79-2.93-1.8 0-2.07 1.4-2.07 2.84v5.45h-3.5v-11h3.36v1.5h.05c.47-.89 1.61-1.83 3.31-1.83 3.54 0 4.2 2.33 4.2 5.35v5.98z" />
    </svg>
  );
}
