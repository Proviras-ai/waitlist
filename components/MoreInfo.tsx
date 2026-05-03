"use client";

import { useState, useEffect } from "react";
import { NAVY, WHITE, DIM, BORDER } from "@/app/lib/constants";
import Link from "next/link";

const howItWorks = [
  {
    n: "1",
    title: "Connect",
    body: "Drop in our SDK. We capture every LLM call in your agent flow — inputs, outputs, costs, and which step in the flow each call belongs to. No changes to how your agent runs.",
  },
  {
    n: "2",
    title: "Test in the shadows",
    body: "For each step in your flow, we quietly run cheaper models against a sample of your real traffic. Your agent stays on its current setup. Your users never see the test.",
  },
  {
    n: "3",
    title: "See where you can save",
    body: "Get a report showing which steps in your flow could move to a smaller model, how much you'd save, and proof — side-by-side examples, sample sizes, confidence levels. Step by step, decision by decision.",
  },
];

const differentiators = [
  {
    title: "Step-by-step analysis.",
    body: "We don't just track total spend, we break it down by step in your agent flow, so you can see exactly which decisions, tool calls, and reasoning steps are eating your budget.",
  },
  {
    title: "Tested on your traffic.",
    body: "Not on someone else's benchmark. Recommendations come from your real production runs, not a generic leaderboard.",
  },
  {
    title: "Quality first.",
    body: "Every recommendation includes a measured equivalence rate with confidence intervals. We don't suggest a switch unless the data is conclusive.",
  },
  {
    title: "Works with your stack.",
    body: "LangChain, LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, or custom-built agents. OpenAI, Anthropic, Google, and open models.",
  },
  {
    title: "Read-only by default.",
    body: "We measure and recommend. You stay in control of what actually ships to your agent.",
  },
];

const painPoints = [
  "Our agent makes 30 LLM calls per user request and we have no idea which ones are actually expensive.",
  "We've gotten a scary email from finance about our agent's OpenAI spend.",
  "We know parts of our agent flow are over-engineered, but we don't have time to audit every step.",
  "We tried switching one step to a cheaper model and the whole agent started failing in weird ways a week later.",
  "We're scaling our agent to more users and the cost curve is getting terrifying.",
];

export default function MoreInfo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const px = isMobile ? "20px" : "40px";
  const sectionGap = isMobile ? "60px" : "100px";

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: `${isMobile ? "48px" : "80px"} ${px} 80px` }}>

      {/* Section 2: The problem */}
      <section style={{ marginBottom: sectionGap }}>
        <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-1.5px", color: NAVY, margin: "0 0 24px", lineHeight: 1.1 }}>
          Your agent&apos;s bill is bigger than it needs to be.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: DIM, margin: 0 }}>
            Modern AI agents make dozens of LLM calls to complete a single task. Plan a step, pick a tool, parse a result, summarize the context, decide what to do next, draft a reply. Most teams route every one of those calls to GPT-4 or Claude Opus because it&apos;s the safe default.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: DIM, margin: 0 }}>
            The truth is, most steps in a typical agent flow don&apos;t need a frontier model. Routing decisions, tool argument extraction, intermediate summaries, classification — smaller models handle them just as well, at a fraction of the cost.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: DIM, margin: 0 }}>
            But nobody downgrades a step, because nobody wants to be the person who broke an agent in production to save a few thousand dollars. So the spend keeps growing, multiplied across every step, every run, every user.
          </p>
        </div>
      </section>

      {/* Section 3: How it works */}
      <section style={{ marginBottom: sectionGap }}>
        <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-1.5px", color: NAVY, margin: "0 0 32px", lineHeight: 1.1 }}>
          How Proviras works
        </h2>
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
          {howItWorks.map((step, i) => (
            <div
              key={step.n}
              style={{
                padding: "28px 28px",
                borderBottom: i < howItWorks.length - 1 ? `1px solid ${BORDER}` : "none",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "56px 1fr",
                gap: isMobile ? 10 : 24,
                alignItems: "start",
              }}
            >
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, fontWeight: 700, color: NAVY, opacity: 0.35, paddingTop: 2 }}>{step.n}.</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: NAVY, margin: "0 0 8px" }}>{step.title}</p>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: DIM, margin: 0 }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: What makes it different */}
      <section style={{ marginBottom: sectionGap }}>
        <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-1.5px", color: NAVY, margin: "0 0 32px", lineHeight: 1.1 }}>
          Built for agent teams who need proof, not guesses.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {differentiators.map(d => (
            <div key={d.title} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr", gap: isMobile ? 4 : 24, alignItems: "start" }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: NAVY, margin: 0, lineHeight: 1.5 }}>{d.title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: DIM, margin: 0 }}>{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ marginTop: sectionGap, textAlign: "center", borderTop: `1px solid ${BORDER}`, paddingTop: 60 }}>
        <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 1.9rem)", fontWeight: 800, letterSpacing: "-1px", color: NAVY, margin: "0 0 16px", lineHeight: 1.1 }}>
          Ready to cut your agent&apos;s bill?
        </h2>
        <p style={{ fontSize: 15, color: DIM, lineHeight: 1.75, margin: "0 0 32px" }}>
          Join the waitlist and we&apos;ll reach out when early access opens.
        </p>
        <Link href="/" style={{
          display: "inline-block", padding: "14px 32px", fontSize: 15, fontWeight: 700,
          background: NAVY, color: WHITE, borderRadius: 8, textDecoration: "none",
          letterSpacing: "-0.2px",
        }}>
          Join the waitlist →
        </Link>
      </div>

    </div>
  );
}
