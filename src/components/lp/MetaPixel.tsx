"use client";

import { useEffect } from "react";
import { newEventId, trackEvent, type TrackContext } from "@/lib/lp/track";

/**
 * Meta Pixel for landing page traffic.
 *
 * Loaded imperatively rather than through next/script so the whole path is
 * verifiable from the page: window.fbq either exists or it does not, and the
 * stub queues calls until fbevents.js lands.
 *
 * The server mirrors Lead events through the Conversions API
 * (src/lib/lp/capi.ts) using the same event ID, so Meta deduplicates the pair
 * rather than double counting.
 */

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

const SRC = "https://connect.facebook.net/en_US/fbevents.js";

export function MetaPixel({ pixelId, ctx }: { pixelId?: string; ctx: TrackContext }) {
  const id = pixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (!id || typeof window === "undefined") return;

    if (!window.fbq) {
      // Standard Meta stub: queue calls until fbevents.js finishes loading.
      const fbq: Window["fbq"] = function (...args: unknown[]) {
        if (fbq!.callMethod) fbq!.callMethod(...args);
        else (fbq!.queue as unknown[]).push(args);
      } as NonNullable<Window["fbq"]>;
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.push = fbq;
      window.fbq = fbq;
      window._fbq = fbq;

      if (!document.querySelector(`script[src="${SRC}"]`)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = SRC;
        document.head.appendChild(script);
      }
    }

    window.fbq?.("init", id);
  }, [id]);

  // PageView goes through the dual path: browser pixel when it loads, and the
  // server either way. Fired once per mount, independent of the pixel stub.
  useEffect(() => {
    trackEvent("PageView", ctx, undefined, newEventId("pv"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let fired = false;
    const onScroll = () => {
      if (fired) return;
      const progress =
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (progress > 0.5) {
        fired = true;
        trackEvent("ScrollHalf", ctx);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!id) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
