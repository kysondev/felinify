"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 200;
const TICK_MS = 140;
const MAX_PROGRESS = 94;
const AUTO_COMPLETE_MS = 4000;

export const TopProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const inFlightRef = useRef(false);
  const lastLocationRef = useRef(`${pathname}?${searchParams.toString()}`);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoCompleteRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (hideRef.current) {
      clearTimeout(hideRef.current);
      hideRef.current = null;
    }
    if (autoCompleteRef.current) {
      clearTimeout(autoCompleteRef.current);
      autoCompleteRef.current = null;
    }
  };

  const finish = () => {
    if (!inFlightRef.current) return;
    inFlightRef.current = false;
    clearTimers();
    setProgress(100);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, MIN_VISIBLE_MS);
  };

  const start = () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    clearTimers();
    setVisible(true);
    setProgress(12);

    tickRef.current = setInterval(() => {
      setProgress((prev) =>
        Math.min(MAX_PROGRESS, prev + Math.random() * 12 + 6)
      );
    }, TICK_MS);

    autoCompleteRef.current = setTimeout(finish, AUTO_COMPLETE_MS);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }
      const targetAttr = anchor.getAttribute("target");
      if (targetAttr === "_blank" || anchor.hasAttribute("download")) return;

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        ) {
          return;
        }
      } catch {
        return;
      }

      start();
    };

    const handlePopState = () => start();

    window.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const currentLocationKey = `${pathname}?${searchParams.toString()}`;
    if (currentLocationKey !== lastLocationRef.current) {
      lastLocationRef.current = currentLocationKey;
      finish();
    }
  }, [pathname, searchParams]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[4px] overflow-hidden transition-opacity duration-150 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full bg-primary shadow-[0_1px_6px_rgba(0,0,0,0.12)] transition-[width] duration-150 ease-out"
        style={{ width: `${visible ? progress : 0}%` }}
      />
    </div>
  );
};
