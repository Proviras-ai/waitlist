"use client";

import { useState, useEffect } from "react";
import { NAVY, WHITE, BORDER } from "@/app/lib/constants";
import Link from "next/link";


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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.ico" width={20} height={20} alt="" style={{ display: "block" }} />
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