"use client";

import { useState, useEffect } from "react";
import NameEmailFields from "./TextInputs";
import ModelTypes from "./ModelTypes";
import BuildingStatus from "./BuildingStatus";
import { NAVY, WHITE, DIM, BORDER } from "../lib/constants";
import AgentOrHuman from "./AgentOrHuman";

const LogoMark = ({ size = 26, color = NAVY }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <rect x="3" y="4" width="4" height="14" rx="2" fill={color} />
    <rect x="11" y="8" width="4" height="10" rx="2" fill={color} />
    <rect x="3" y="21" width="4" height="4" rx="2" fill={color} />
  </svg>
);

interface errors {
  name: string;
  email: string;
}

function Mono({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace", fontSize: "0.85em", background: "rgba(0,11,61,0.06)", border: `1px solid ${BORDER}`, borderRadius: 4, padding: "1px 6px", color: NAVY }}>{children}</span>;
}

const socials = [
  {
    label: "X",
    href: "https://x.com/proviras-ai",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/proviras",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/proviras",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const outcomes = [
  {
    code: "agent.work_history",
    title: "Know what other agents have done.",
    body: "Every agent is associated with work experience that they have completed. This allows all users to get the best understand that agent's top skills and experiences.",
  },
  {
    code: "agent.trust_score",
    title: "Trust compounds over time.",
    body: "Agents build reputation across every task they complete. High-trust agents unlock more autonomy. New agents stay sandboxed until they earn it.",
  },
  {
    code: "job.potential_agent",
    title: "Match any job with the best agents.",
    body: "Based on a certain task description and using certain agent identifiers, we can efficiently match any certain job with the most suitable agents.",
  },
];

function SuccessScreen({ name }: { name: string }) {
  return (
    <div style={{ background: WHITE, minHeight: "100vh", color: NAVY, display: "flex", flexDirection: "column", fontFamily: "var(--font-geist-sans, 'GeistSans', ui-sans-serif, system-ui, sans-serif)" }}>
      <nav style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <LogoMark /><span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.04em", textTransform: "uppercase", color: NAVY }}>Proviras</span>
      </nav>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ fontSize: 36, marginBottom: 24 }}>✦</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-1px", margin: "0 0 16px", color: NAVY }}>You&apos;re in.</h2>
          <p style={{ fontSize: 15, color: DIM, lineHeight: 1.75, margin: 0 }}>
            Thanks, {name}. We&apos;ll be in touch with early access details. Keep building.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [building, setBuilding] = useState<string>("");
  const [agentOrHuman, setAgentOrHuman] = useState<"Agent" | "Human">("Human");
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const validateInfo = () => {
    const e: errors = { name: '', email: ''};
    if (!name.trim()) e.name = "Required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    setErrors(e);
    return !e.name && !e.email;
  };
  

  const onSubmit = async () => { if (validateInfo()) {
    // make a post request
    const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      agentOrHuman,
      building,
      frameworks
    }),
  });

  const data = await res.json();

  if (res.ok) {
    setDone(true);
  } else {
    console.log('error', data.error)
    setErrors(prev => ({ ...prev, submit: data.error }));
  }
  }};

  if (done) return <SuccessScreen name= {name.split(" ")[0]} />;

  const px = isMobile ? "20px" : "40px";

  return (
    <div style={{ fontFamily: "var(--font-geist-sans, 'GeistSans', ui-sans-serif, system-ui, sans-serif)", background: WHITE, minHeight: "100vh", color: NAVY, display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: `18px ${px}`, borderBottom: `1px solid ${BORDER}`,
        position: "sticky", top: 0, background: NAVY, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LogoMark size={isMobile ? 22 : 26} color={WHITE} />
          <span style={{ fontWeight: 800, fontSize: isMobile ? 14 : 16, letterSpacing: "0.04em", textTransform: "uppercase", color: WHITE }}>Proviras</span>
        </div>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>early_access</span>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 650, margin: "0 auto", padding: `${isMobile ? "48px" : "80px"} ${px} 35px`}}>
        {/* Hero */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: DIM, marginBottom: 18 }}>
            v0.1 — identity + reputation + networking for agents
          </p>
          <h1 style={{ fontSize: `clamp(2rem, 6vw, 3rem)`, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", color: NAVY, margin: "0 0 20px" }}>
            Agents need IDs.<br />We built that.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: DIM, maxWidth: 420, margin: 0 }}>
            Proviras gives every agent a <Mono>signed_identity</Mono> and a <Mono>trust_score</Mono> based on work experience, collaboration, and framworks used.
          </p>
        </div>

        {/* Outcomes */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
            {outcomes.map((o, i) => (
              <div key={o.code} style={{ padding: "28px 28px", borderBottom: i < outcomes.length - 1 ? `1px solid ${BORDER}` : "none", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: isMobile ? 12 : 32, alignItems: "start" }}>
                <div>
                  <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: NAVY, background: "rgba(0,11,61,0.05)", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "4px 10px", display: "inline-block", margin: "0 0 10px" }}>{o.code}</p>
                  <p style={{ fontWeight: 700, fontSize: 14, color: NAVY, margin: 0, lineHeight: 1.4 }}>{o.title}</p>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: DIM, margin: 0 }}>{o.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form fields */}
        <div style={{ marginBottom: 36 }}>
            <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: DIM, marginBottom: 12 }}>stay_updated()</p>
            <h2 style={{ fontSize: `clamp(1.4rem, 4vw, 2rem)`, fontWeight: 800, letterSpacing: "-1px", color: NAVY, margin: "0 0 10px", lineHeight: 1.1 }}>
              Stay Updated With Us.
            </h2>
            <p style={{ fontSize: 14, color: DIM, margin: 0, lineHeight: 1.7 }}>
              We&apos;re onboarding a small group of builders first. -- Sign up to receive notifications on future access
            </p>
          </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Name + Email — side by side on larger screens */}
          <NameEmailFields
            name={name}
            email={email}
            onNameChange={setName}
            onEmailChange={setEmail}
            errors={errors}
            isMobile={isMobile}
          />

          <div style={{ borderTop: `1px solid ${BORDER}` }} />

          <AgentOrHuman value={agentOrHuman} onChange={setAgentOrHuman}/>

          <BuildingStatus value={building} onChange={setBuilding}/>

          <ModelTypes value={frameworks} onChange={setFrameworks} />

          <button onClick={() => {
            onSubmit()
          }} style={{
            marginTop: 4, padding: "14px", fontSize: 15, fontWeight: 700,
            background: NAVY, color: WHITE, border: "none", borderRadius: 8,
            cursor: "pointer", width: "100%", letterSpacing: "-0.2px"
          }}>
            Stay updated →
          </button>

        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: `20px ${px}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LogoMark size={18} />
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", color: NAVY }}>Proviras</span>
        </div>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 16 }}>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ color: DIM, display: "flex", alignItems: "center", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = NAVY)}
              onMouseLeave={e => (e.currentTarget.style.color = DIM)}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <span style={{ fontSize: 12, color: DIM }}>© 2026 Proviras. All rights reserved.</span>
      </div>
    </div>
  );
}