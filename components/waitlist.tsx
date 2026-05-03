"use client";
import { useState, useEffect } from "react";
import { NAVY, WHITE, DIM, BORDER, BORDER_ACTIVE } from "@/app/lib/constants";

function SuccessScreen() {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 400 }}>
        <div style={{ fontSize: 36, marginBottom: 24 }}>✦</div>
        <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-1px", margin: "0 0 16px", color: NAVY }}>You&apos;re in.</h2>
        <p style={{ fontSize: 15, color: DIM, lineHeight: 1.75, margin: 0 }}>
          We&apos;ll email you when early access opens. No spam, ever.
        </p>
      </div>
    </div>
  );
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    const data = await res.json();
    if (res.ok) {
      setDone(true);
    } else {
      setError(data.error ?? "Something went wrong.");
    }
  };

  if (done) return <SuccessScreen />;

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: `40px ${isMobile ? "20px" : "24px"}` }}>
        <div style={{ maxWidth: 580, width: "100%", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 3.6rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", color: NAVY, margin: "0 0 24px" }}>
            Stop overpaying for your AI agents.
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 17px)", lineHeight: 1.75, color: DIM, margin: "0 auto 40px", maxWidth: 480 }}>
            Proviras finds the steps in your agent flows that don&apos;t need a frontier model and proves it on your own traffic. Cut your bill without breaking your agents.
          </p>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10, marginBottom: 12 }}>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={e => e.key === "Enter" && onSubmit()}
              style={{
                flex: 1, padding: "14px 16px", fontSize: 15,
                background: "rgba(0,11,61,0.03)",
                border: `1px solid ${error ? "#c0392b" : focused ? BORDER_ACTIVE : BORDER}`,
                borderRadius: 8, color: NAVY, outline: "none",
                boxSizing: "border-box" as const, transition: "border-color 0.15s",
              }}
            />
            <button
              onClick={onSubmit}
              disabled={loading}
              style={{
                padding: "14px 24px", fontSize: 15, fontWeight: 700,
                background: NAVY, color: WHITE, border: "none", borderRadius: 8,
                cursor: loading ? "default" : "pointer", whiteSpace: "nowrap",
                opacity: loading ? 0.7 : 1, transition: "opacity 0.15s",
                flexShrink: 0,
              }}
            >
              {loading ? "Joining…" : "Join the waitlist"}
            </button>
          </div>
          {error && (
            <p style={{ fontSize: 13, color: "#c0392b", margin: "0 0 8px", textAlign: isMobile ? "center" : "left" }}>
              {error}
            </p>
          )}
          <p style={{ fontSize: 13, color: DIM, margin: 0, textAlign: isMobile ? "center" : "left" }}>
            No spam. We&apos;ll email you when early access opens.
          </p>
        </div>
      </div>
  );
}
