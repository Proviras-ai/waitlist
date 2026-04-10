"use client";

import { useState, useEffect } from "react";
import { NAVY, WHITE, BORDER } from "@/app/lib/constants";
import Link from "next/link";

const LogoMark = ({ size = 26, color = NAVY }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <rect x="3" y="4" width="4" height="14" rx="2" fill={color} />
    <rect x="11" y="8" width="4" height="10" rx="2" fill={color} />
    <rect x="3" y="21" width="4" height="4" rx="2" fill={color} />
  </svg>
);

export default function Nav() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const px = isMobile ? "20px" : "40px";

  return (
    <div>
      {/* Nav */}
        <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: `18px ${px}`, borderBottom: `1px solid ${BORDER}`,
        position: "sticky", top: 0, background: NAVY, zIndex: 100
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <LogoMark size={isMobile ? 22 : 26} color={WHITE} />
        <span style={{ fontWeight: 800, fontSize: isMobile ? 14 : 16, letterSpacing: "0.04em", textTransform: "uppercase", color: WHITE }}>Proviras</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/" style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = WHITE)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
            home
        </Link>
        <Link href="/more-info" style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = WHITE)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
            more_info
        </Link>
        </div>
      </nav>

    </div>
  );
}