"use client";
import { useState, useEffect } from "react";
import NameEmailFields from "./TextInputs";
import ModelTypes from "./ModelTypes";
import BuildingStatus from "./BuildingStatus";
import { NAVY, WHITE, DIM, BORDER } from "@/app/lib/constants";
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

export default function Waitlist() {
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
    setErrors(prev => ({ ...prev, submit: data.error }));
  }
  }};

  if (done) return <SuccessScreen name= {name.split(" ")[0]} />;

  const px = isMobile ? "20px" : "40px";

  return (
    <div>
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
            Proviras gives every agent a <Mono>signed_identity</Mono> and a <Mono>trust_score</Mono> based on work experience, collaboration, and frameworks used.
          </p>
        </div>
        
        {/* Form fields */}
        <div style={{ marginBottom: 36 }} id="signup">
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
      </div>
  );
}