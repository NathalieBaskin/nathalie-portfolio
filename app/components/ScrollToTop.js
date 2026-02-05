"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;

    // Force instant jump to top on route change, even if smooth scrolling is enabled.
    html.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    html.style.scrollBehavior = previousBehavior;
  }, [pathname]);

  return null;
}
